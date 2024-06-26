import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/useAuth";
import axiosClient from "@/api/config/axios-client";
import { historyGetByUserId } from "@/api/endpoints/history/endpoints";
import { HistoryFilterType, IHistory } from "@/api/endpoints/history/types";
import { generateHeaders } from "@/api/utils/HeaderEncoder";

export function GetHistoryByUserId(filter: HistoryFilterType) {
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: historyGetByUserId(userId as string, filter).method,
    endpoint: historyGetByUserId(userId as string, filter).endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handleGetHistoryByUserId = async (): Promise<IHistory[]> => {
    if (!userId) throw new Error("userId not found");
    const data = await axiosClient
      .get(historyGetByUserId(userId, filter).endpoint, {
        headers,
      })
      .then((res) => res.data as IHistory[]);
    return data;
  };

  return useQuery({
    queryKey: ["get-history-by-user-id", filter, userId],
    queryFn: handleGetHistoryByUserId,
    refetchOnWindowFocus: false,
    //enabled: !!userId,
    //staleTime: 1000 * 60 * 5,
  });
}
