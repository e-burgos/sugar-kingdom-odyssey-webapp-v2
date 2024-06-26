import React, { useEffect } from "react";
import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import BuyCard from "./BuyCard";
import BuyTicketsCard from "./BuyTicketsCard";
import PlayNowCard from "./PlayNowCard";
import PendingCard from "./PendingCard";
import SuccessCard from "./SuccessCard";
import { useBuyTickets } from "@/store/useBuyTickets";

export type TournamentAction =
  | "initial"
  | "buy-ticket"
  | "play-now"
  | "pending"
  | "success"
  | "leaderboard";

interface OrchestratorCardProps {
  tournament: ITournamentResponse;
  initialAction?: TournamentAction;
  actionCard?: TournamentAction;
}

const OrchestratorCard: React.FC<OrchestratorCardProps> = ({
  tournament,
  initialAction,
  actionCard,
}) => {
  const { data, setData } = useBuyTickets();
  const ticketData = data.find((item) => item.id === tournament.id);
  const action = ticketData?.action || "initial";

  useEffect(() => {
    if (!ticketData)
      setData({
        id: tournament.id,
        action: actionCard || initialAction || "initial",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {action === "initial" && <BuyCard tournament={tournament} />}
      {action === "buy-ticket" && <BuyTicketsCard tournament={tournament} />}
      {action === "play-now" && <PlayNowCard tournament={tournament} />}
      {action === "pending" && <PendingCard tournament={tournament} />}
      {action === "success" && <SuccessCard tournament={tournament} />}
    </>
  );
};

export default OrchestratorCard;
