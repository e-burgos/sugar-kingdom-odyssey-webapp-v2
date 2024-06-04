export interface IUserResponse {
  id: string;
  validationErrors: string;
  wallet: string;
  userName: string;
}

export interface IUserPostPayload {
  wallet: string;
  userName: string;
}
