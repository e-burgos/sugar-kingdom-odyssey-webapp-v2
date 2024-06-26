import React, { useEffect } from "react";
import styles from "./game.module.css";
import DarkContainer from "../../components/dark-container";
import { Unity } from "react-unity-webgl";
import Spinner from "../../components/spinner/Spinner";
import { useMessageSystem } from "../../hooks/useMessageSystem";
import { useLocation, useNavigate } from "react-router-dom";
import { appPaths } from "../../router/RoutesConfig";
import { useAuth } from "@/store/useAuth";

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  const { unity } = useMessageSystem();
  const { unityProvider, isLoaded, handleRemoveUnityInstance } = unity;
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname === appPaths.game;
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) handleRemoveUnityInstance();
  }, [handleRemoveUnityInstance, userId]);

  return (
    <DarkContainer
      style={{
        visibility: currentPage ? "visible" : "hidden",
        height: currentPage ? "100%" : "0px",
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

export default Game;
