import { useQuery } from "@tanstack/react-query";
import { ticketGetAll } from "@/api/endpoints/ticket/endpoints";
import { ITicketResponse } from "@/api/endpoints/ticket/types";
import { generateHeaders } from "@/api/utils/HeaderEncoder";
import { useAuth } from "@/store/useAuth";
import axiosClient from "@/api/config/axios-client";

export function GetAllTickets() {
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: ticketGetAll().method,
    endpoint: ticketGetAll().endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handleGetAllTickets = async (): Promise<ITicketResponse[]> => {
    const data = await axiosClient
      .get(ticketGetAll().endpoint, {
        headers,
      })
      .then((res) => res.data as ITicketResponse[]);
    return data;
  };

  return useQuery({
    queryKey: ["get-all-tickets"],
    queryFn: handleGetAllTickets,
    refetchOnWindowFocus: false,
    //staleTime: 1000 * 60 * 5,
  });
}
