import { INonceGetResponse, INoncePostResponse } from "./types";

export const nonceGet = (wallet: string, responseType?: INonceGetResponse) => {
  return {
    endpoint: `/api/Nonce/${wallet}`,
    method: "GET",
    responseType,
  };
};

export const noncePost = (
  wallet: string,
  responseType?: INoncePostResponse
) => {
  return {
    endpoint: `/api/Nonce/${wallet}`,
    responseType,
  };
};
