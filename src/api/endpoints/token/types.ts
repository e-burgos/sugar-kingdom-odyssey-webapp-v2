export interface IToken {
  id: string;
  validationErrors: string;
  contractAddress: string;
  imageUrl: string;
  symbol: string;
  name: string;
}

export interface ITokenPostPayload {
  contractAddress: string;
  imageUrl: string;
}

export interface ITokenResponse extends IToken {}
