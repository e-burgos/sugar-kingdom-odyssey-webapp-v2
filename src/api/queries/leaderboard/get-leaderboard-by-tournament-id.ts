import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/config/axios-client";
import { leaderboardGetByTournamentId } from "@/api/endpoints/leaderboard/endpoints";
import { ILeaderboardResponse } from "@/api/endpoints/leaderboard/types";

export function GetLeaderboardByTournamentId(tournamentId: string) {
  const handleGetLeaderboardByTournamentId =
    async (): Promise<ILeaderboardResponse> => {
      if (!tournamentId) throw new Error("Tournament ID is required");
      const data = await axiosClient
        .get(leaderboardGetByTournamentId(tournamentId).endpoint)
        .then((res) => res.data as ILeaderboardResponse);
      return data;
    };

  return useQuery({
    queryKey: ["get-leaderboard-by-tournament-id", tournamentId],
    queryFn: handleGetLeaderboardByTournamentId,
    enabled: !!tournamentId,
    refetchOnWindowFocus: false,
  });
}
