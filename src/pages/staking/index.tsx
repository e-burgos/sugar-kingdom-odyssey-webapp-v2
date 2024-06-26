import React from "react";
import styles from "./staking.module.css";
import DarkContainer from "@/components/dark-container";

interface StakingProps {
  style?: React.CSSProperties;
}

const Staking: React.FC<StakingProps> = ({ style }) => {
  return (
    <DarkContainer style={style} label={"$SKO Staking"} noAvailable>
      <div className={styles.wrapper}></div>
    </DarkContainer>
  );
};

export default Staking;
