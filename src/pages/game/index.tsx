import React, { useEffect } from "react";
import styles from "./game.module.css";
import DarkContainer from "../../components/dark-container";
import { Unity } from "react-unity-webgl";
import { useXerialWallet } from "../../hooks/useXerialWallet";
import Spinner from "../../components/spinner/Spinner";
import { useMessageSystem } from "../../hooks/useMessageSystem";
import { useLocation, useNavigate } from "react-router-dom";
import { appPaths } from "../../router/RoutesConfig";

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  const { unity } = useMessageSystem();
  const { unityProvider, isLoaded, handleRemoveUnityInstance } = unity;
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname === appPaths.game;
  const { isAuth } = useXerialWallet();

  useEffect(() => {
    if (!isAuth) handleRemoveUnityInstance();
  }, [handleRemoveUnityInstance, isAuth]);

  return (
    <DarkContainer
      style={{
        visibility: currentPage ? "visible" : "hidden",
        height: currentPage ? "100%" : "0px",
      }}
      hideGain
      onClose={() => navigate(appPaths.home)}
      connectWallet={!isLoaded || !isAuth}
    >
      {!isLoaded && isAuth && (
        <div className={styles.container}>
          <Spinner color="#F2AB02" size="normal" />
        </div>
      )}
      {isAuth && (
        <Unity
          id="unity-container"
          className={styles.unityCanvas}
          unityProvider={unityProvider}
        />
      )}
    </DarkContainer>
  );
};

export default Game;
