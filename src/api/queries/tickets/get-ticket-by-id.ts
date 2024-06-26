import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../store/useAuth";
import axiosClient from "../../config/axios-client";
import { ticketGetById } from "@/api/endpoints/ticket/endpoints";
import { ITicketResponse } from "@/api/endpoints/ticket/types";
import { generateHeaders } from "@/api/utils/HeaderEncoder";

export function GetTicketById(ticketId: string) {
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: ticketGetById(ticketId).method,
    endpoint: ticketGetById(ticketId).endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handleGetTicketById = async (): Promise<ITicketResponse> => {
    if (!ticketId) throw new Error("Ticket ID is required");
    const data = await axiosClient
      .get(ticketGetById(ticketId).endpoint, {
        headers,
      })
      .then((res) => res.data as ITicketResponse);
    return data;
  };

  return useQuery({
    queryKey: ["get-ticket-by-id", ticketId],
    queryFn: handleGetTicketById,
    refetchOnWindowFocus: false,
    //enabled: !!ticketId,
    //staleTime: 1000 * 60 * 5,
  });
}
