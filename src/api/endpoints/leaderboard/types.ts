import { IErrorResponse } from "@/api/types/error";

export interface ILeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  points: number;
  id: string;
  validationErrors: string;
}

export interface ILeaderboardUserResponse {
  tournamentId: string;
  entries: ILeaderboardEntry;
}

export interface ILeaderboardResponse extends IErrorResponse {
  tournamentId: string;
  id: string;
  validationErrors: string;
  entries: ILeaderboardEntry[];
}
