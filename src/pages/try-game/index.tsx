import React, { useEffect } from "react";
import styles from "./try-game.module.css";
import DarkContainer from "@/components/dark-container";
import { useAuth } from "@/store/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useMessageSystem } from "@/hooks/useMessageSystem";
import { appPaths } from "@/router/RoutesConfig";
import Spinner from "@/components/spinner/Spinner";
import { Unity } from "react-unity-webgl";

interface TryGameProps {
  style?: React.CSSProperties;
}

const TryGame: React.FC<TryGameProps> = ({ style }) => {
  const { unity } = useMessageSystem();
  const { unityProvider, isLoaded, handleRemoveUnityInstance } = unity;
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname === appPaths.tryGame;
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) handleRemoveUnityInstance();
  }, [handleRemoveUnityInstance, userId]);

  return (
    <DarkContainer
      style={{
        visibility: currentPage ? "visible" : "hidden",
        height: currentPage ? "100%" : "0px",
        ...style,
      }}
      hideGain
      onClose={() => navigate(appPaths.home)}
    >
      {!isLoaded && userId && (
        <div className={styles.container}>
          <Spinner color="#F2AB02" size="normal" />
        </div>
      )}
      {userId && (
        <Unity
          id="unity-container"
          className={styles.unityCanvas}
          unityProvider={unityProvider}
        />
      )}
    </DarkContainer>
  );
};

export default TryGame;
