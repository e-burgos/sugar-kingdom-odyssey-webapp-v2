import { MethodType } from "@/api/utils/HeaderEncoder";
import { ILeaderboardResponse, ILeaderboardUserResponse } from "./types";

export const leaderboardGetByTournamentId = (
  tournamentId: string,
  responseType?: ILeaderboardResponse
) => {
  return {
    endpoint: `/api/tournament/${tournamentId}/leaderboard`,
    method: "GET" as MethodType,
    responseType,
  };
};

export const leaderboardGetByUserId = (
  userId: string,
  responseType?: ILeaderboardUserResponse[]
) => {
  return {
    endpoint: `/api/user/${userId}/leaderboard`,
    method: "GET" as MethodType,
    responseType,
  };
};
