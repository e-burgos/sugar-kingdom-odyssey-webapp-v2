import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../store/useAuth";
import axiosClient from "../../config/axios-client";
import { ticketGetByUser } from "@/api/endpoints/ticket/endpoints";
import { ITicketResponse } from "@/api/endpoints/ticket/types";

export function GetTicketsByUserId() {
  const { userId } = useAuth();
  const handleGetTicketsByUserId = async (): Promise<ITicketResponse[]> => {
    if (!userId) throw new Error("User ID is required");
    const data = await axiosClient
      .get(ticketGetByUser(userId).endpoint)
      .then((res) => res.data as ITicketResponse[]);
    return data;
  };

  return useQuery({
    queryKey: ["get-tickets-by-user-id", userId],
    queryFn: handleGetTicketsByUserId,
    enabled: !!userId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
