export interface ILoginResponse {
  id: string;
  validationErrors: string;
  userId: string;
  expired: boolean;
  expiration: string;
  ip: string;
}

export interface ILoginPostPayload {
  wallet: string;
  signature: string;
}

export interface ILoginPostSignInPayload {
  walletPrivateKey: string;
}
