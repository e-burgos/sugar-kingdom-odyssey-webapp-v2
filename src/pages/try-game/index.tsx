import React from "react";
import styles from "./try-game.module.css";
import DarkContainer from "../../components/dark-container";

interface TryGameProps {
  style?: React.CSSProperties;
}

const TryGame: React.FC<TryGameProps> = ({ style }) => {
  return (
    <DarkContainer
      style={style}
      label="Try Game"
      hideGain
      connectWallet
      goToHomeButton
    >
      <div className={styles.wrapper}></div>
    </DarkContainer>
  );
};

export default TryGame;
