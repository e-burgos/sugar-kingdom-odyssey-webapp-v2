import React from "react";
import styles from "./styles.module.css";
import ButtonImage from "../../buttons/button-image";
import Paragraph from "../../typography/paragraph";
import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import LeaderboardDetailButton from "@/components/leaderboard/LeaderboardDetailButton";
import TokenList from "../tokens/token-list/TokenList";
import { handleRemainingTime } from "@/utils/functions";
import { formatToMoney, formatUTCDate } from "@/utils/numberUtils";
import { TournamentAction } from "./OrchestratorCard";

// Bgs
import GrayContainer from "@/assets/images/tournaments/gray.svg";
import BlueContainer from "@/assets/images/tournaments/blue.svg";
import OrangeContainer from "@/assets/images/tournaments/orange.svg";
import CyanContainer from "@/assets/images/tournaments/cyan.svg";

// Characters
import BlueCharacter from "@/assets/images/tournaments/blueCharacter.svg";
import OrangeCharacter from "@/assets/images/tournaments/orangeCharacter.svg";
import CyanCharacter from "@/assets/images/tournaments/cyanCharacter.svg";

// Buttons
import BuyTicketButton from "@/assets/images/tournaments/buttons/buyTicket.svg";
import BuyTicketButtonH from "@/assets/images/tournaments/buttons/buyTicketH.svg";
import PlayNowButton from "@/assets/images/tournaments/buttons/playNow.svg";
import PlayNowButtonH from "@/assets/images/tournaments/buttons/playNowH.svg";

const GrayContainerImg = new Image();
GrayContainerImg.src = GrayContainer;

const BlueContainerImg = new Image();
BlueContainerImg.src = BlueContainer;

const OrangeContainerImg = new Image();
OrangeContainerImg.src = OrangeContainer;

const CyanContainerImg = new Image();
CyanContainerImg.src = CyanContainer;

interface BuyCardProps {
  character?: "gray" | "orange" | "cyan";
  tournament?: ITournamentResponse;
  hidePlusButton?: boolean;
  userTickets: number;
  setAction?: React.Dispatch<React.SetStateAction<TournamentAction>>;
}

const BuyCard: React.FC<BuyCardProps> = ({
  character,
  tournament,
  hidePlusButton,
  userTickets,
  setAction,
}) => {
  const color =
    tournament?.statusFlag === "now"
      ? "blue"
      : tournament?.statusFlag === "future"
      ? "cyan"
      : tournament?.statusFlag === "previous"
      ? "gray"
      : "orange";

  const TournamentType = `${tournament?.statusFlag
    .slice(0, 1)
    .toUpperCase()}${tournament?.statusFlag.slice(
    1,
    tournament?.statusFlag.length
  )}`;

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
          {`${TournamentType}`}
        </Paragraph>
      )}
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
            <TokenList
              tokens={tournament?.prices || []}
              hidePlusButton={hidePlusButton}
            />
          </div>

          <ButtonImage
            img={
              color === "cyan"
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
            height="120px"
          />

          <div className={styles.textContainer}>
            {tournament?.status !== undefined && (
              <Paragraph color="white" fontSize="18px">
                {`Price Pool: $${formatToMoney(tournament.pricePool)}`}
              </Paragraph>
            )}
            {tournament?.statusFlag === "now" && tournament?.remainingTime && (
              <Paragraph color="white" fontSize="16px">
                {`Time Left: ${handleRemainingTime(tournament?.remainingTime)}`}
              </Paragraph>
            )}
            {tournament?.statusFlag === "future" && tournament?.startDate && (
              <Paragraph color="white" fontSize="16px">
                {`Starts: ${
                  formatUTCDate(tournament.startDate as string) || ""
                }`}
              </Paragraph>
            )}
          </div>
          <div className={styles.actionButtons}>
            <ButtonImage
              img={BuyTicketButton}
              imgHover={BuyTicketButtonH}
              height="50px"
              aspectRatio="30/11"
              onClick={() => setAction && setAction("buy-ticket")}
            />
            {tournament?.statusFlag === "now" && (
              <LeaderboardDetailButton data={tournament} size="50px" />
            )}
          </div>
        </div>
      </div>
      {tournament?.statusFlag === "now" && (
        <ButtonImage
          img={userTickets ? PlayNowButton : PlayNowButtonH}
          imgHover={PlayNowButtonH}
          width="220px"
          aspectRatio="63/29"
          onClick={() => setAction && userTickets > 0 && setAction("play-now")}
        />
      )}
    </div>
  );
};

export default BuyCard;
