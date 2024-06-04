export interface IColor {
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

export interface IPrice {
  tokenId: string;
  amount: string;
}

export interface ITournamentData {
  id: string;
  validationErrors: string;
  name: string;
  startDate: string;
  endDate: string;
  wallet: string;
  imageUrl: string;
  colorARGB: number;
  color: IColor;
  prices: IPrice[];
}

export interface IGetTournamentResponse {
  data: ITournamentData[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
