import React from "react";
import styles from "./styles.module.css";
import ButtonImage from "@/components/buttons/button-image";
import Paragraph from "@/components/typography/paragraph";
import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import LeaderboardDetailButton from "@/components/leaderboard/LeaderboardDetailButton";
import TokenList from "../tokens/token-list/TokenList";

// Bgs
import GrayContainer from "@/assets/images/tournaments/gray.svg";

// Characters
import BlueCharacter from "@/assets/images/tournaments/blueCharacter.svg";
import OrangeCharacter from "@/assets/images/tournaments/orangeCharacter.svg";
import CyanCharacter from "@/assets/images/tournaments/cyanCharacter.svg";
import { formatUTCDate } from "@/utils/numberUtils";
import { handleTournamentStatus } from "@/utils/functions";

const GrayContainerImg = new Image();
GrayContainerImg.src = GrayContainer;

interface PreviusCardProps {
  character?: "gray" | "orange" | "cyan";
  tournament?: ITournamentResponse;
  hidePlusButton?: boolean;
}

const PreviusCard: React.FC<PreviusCardProps> = ({
  character,
  tournament,
  hidePlusButton,
}) => {
  const TournamentType = `${tournament?.statusFlag
    .slice(0, 1)
    .toUpperCase()}${tournament?.statusFlag.slice(
    1,
    tournament?.statusFlag.length
  )}`;

  const timeEnded = formatUTCDate(tournament?.endDate as string) || "";
  const status = handleTournamentStatus(tournament?.status as number);

  return (
    <div className={styles.wrapper}>
      {TournamentType && (
        <Paragraph
          className={styles.typeLabel}
          fontFamily="Titan-Regular"
          color="#F2AB02"
          fontWeight="bold"
          fontSize="50px"
        >
          {TournamentType}
        </Paragraph>
      )}
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${GrayContainerImg.src})`,
        }}
      >
        <div className={styles.content}>
          <div className={styles.title}>
            {tournament?.name && (
              <Paragraph color="white" fontSize="20px">
                {tournament.name}
              </Paragraph>
            )}
            <TokenList
              tokens={tournament?.prices || []}
              hidePlusButton={hidePlusButton}
            />
          </div>

          <ButtonImage
            img={
              character === "cyan"
                ? CyanCharacter
                : character === "orange"
                ? OrangeCharacter
                : BlueCharacter
            }
            imgHover={
              character === "cyan"
                ? CyanCharacter
                : character === "orange"
                ? OrangeCharacter
                : BlueCharacter
            }
            aspectRatio={
              character === "cyan"
                ? "162/173"
                : character === "orange"
                ? "252/167"
                : "1/1"
            }
            height="120px
            "
          />

          <div className={styles.textContainer}>
            {status && (
              <Paragraph color="white" fontSize="18px">
                {`Status: ${status}`}
              </Paragraph>
            )}
            {timeEnded && (
              <Paragraph color="white" fontSize="16px">
                {`Ended: ${timeEnded}`}
              </Paragraph>
            )}
          </div>
          <div className={styles.actionButtons}>
            {tournament && (
              <LeaderboardDetailButton data={tournament} size="50px" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviusCard;
