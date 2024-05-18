import React from "react";
import styles from "./leaderboard.module.css";
import DarkContainer from "../../components/dark-container";

interface LeaderboardProps {
  style?: React.CSSProperties;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ style }) => {
  return (
    <DarkContainer style={style} label={"leaderboard"} noAvailable>
      <div className={styles.wrapper}></div>
    </DarkContainer>
  );
};

export default Leaderboard;
