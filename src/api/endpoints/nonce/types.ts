export interface INoncePostResponse {
  wallet: string;
  nonce: string;
  id: string;
  validationErrors: string;
}

export type INonceGetResponse = INoncePostResponse[];
