import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/useAuth";
import { gameGetByUser } from "@/api/endpoints/game/endpoints";
import { IUserGamesResponse } from "@/api/endpoints/game/types";
import { generateHeaders } from "@/api/utils/HeaderEncoder";
import axiosClient from "@/api/config/axios-client";

export function GetGamesByUser() {
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: gameGetByUser(userId as string).method,
    endpoint: gameGetByUser(userId as string).endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handleGetGamesByUser = async (): Promise<IUserGamesResponse[]> => {
    if (!userId) throw new Error("User ID is required");
    const data = await axiosClient
      .get(gameGetByUser(userId).endpoint, {
        headers,
      })
      .then((res) => res.data as IUserGamesResponse[]);
    return data;
  };

  return useQuery({
    queryKey: ["get-games-by-user-id", userId],
    queryFn: handleGetGamesByUser,
    refetchOnWindowFocus: false,
    //enabled: !!userId,
    //staleTime: 1000 * 60 * 5,
  });
}
