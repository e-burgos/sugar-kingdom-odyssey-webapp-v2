import { useQuery } from "@tanstack/react-query";
import { ticketGetByUser } from "@/api/endpoints/ticket/endpoints";
import { ITicketResponse } from "@/api/endpoints/ticket/types";
import { generateHeaders } from "@/api/utils/HeaderEncoder";
import { useAuth } from "@/store/useAuth";
import axiosClient from "@/api/config/axios-client";

export function GetTicketsByUserId() {
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: ticketGetByUser(userId as string).method,
    endpoint: ticketGetByUser(userId as string).endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handleGetTicketsByUserId = async (): Promise<ITicketResponse[]> => {
    if (!userId) throw new Error("User ID is required");
    const data = await axiosClient
      .get(ticketGetByUser(userId).endpoint, {
        headers,
      })
      .then((res) => res.data as ITicketResponse[]);
    return data;
  };

  return useQuery({
    queryKey: ["get-tickets-by-user-id", userId],
    queryFn: handleGetTicketsByUserId,
    refetchOnWindowFocus: false,
    //enabled: !!userId,
    //staleTime: 1000 * 60 * 5,
  });
}
