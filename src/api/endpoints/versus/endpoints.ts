import {
  IVersusByWalletResponse,
  IVersusPostPayload,
  IVersusResponse,
} from "./types";

export const versusGetByWallet = (
  wallet: string,
  responseType?: IVersusByWalletResponse
) => {
  return {
    endpoint: `/api/Versus/${wallet}`,
    method: "GET",
    responseType,
  };
};

export const versusGetAll = (responseType?: IVersusResponse[]) => {
  return {
    endpoint: `/api/Versus`,
    method: "GET",
    responseType,
  };
};

export const versusPost = (
  payload: IVersusPostPayload,
  responseType?: IVersusResponse
) => {
  return {
    endpoint: `/api/Versus`,
    method: "POST",
    payload,
    responseType,
  };
};
