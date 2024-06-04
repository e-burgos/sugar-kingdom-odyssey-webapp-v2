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
    method: "POST",
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
    method: "POST",
    payload,
    responseType,
  };
};
