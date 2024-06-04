export interface ILeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  points: number;
  id: string;
  validationErrors: string;
}

export interface ILeaderboardResponse {
  tournamentId: string;
  id: string;
  validationErrors: string;
  entries: ILeaderboardEntry[];
}

export interface ILeaderboardUserResponse {
  tournamentId: string;
  entries: ILeaderboardEntry;
}
