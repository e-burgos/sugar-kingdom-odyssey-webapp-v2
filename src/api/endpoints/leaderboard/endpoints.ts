import { ILeaderboardResponse, ILeaderboardUserResponse } from "./types";

export const leaderboardGetByTournamentId = (
  tournamentId: string,
  responseType?: ILeaderboardResponse
) => {
  return {
    endpoint: `/api/tournament/${tournamentId}/leaderboard`,
    method: "GET",
    responseType,
  };
};

export const leaderboardGetByUserId = (
  userId: string,
  responseType?: ILeaderboardUserResponse[]
) => {
  return {
    endpoint: `/api/user/${userId}/leaderboard`,
    method: "GET",
    responseType,
  };
};
