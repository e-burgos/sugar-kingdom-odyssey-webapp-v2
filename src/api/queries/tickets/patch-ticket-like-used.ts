import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../store/useAuth";
import axiosClient from "../../config/axios-client";
import { ticketPatchById } from "@/api/endpoints/ticket/endpoints";
import { ITicketResponse } from "@/api/endpoints/ticket/types";
import { generateHeaders } from "@/api/utils/HeaderEncoder";

export function PatchTicketLikeUsed(ticketId: string) {
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: ticketPatchById(ticketId).method,
    endpoint: ticketPatchById(ticketId).endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handlePatchTicketLikeUsed = async (): Promise<ITicketResponse> => {
    if (!ticketId) throw new Error("Ticket ID is required");
    const data = await axiosClient
      .patch(ticketPatchById(ticketId).endpoint, {
        headers: {
          userId: userId,
          ...headers,
        },
      })
      .then((res) => res.data as ITicketResponse);
    return data;
  };

  return useMutation({
    mutationKey: ["patch-ticket-by-id", ticketId],
    mutationFn: handlePatchTicketLikeUsed,
  });
}
