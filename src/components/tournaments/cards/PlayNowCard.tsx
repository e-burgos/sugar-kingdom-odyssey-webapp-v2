import React from "react";
import styles from "./styles.module.css";
import ButtonImage from "../../buttons/button-image";
import Paragraph from "../../typography/paragraph";
import { TournamentAction } from "./OrchestratorCard";
import { useNavigate } from "react-router-dom";

// Bgs
import GrayContainer from "@/assets/images/tournaments/gray.svg";
import BlueContainer from "@/assets/images/tournaments/blue.svg";
import OrangeContainer from "@/assets/images/tournaments/orange.svg";
import CyanContainer from "@/assets/images/tournaments/cyan.svg";

// Labels
import TicketLabel from "@/assets/images/tournaments/ticketsLabel.svg";

// Buttons
import CancelButton from "@/assets/images/tournaments/buttons/cancel.svg";
import CancelButtonH from "@/assets/images/tournaments/buttons/cancelH.svg";
import PlayButton from "@/assets/images/tournaments/buttons/play.svg";
import PlayButtonH from "@/assets/images/tournaments/buttons/playH.svg";

const GrayContainerImg = new Image();
GrayContainerImg.src = GrayContainer;

const BlueContainerImg = new Image();
BlueContainerImg.src = BlueContainer;

const OrangeContainerImg = new Image();
OrangeContainerImg.src = OrangeContainer;

const CyanContainerImg = new Image();
CyanContainerImg.src = CyanContainer;

interface PlayNowCardProps {
  tickets: number;
  setAction?: React.Dispatch<React.SetStateAction<TournamentAction>>;
}

const PlayNowCard: React.FC<PlayNowCardProps> = ({ tickets, setAction }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Paragraph
        className={styles.typeLabel}
        fontFamily="Titan-Regular"
        color="#F2AB02"
        fontWeight="bold"
        fontSize="50px"
      >
        {"Play Now"}
      </Paragraph>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${BlueContainerImg.src})`,
        }}
      >
        <div className={styles.content}>
          <Paragraph
            style={{ marginTop: "20px" }}
            color="white"
            fontSize="35px"
          >
            {`You have`}
          </Paragraph>
          <ButtonImage
            img={TicketLabel}
            imgHover={TicketLabel}
            height="90px"
            aspectRatio="157/93"
          />
          <div className={styles.ticketsText}>
            <Paragraph color="rgba(42, 252, 253, 1)" fontSize="30px">
              {`${tickets} ${tickets > 1 ? "tickets" : "ticket"}`}
            </Paragraph>
            <Paragraph color="rgba(42, 252, 253, 1)" fontSize="30px">
              {`available`}
            </Paragraph>
          </div>
          <Paragraph
            style={{ marginBottom: "20px" }}
            color="white"
            fontSize="30px"
          >
            {`Ready to play?`}
          </Paragraph>
        </div>
      </div>
      <div className={styles.actionButtons}>
        <ButtonImage
          img={PlayButton}
          imgHover={PlayButtonH}
          height="50px"
          aspectRatio="30/11"
          onClick={() => {
            navigate("/game");
          }}
        />
        <ButtonImage
          img={CancelButton}
          imgHover={CancelButtonH}
          height="50px"
          aspectRatio="30/11"
          onClick={() => {
            setAction && setAction("initial");
          }}
        />
      </div>
    </div>
  );
};

export default PlayNowCard;
