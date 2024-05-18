import React from "react";
import styles from "./home.module.css";
import ButtonImage from "../../components/buttons/button-image";
import TournamentImg from "../../assets/images/buttons/tournamentMode.svg";
import TournamentHImg from "../../assets/images/buttons/tournamentModeH.svg";
import Tournament1v1Img from "../../assets/images/buttons/tournament1v1Mode.svg";
import { usePageOrchestrator } from "../../store/usePageOrchestrator";

interface HomeProps {
  style?: React.CSSProperties;
}

const Home: React.FC<HomeProps> = ({ style }) => {
  const { setCurrentPage } = usePageOrchestrator();
  return (
    <div style={style} className={styles.buttons}>
      <div className={styles.tourButtons}>
        <ButtonImage
          img={TournamentImg}
          imgHover={TournamentHImg}
          height="120px"
          aspectRatio="115/52"
          style={{
            marginTop: "10px",
          }}
          onClick={() => setCurrentPage("tournaments")}
        />
        <ButtonImage
          img={Tournament1v1Img}
          imgHover={Tournament1v1Img}
          height="130px"
          aspectRatio="115/52"
        />
      </div>
    </div>
  );
};

export default Home;
