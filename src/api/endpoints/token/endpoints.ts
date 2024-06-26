import { MethodType } from "@/api/utils/HeaderEncoder";
import { ITokenPostPayload, ITokenResponse } from "./types";

export const tokenPost = (
  payload: ITokenPostPayload,
  responseType?: ITokenResponse
) => {
  return {
    endpoint: `/api/Token`,
    method: "POST" as MethodType,
    payload,
    responseType,
  };
};

export const tokenGetAll = (responseType?: ITokenResponse[]) => {
  return {
    endpoint: `/api/Token`,
    method: "GET" as MethodType,
    responseType,
  };
};

export const tokenGetById = (id: string, responseType?: ITokenResponse) => {
  return {
    endpoint: `/api/Token/${id}`,
    method: "GET" as MethodType,
    responseType,
  };
};
