import React from "react";
import styles from "./tournaments.module.css";
import DarkContainer from "../../components/dark-container";
import BuyContainer from "../../components/tournaments/buy-container";

interface TournamentsProps {
  style?: React.CSSProperties;
}

const Tournaments: React.FC<TournamentsProps> = ({ style }) => {
  return (
    <DarkContainer style={style} label={"Tournaments"} hideGain goToHomeButton>
      <div className={styles.wrapper}>
        <BuyContainer
          color="blue"
          title="BRC-20 Tournament"
          price="$130,314"
          timeLeft="4d 3h 24m"
          x1Button
          //onBuyClick={() => setNoAvailable(true)}
        />
        <BuyContainer
          color="orange"
          title="IA + Infra Pool"
          price="$130,314"
          timeLeft="4d 3h 24m"
          //onBuyClick={() => setNoAvailable(true)}
        />
        <BuyContainer
          color="cyan"
          title="Sweet Tournament"
          price="$130,314"
          timeLeft="4d 3h 24m"
          //onBuyClick={() => setNoAvailable(true)}
        />
      </div>
    </DarkContainer>
  );
};

export default Tournaments;
