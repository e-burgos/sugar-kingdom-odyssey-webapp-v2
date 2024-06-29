import React, { useEffect } from "react";
import styles from "./styles.module.css";
import ButtonImage from "@/components/buttons/button-image";
import Paragraph from "@/components/typography/paragraph";
import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import { useNavigate } from "react-router-dom";
import { useBuyTickets } from "@/store/useBuyTickets";

// Bgs
import GrayContainer from "@/assets/images/tournaments/gray.svg";
import BlueContainer from "@/assets/images/tournaments/blue.svg";
import OrangeContainer from "@/assets/images/tournaments/orange.svg";
import CyanContainer from "@/assets/images/tournaments/cyan.svg";

// Characters
import Character from "@/assets/images/tournaments/successCharacter.svg";

// Buttons
import CancelButton from "@/assets/images/tournaments/buttons/cancel.svg";
import CancelButtonH from "@/assets/images/tournaments/buttons/cancelH.svg";
import PlayButton from "@/assets/images/tournaments/buttons/play.svg";
import PlayButtonH from "@/assets/images/tournaments/buttons/playH.svg";
import useUserTickets from "@/hooks/useUserTickets";

const GrayContainerImg = new Image();
GrayContainerImg.src = GrayContainer;

const BlueContainerImg = new Image();
BlueContainerImg.src = BlueContainer;

const OrangeContainerImg = new Image();
OrangeContainerImg.src = OrangeContainer;

const CyanContainerImg = new Image();
CyanContainerImg.src = CyanContainer;

interface SuccessCardProps {
  tournament: ITournamentResponse;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ tournament }) => {
  const { data, setAction } = useBuyTickets();
  const { availableUserTickets, refresh } = useUserTickets(tournament.id);
  const navigate = useNavigate();

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ticketData = data.find((item) => item.id === tournament.id);

  const color =
    tournament?.statusFlag === "now"
      ? "blue"
      : tournament?.statusFlag === "future"
      ? "cyan"
      : tournament?.statusFlag === "previous"
      ? "gray"
      : "orange";

  return (
    <div className={styles.wrapper}>
      <Paragraph
        className={styles.typeLabel}
        fontFamily="Titan-Regular"
        color="#F2AB02"
        fontWeight="bold"
        fontSize="50px"
      >
        {"Ticket"}
      </Paragraph>

      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${
            color === "blue"
              ? BlueContainerImg.src
              : color === "orange"
              ? OrangeContainerImg.src
              : color === "gray"
              ? GrayContainerImg.src
              : CyanContainerImg.src
          })`,
        }}
      >
        <div className={styles.content}>
          <div className={styles.title}>
            {tournament?.name && (
              <Paragraph
                color={
                  tournament.statusFlag === "now"
                    ? "rgba(42, 252, 253, 1)"
                    : "white"
                }
                fontSize="20px"
              >
                {tournament?.name}
              </Paragraph>
            )}
          </div>

          <ButtonImage
            img={Character}
            imgHover={Character}
            aspectRatio={"222/203"}
            height="180px"
          />

          <div
            style={{ marginBottom: "15px" }}
            className={styles.textContainer}
          >
            <Paragraph color="white" fontSize="30px">
              {`Success! You purchased`}
            </Paragraph>
            <Paragraph color="rgba(42, 252, 253, 1)" fontSize="25px">
              {`${ticketData?.tickets} tickets`}
            </Paragraph>
            <Paragraph color="white" fontSize="12px" fontFamily="Gotham-Light">
              {`(${availableUserTickets} tickets available)`}
            </Paragraph>
          </div>
        </div>
      </div>
      <div className={styles.actionButtons}>
        <ButtonImage
          img={PlayButton}
          imgHover={PlayButtonH}
          height="50px"
          aspectRatio="30/11"
          disabled={availableUserTickets === 0}
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
            setAction(tournament.id, "initial");
          }}
        />
      </div>
    </div>
  );
};

export default SuccessCard;
