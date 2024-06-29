import React, { useEffect } from "react";
import styles from "./styles.module.css";
import ButtonImage from "@/components/buttons/button-image";
import Paragraph from "@/components/typography/paragraph";
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
import { appPaths } from "@/router/RoutesConfig";
import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import useUserTickets from "@/hooks/useUserTickets";
import { useBuyTickets } from "@/store/useBuyTickets";

const GrayContainerImg = new Image();
GrayContainerImg.src = GrayContainer;

const BlueContainerImg = new Image();
BlueContainerImg.src = BlueContainer;

const OrangeContainerImg = new Image();
OrangeContainerImg.src = OrangeContainer;

const CyanContainerImg = new Image();
CyanContainerImg.src = CyanContainer;

interface PlayNowCardProps {
  tournament: ITournamentResponse;
  cancelAction?: TournamentAction;
}

const PlayNowCard: React.FC<PlayNowCardProps> = ({
  tournament,
  cancelAction,
}) => {
  const navigate = useNavigate();
  const { setAction } = useBuyTickets();

  const { availableUserTickets, refresh, isLoading } = useUserTickets(
    tournament.id
  );

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {`${availableUserTickets} ${
                availableUserTickets > 1 ? "tickets" : "ticket"
              }`}
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
          disabled={availableUserTickets === 0 || isLoading}
          height="50px"
          aspectRatio="30/11"
          onClick={() => {
            navigate(appPaths.game);
          }}
        />
        <ButtonImage
          img={CancelButton}
          imgHover={CancelButtonH}
          height="50px"
          aspectRatio="30/11"
          onClick={() => {
            setAction(tournament.id, cancelAction || "initial");
          }}
        />
      </div>
    </div>
  );
};

export default PlayNowCard;
