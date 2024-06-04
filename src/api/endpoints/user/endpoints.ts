import { IUserPostPayload, IUserResponse } from "./types";

export const userGet = (userId: string, responseType?: IUserResponse) => {
  return {
    endpoint: `/api/User/${userId}`,
    method: "GET",
    responseType,
  };
};

export const userGetAll = (responseType?: IUserResponse[]) => {
  return {
    endpoint: `/api/User`,
    method: "GET",
    responseType,
  };
};

export const userPost = (
  payload: IUserPostPayload,
  responseType?: IUserResponse
) => {
  return {
    endpoint: `/api/User`,
    method: "POST",
    payload,
    responseType,
  };
};
