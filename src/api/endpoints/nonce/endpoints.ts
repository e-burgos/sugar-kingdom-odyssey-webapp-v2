import { MethodType } from "@/api/utils/HeaderEncoder";
import { INonceResponse } from "./types";

export const nonceGet = (wallet: string, responseType?: INonceResponse) => {
  return {
    endpoint: `/api/Nonce/${wallet}`,
    method: "GET" as MethodType,
    responseType,
  };
};

export const noncePost = (wallet: string, responseType?: INonceResponse) => {
  return {
    endpoint: `/api/Nonce/${wallet}`,
    method: "POST" as MethodType,
    responseType,
  };
};
