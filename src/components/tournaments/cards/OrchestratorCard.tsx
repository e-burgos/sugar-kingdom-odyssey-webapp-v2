import React, { useState } from "react";
import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import BuyCard from "./BuyCard";
import BuyTicketsCard from "./BuyTicketsCard";
import PlayNowCard from "./PlayNowCard";
import { ITicketResponse } from "@/api/endpoints/ticket/types";
import PendingCard from "./PendingCard";
import SuccessCard from "./SuccessCard";

export type TournamentAction =
  | "initial"
  | "buy-ticket"
  | "play-now"
  | "pending"
  | "success";

interface OrchestratorCardProps {
  tournament: ITournamentResponse;
  userTickets?: ITicketResponse[];
}

const OrchestratorCard: React.FC<OrchestratorCardProps> = ({
  tournament,
  userTickets,
}) => {
  const [action, setAction] = useState<TournamentAction>("initial");

  const handleUserTickets = () => {
    if (userTickets) {
      return userTickets.filter(
        (ticket) => ticket.tournamentId === tournament.id
      );
    }
    return [];
  };

  const userTicketCount = handleUserTickets()?.length || 0;

  return (
    <>
      {action === "initial" && (
        <BuyCard
          character={tournament.statusFlag === "now" ? "orange" : "cyan"}
          tournament={tournament}
          userTickets={userTicketCount}
          setAction={setAction}
        />
      )}
      {action === "buy-ticket" && (
        <BuyTicketsCard tournament={tournament} setAction={setAction} />
      )}
      {action === "play-now" && (
        <PlayNowCard setAction={setAction} tickets={userTicketCount} />
      )}
      {action === "pending" && <PendingCard tournament={tournament} />}
      {action === "success" && <SuccessCard tournament={tournament} />}
    </>
  );
};

export default OrchestratorCard;
