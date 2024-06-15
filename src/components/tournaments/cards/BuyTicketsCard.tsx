import React, { useState } from "react";
import styles from "./styles.module.css";
import ButtonImage from "../../buttons/button-image";
import Paragraph from "../../typography/paragraph";
import {
  ITournamentPrice,
  ITournamentResponse,
} from "@/api/endpoints/tournament/types";
import TokenList from "../tokens/token-list/TokenList";
import { formatToMoney } from "@/utils/numberUtils";

// Bgs
import GrayContainer from "@/assets/images/tournaments/gray.svg";
import BlueContainer from "@/assets/images/tournaments/blue.svg";
import OrangeContainer from "@/assets/images/tournaments/orange.svg";
import CyanContainer from "@/assets/images/tournaments/cyan.svg";

// Buttons
import BuyButton from "@/assets/images/tournaments/buttons/buy.svg";
import BuyButtonH from "@/assets/images/tournaments/buttons/buyH.svg";
import CancelButton from "@/assets/images/tournaments/buttons/cancel.svg";
import CancelButtonH from "@/assets/images/tournaments/buttons/cancelH.svg";
import PlusButton from "@/assets/images/tournaments/buttons/plus.svg";
import PlusButtonH from "@/assets/images/tournaments/buttons/plusH.svg";
import MinusButton from "@/assets/images/tournaments/buttons/minus.svg";
import MinusButtonH from "@/assets/images/tournaments/buttons/minusH.svg";
import { TournamentAction } from "./OrchestratorCard";

const GrayContainerImg = new Image();
GrayContainerImg.src = GrayContainer;

const BlueContainerImg = new Image();
BlueContainerImg.src = BlueContainer;

const OrangeContainerImg = new Image();
OrangeContainerImg.src = OrangeContainer;

const CyanContainerImg = new Image();
CyanContainerImg.src = CyanContainer;

interface BuyTicketsCardProps {
  tournament?: ITournamentResponse;
  hidePlusButton?: boolean;
  setAction?: React.Dispatch<React.SetStateAction<TournamentAction>>;
}

const BuyTicketsCard: React.FC<BuyTicketsCardProps> = ({
  tournament,
  hidePlusButton,
  setAction,
}) => {
  const [token, setToken] = useState<ITournamentPrice | null>(null);
  const [tickets, setTickets] = useState<number>(1);

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
        {"Tickets"}
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
        <div
          className={styles.content}
          style={{ justifyContent: !token ? "flex-start" : "space-between" }}
        >
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
                {tournament.name}
              </Paragraph>
            )}
          </div>

          <div
            className={styles.textContainer}
            style={{
              justifyContent: !token ? "center" : "space-between",
              height: !token ? "100%" : "",
            }}
          >
            <Paragraph color="white" fontSize="30px">
              {`Pick a Token`}
            </Paragraph>
            <TokenList
              tokens={tournament?.prices || []}
              hidePlusButton={hidePlusButton}
              setToken={(e) => {
                setToken(e);
                setTickets(1);
              }}
            />
            {token !== null && (
              <>
                <Paragraph
                  style={{ marginTop: "25px" }}
                  color="white"
                  fontSize="30px"
                >
                  {`How many?`}
                </Paragraph>
                <div className={styles.amountContainer}>
                  <ButtonImage
                    style={{ marginTop: "8px" }}
                    img={MinusButton}
                    imgHover={MinusButtonH}
                    height="30px"
                    aspectRatio="20/17"
                    onClick={() => {
                      setTickets(tickets - 1);
                      if (tickets === 1) setToken(null);
                    }}
                  />
                  <Paragraph fontSize="30px" color="rgba(42, 252, 253, 1)">
                    {`${tickets} tickets`}
                  </Paragraph>
                  <ButtonImage
                    style={{ marginTop: "8px" }}
                    img={PlusButton}
                    imgHover={PlusButtonH}
                    height="30px"
                    aspectRatio="20/17"
                    onClick={() => setTickets(tickets + 1)}
                  />
                </div>
              </>
            )}
          </div>
          {token !== null && (
            <div className={styles.infoNetwork}>
              <Paragraph
                color="white"
                fontSize="10px"
                fontFamily="Gotham-Light"
              >
                {`TOKEN: ${token?.token?.name}`}
              </Paragraph>
              <Paragraph
                color="white"
                fontSize="10px"
                fontFamily="Gotham-Light"
              >
                {`TOTAL AMOUNT: ${formatToMoney(token?.amount || "0")} ${
                  token?.token?.symbol
                }`}
              </Paragraph>
              <Paragraph
                color="white"
                fontSize="10px"
                fontFamily="Gotham-Light"
              >
                {`WALLET ADDRESS:`}
              </Paragraph>
              <Paragraph color="white" fontSize="8px" fontFamily="Gotham-Light">
                {`${tournament?.wallet}`}
              </Paragraph>
            </div>
          )}
        </div>
      </div>
      <div className={styles.actionButtons}>
        <ButtonImage
          img={!token ? BuyButtonH : BuyButton}
          imgHover={BuyButtonH}
          height="50px"
          aspectRatio="30/11"
          onClick={() => {
            token && setAction && setAction("pending");
          }}
        />
        <ButtonImage
          img={CancelButton}
          imgHover={CancelButtonH}
          height="50px"
          aspectRatio="30/11"
          onClick={() => {
            setToken(null);
            setAction && setAction("initial");
          }}
        />
      </div>
    </div>
  );
};

export default BuyTicketsCard;
