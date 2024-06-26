/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from "react";
import styles from "./styles.module.css";
import ButtonImage from "@/components/buttons/button-image";
import Paragraph from "@/components/typography/paragraph";
import {
  ITournamentPrice,
  ITournamentResponse,
} from "@/api/endpoints/tournament/types";
import TokenList from "../tokens/token-list/TokenList";
import { TournamentAction } from "./OrchestratorCard";
import useTransaction from "@/hooks/useTransaction";
import { useBuyTickets } from "@/store/useBuyTickets";

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

const GrayContainerImg = new Image();
GrayContainerImg.src = GrayContainer;

const BlueContainerImg = new Image();
BlueContainerImg.src = BlueContainer;

const OrangeContainerImg = new Image();
OrangeContainerImg.src = OrangeContainer;

const CyanContainerImg = new Image();
CyanContainerImg.src = CyanContainer;

interface BuyTicketsCardProps {
  tournament: ITournamentResponse;
  hidePlusButton?: boolean;
  cancelAction?: TournamentAction;
}

const BuyTicketsCard: React.FC<BuyTicketsCardProps> = ({
  tournament,
  hidePlusButton,
  cancelAction,
}) => {
  const { data, setData, setTickets, setToken, setAction, setAmount } =
    useBuyTickets();

  const ticketData = data.find((item) => item.id === tournament.id);
  const token = ticketData?.token;
  const tickets = ticketData?.tickets || 1;
  const amount = (Number(token?.amount) * tickets).toString() || "0";

  useEffect(() => {
    if (!ticketData) setData({ id: tournament.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketData]);

  useEffect(() => {
    if (token?.id) setAmount(tournament.id, amount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token?.id, amount]);

  const { sendTransaction } = useTransaction(tournament, "0.001");

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
                setToken(tournament.id, e as ITournamentPrice);
                setTickets(tournament.id, 1);
              }}
            />
            {token?.id && (
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
                      if (tickets === 1) setToken(tournament.id, null);
                      setTickets(tournament.id, tickets - 1);
                      setAmount(tournament.id, amount);
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
                    onClick={() => {
                      setTickets(tournament.id, tickets + 1);
                      setTimeout(() => {
                        setAmount(tournament.id, amount);
                      }, 2000);
                    }}
                  />
                </div>
              </>
            )}
          </div>
          {token?.id && (
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
                {`TOTAL AMOUNT: ${amount} ${token?.token?.symbol}`}
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
          disabled={!token || amount === "0"}
          onClick={() => sendTransaction()}
        />
        <ButtonImage
          img={CancelButton}
          imgHover={CancelButtonH}
          height="50px"
          aspectRatio="30/11"
          onClick={() => {
            setToken(tournament.id, null);
            setTickets(tournament.id, 1);
            setAmount(tournament.id, "0");
            setAction(tournament.id, cancelAction || "initial");
          }}
        />
      </div>
    </div>
  );
};

export default BuyTicketsCard;
