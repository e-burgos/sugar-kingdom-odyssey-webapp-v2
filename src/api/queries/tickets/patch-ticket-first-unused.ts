import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/store/useAuth";
import axiosClient from "@/api/config/axios-client";
import { ticketPatchFirstUnused } from "@/api/endpoints/ticket/endpoints";
import { ITicketResponse } from "@/api/endpoints/ticket/types";
import { generateHeaders } from "@/api/utils/HeaderEncoder";

export function PatchTicketFirstUnused() {
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: ticketPatchFirstUnused(userId as string).method,
    endpoint: ticketPatchFirstUnused(userId as string).endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handlePatchTicketFirstUnused = async (): Promise<ITicketResponse> => {
    if (!userId) throw new Error("User ID is required");
    const data = await axiosClient
      .patch(ticketPatchFirstUnused(userId).endpoint, undefined, {
        headers: {
          userId: userId,
          ...headers,
        },
      })
      .then((res) => res.data as ITicketResponse);
    return data;
  };

  return useMutation({
    mutationKey: ["patch-ticket-first-unused", userId],
    mutationFn: handlePatchTicketFirstUnused,
  });
}
