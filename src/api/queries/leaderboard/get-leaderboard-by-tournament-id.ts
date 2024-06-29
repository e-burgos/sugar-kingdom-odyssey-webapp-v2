import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/config/axios-client";
import { leaderboardGetByTournamentId } from "@/api/endpoints/leaderboard/endpoints";
import { ILeaderboardResponse } from "@/api/endpoints/leaderboard/types";
import { useAuth } from "@/store/useAuth";
import { generateHeaders } from "@/api/utils/HeaderEncoder";

export function GetLeaderboardByTournamentId(tournamentId: string) {
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: leaderboardGetByTournamentId(tournamentId).method,
    endpoint: leaderboardGetByTournamentId(tournamentId).endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handleGetLeaderboardByTournamentId =
    async (): Promise<ILeaderboardResponse> => {
      if (!tournamentId) throw new Error("Tournament ID is required");
      const data = await axiosClient
        .get(leaderboardGetByTournamentId(tournamentId).endpoint, {
          headers: {
            ...headers,
          },
        })
        .then((res) => res.data as ILeaderboardResponse);
      return data;
    };

  return useQuery({
    queryKey: ["get-leaderboard-by-tournament-id", tournamentId],
    queryFn: handleGetLeaderboardByTournamentId,
    refetchOnWindowFocus: false,
    //enabled: !!tournamentId,
    //staleTime: 1000 * 60 * 5,
  });
}
