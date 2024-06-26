import React from "react";
import styles from "./buy-sugar.module.css";
import DarkContainer from "@/components/dark-container";

interface BuySugarProps {
  style?: React.CSSProperties;
}

const BuySugar: React.FC<BuySugarProps> = ({ style }) => {
  return (
    <DarkContainer style={style} label="Buy Sugar" hideGain goToHomeButton>
      <div className={styles.wrapper}></div>
    </DarkContainer>
  );
};

export default BuySugar;
