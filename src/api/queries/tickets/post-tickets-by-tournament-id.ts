import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/store/useAuth";
import axiosClient from "@/api/config/axios-client";
import {
  ITicketResponse,
  ITicketsPostByTournamentIdPayload,
} from "@/api/endpoints/ticket/types";
import { generateHeaders } from "@/api/utils/HeaderEncoder";
import { ticketPostByTournamentId } from "@/api/endpoints/ticket/endpoints";

export function PostTicketsByTournamentId(
  tournamentId: string,
  ticketAmount: number,
  priceId: string,
  transactionHash: string
) {
  const { sessionId, userId, wallet } = useAuth();

  const payload: ITicketsPostByTournamentIdPayload = {
    ticketAmount,
    priceId,
    transactionHash,
  };

  const headers = generateHeaders({
    method: ticketPostByTournamentId(tournamentId, payload).method,
    endpoint: ticketPostByTournamentId(tournamentId, payload).endpoint,
    payload: payload,
    wallet,
    sessionId,
    userId,
  });

  const handlePostTicketsByTournamentId = async (): Promise<
    ITicketResponse[]
  > => {
    const data = await axiosClient
      .post(ticketPostByTournamentId(tournamentId, payload).endpoint, payload, {
        headers: {
          ...headers,
        },
      })
      .then((res) => res.data as ITicketResponse[]);
    return data;
  };

  return useMutation({
    mutationKey: [
      "post-ticket-by-tournament-id",
      tournamentId,
      transactionHash,
    ],
    mutationFn: handlePostTicketsByTournamentId,
  });
}
