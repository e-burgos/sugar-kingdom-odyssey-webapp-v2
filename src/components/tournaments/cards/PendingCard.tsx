import React from "react";
import styles from "./styles.module.css";
import ButtonImage from "../../buttons/button-image";
import Paragraph from "../../typography/paragraph";
import { ITournamentResponse } from "@/api/endpoints/tournament/types";

// Bgs
import GrayContainer from "@/assets/images/tournaments/gray.svg";
import BlueContainer from "@/assets/images/tournaments/blue.svg";
import OrangeContainer from "@/assets/images/tournaments/orange.svg";
import CyanContainer from "@/assets/images/tournaments/cyan.svg";

// Characters
import Character from "@/assets/images/tournaments/pendingCharacter.svg";

const GrayContainerImg = new Image();
GrayContainerImg.src = GrayContainer;

const BlueContainerImg = new Image();
BlueContainerImg.src = BlueContainer;

const OrangeContainerImg = new Image();
OrangeContainerImg.src = OrangeContainer;

const CyanContainerImg = new Image();
CyanContainerImg.src = CyanContainer;

interface PendingCardProps {
  tournament: ITournamentResponse;
}

const PendingCard: React.FC<PendingCardProps> = ({ tournament }) => {
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
            aspectRatio={"137/188"}
            height="180px"
          />

          <div
            style={{ marginBottom: "15px" }}
            className={styles.textContainer}
          >
            <Paragraph color="white" fontSize="30px">
              {`Pending Confirmation`}
            </Paragraph>
            <Paragraph color="white" fontSize="12px" fontFamily="Gotham-Light">
              {`This might take a few minutes.`}
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingCard;
