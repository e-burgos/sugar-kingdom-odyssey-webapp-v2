export interface IVersusByWalletResponse {
  score: number;
}

export interface IVersusResponse {
  id: string;
  validationErrors: string;
  wallet: string;
  points: number;
}

export interface IVersusPostPayload {
  wallet: string;
  points: number;
}
