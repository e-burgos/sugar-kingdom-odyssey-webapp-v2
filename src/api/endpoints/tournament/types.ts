import { IToken } from "../token/types";

export interface ITournamentPostTicketsPayload {
  ticketAmount: number;
  transactionHash: string;
}

export interface ITournamentPrice {
  id: string;
  tokenId: string;
  amount: string;
  token: IToken;
}

export interface ITournamentColor {
  r: number;
  g: number;
  b: number;
  a: number;
  isKnownColor: boolean;
  isEmpty: boolean;
  isNamedColor: boolean;
  isSystemColor: boolean;
  name: string;
}

export interface IRemainingTime {
  ticks: number;
  days: number;
  hours: number;
  milliseconds: number;
  microseconds: number;
  nanoseconds: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMilliseconds: number;
  totalMicroseconds: number;
  totalNanoseconds: number;
  totalMinutes: number;
  totalSeconds: number;
}

export type TournamentStatus = "previous" | "now" | "future";

export interface ITournamentResponse {
  id: string;
  validationErrors: string;
  name: string;
  startDate: string;
  endDate: string;
  wallet: string;
  imageUrl: string;
  colorARGB: number;
  color: ITournamentColor;
  prices: ITournamentPrice[];
  status: number;
  contestantCount: number;
  pricePool: number;
  remainingTime: string;
  statusFlag: TournamentStatus;
}

export interface IPage {
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface ITournamentGetAllPaginatedResponse extends IPage {
  data: ITournamentResponse[];
}

export interface ITournamentPostPayload {
  name: string;
  startDate: string;
  endDate: string;
  wallet: string;
  imageUrl: string;
  colorARGB: number;
  color: ITournamentColor;
  prices: ITournamentPrice[];
  status: number;
  contestantCount: number;
}
