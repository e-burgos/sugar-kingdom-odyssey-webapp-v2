import React, { useEffect } from "react";
import styles from "./game.module.css";
import DarkContainer from "../../components/dark-container";
import { Unity } from "react-unity-webgl";
import { useXerialWallet } from "../../hooks/useXerialWallet";
import Paragraph from "../../components/typography/paragraph";
import ButtonConnect from "../../components/buttons/button-connect";
import { usePageOrchestrator } from "../../store/usePageOrchestrator";
import Spinner from "../../components/spinner/Spinner";
import { useMessageSystem } from "../../hooks/useMessageSystem";

interface GameProps {
  style?: React.CSSProperties;
}

const Game: React.FC<GameProps> = ({ style }) => {
  const { unity } = useMessageSystem();
  const { unityProvider, isLoaded, handleRemoveUnityInstance } = unity;

  const { isAuth } = useXerialWallet();
  const { setCurrentPage } = usePageOrchestrator();

  useEffect(() => {
    if (!isAuth) handleRemoveUnityInstance();
  }, [handleRemoveUnityInstance, isAuth]);

  return (
    <DarkContainer
      style={style}
      hideGain
      onClose={() => {
        setCurrentPage("home");
      }}
    >
      {!isLoaded && isAuth && (
        <div className={styles.container}>
          <Spinner color="#F2AB02" size="normal" />
        </div>
      )}
      {isAuth ? (
        <Unity
          id="unity-container"
          className={styles.unityCanvas}
          unityProvider={unityProvider}
        />
      ) : (
        <div className={styles.container}>
          <Paragraph color="#F2AB02" fontWeight="bold" fontSize="40px">
            Connect your wallet to play
          </Paragraph>
          <ButtonConnect size="90px" />
        </div>
      )}
    </DarkContainer>
  );
};

export default Game;
