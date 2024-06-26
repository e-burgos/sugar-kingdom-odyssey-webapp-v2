import { MethodType } from "@/api/utils/HeaderEncoder";
import {
  ILoginPostPayload,
  ILoginPostSignInPayload,
  ILoginResponse,
} from "./types";

export const authLogin = (
  payload: ILoginPostPayload,
  responseType?: ILoginResponse
) => {
  return {
    endpoint: "/api/Auth/login",
    method: "POST" as MethodType,
    payload,
    responseType,
  };
};

export const authSignIn = (
  wallet: string,
  payload: ILoginPostSignInPayload,
  responseType?: ILoginResponse
) => {
  return {
    endpoint: `/api/Auth/${wallet}/sign`,
    method: "POST" as MethodType,
    payload,
    responseType,
  };
};
