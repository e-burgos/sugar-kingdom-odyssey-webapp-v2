import { ITokenPostPayload, ITokenResponse } from "./types";

export const tokenPost = (
  payload: ITokenPostPayload,
  responseType?: ITokenResponse
) => {
  return {
    endpoint: `/api/Token`,
    method: "POST",
    payload,
    responseType,
  };
};

export const tokenGetAll = (responseType?: ITokenResponse[]) => {
  return {
    endpoint: `/api/Token`,
    method: "GET",
    responseType,
  };
};

export const tokenGetById = (id: string, responseType?: ITokenResponse) => {
  return {
    endpoint: `/api/Token/${id}`,
    method: "GET",
    responseType,
  };
};
