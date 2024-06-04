import { IToken } from "../token/types";

export interface ITournamentPostTicketsPayload {
  ticketAmount: number;
  transactionHash: string;
}

export interface ITournamentPrice {
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
