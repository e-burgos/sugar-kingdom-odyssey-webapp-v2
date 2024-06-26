export interface IHistory {
  tournamentId: string;
  tournamentName: string;
  action: string;
  status: string;
  eventTime: string;
}

export type HistoryFilterType = "initial" | "matches" | "purchases";
