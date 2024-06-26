import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../config/axios-client";
import { ticketGetByTournament } from "@/api/endpoints/ticket/endpoints";
import { ITicketResponse } from "@/api/endpoints/ticket/types";
import { useAuth } from "@/store/useAuth";
import { generateHeaders } from "@/api/utils/HeaderEncoder";

export function GetTicketsByTournament(tournamentId: string) {
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: ticketGetByTournament(tournamentId).method,
    endpoint: ticketGetByTournament(tournamentId).endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handleGetTicketsByTournament = async (): Promise<ITicketResponse[]> => {
    if (!tournamentId) throw new Error("Tournament ID is required");
    const data = await axiosClient
      .get(ticketGetByTournament(tournamentId).endpoint, {
        headers,
      })
      .then((res) => res.data as ITicketResponse[]);
    return data;
  };

  return useQuery({
    queryKey: ["get-tickets-by-tournament-id", tournamentId],
    queryFn: handleGetTicketsByTournament,
    refetchOnWindowFocus: false,
    //enabled: !!tournamentId,
    //staleTime: 1000 * 60 * 5,
  });
}
