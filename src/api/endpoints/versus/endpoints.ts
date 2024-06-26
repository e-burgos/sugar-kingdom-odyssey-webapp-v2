import { MethodType } from "@/api/utils/HeaderEncoder";
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
    method: "GET" as MethodType,
    responseType,
  };
};

export const versusGetAll = (responseType?: IVersusResponse[]) => {
  return {
    endpoint: `/api/Versus`,
    method: "GET" as MethodType,
    responseType,
  };
};

export const versusPost = (
  payload: IVersusPostPayload,
  responseType?: IVersusResponse
) => {
  return {
    endpoint: `/api/Versus`,
    method: "POST" as MethodType,
    payload,
    responseType,
  };
};
