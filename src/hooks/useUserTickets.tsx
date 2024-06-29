import { ITicketResponse } from "@/api/endpoints/ticket/types";
import { GetTicketsByTournament } from "@/api/queries/tickets/get-tickets-by-tournament";
import { useAuth } from "@/store/useAuth";
import { useCallback } from "react";

const useUserTickets = (tournamentId: string) => {
  const { userId } = useAuth();
  const getTickets = GetTicketsByTournament(tournamentId);

  const handleFilter = useCallback(
    (filter: "all" | "used" | "available", ticket: ITicketResponse) => {
      switch (filter) {
        case "all":
          return true;
        case "used":
          return ticket.used === true;
        case "available":
          return ticket.used === false;
        default:
          return true;
      }
    },
    []
  );

  const handleUserTickets = useCallback(
    (filter: "all" | "used" | "available") => {
      if (getTickets?.data && getTickets.isSuccess && userId) {
        return getTickets.data?.filter(
          (ticket) =>
            ticket.userId === userId &&
            ticket.paymentComplete === true &&
            ticket.paymentRegisteredDate !== null &&
            handleFilter(filter, ticket)
        );
      }
      return [];
    },
    [getTickets?.data, handleFilter, getTickets.isSuccess, userId]
  );

  const refresh = () => getTickets.refetch();

  const availableUserTickets = handleUserTickets("available")?.length || 0;
  const usedUserTickets = handleUserTickets("used")?.length || 0;
  const allUserTickets = handleUserTickets("all")?.length || 0;

  return {
    availableUserTickets,
    usedUserTickets,
    allUserTickets,
    handleUserTickets,
    refresh,
    isLoading: getTickets.isLoading || getTickets.isFetching,
  };
};
export default useUserTickets;
