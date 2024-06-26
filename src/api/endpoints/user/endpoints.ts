import { MethodType } from "@/api/utils/HeaderEncoder";
import { IUserPostPayload, IUserResponse } from "./types";

export const userGet = (userId: string, responseType?: IUserResponse) => {
  return {
    endpoint: `/api/User/${userId}`,
    method: "GET" as MethodType,
    responseType,
  };
};

export const userGetAll = (responseType?: IUserResponse[]) => {
  return {
    endpoint: `/api/User`,
    method: "GET" as MethodType,
    responseType,
  };
};

export const userPost = (
  payload: IUserPostPayload,
  responseType?: IUserResponse
) => {
  return {
    endpoint: `/api/User`,
    method: "POST" as MethodType,
    payload,
    responseType,
  };
};

export const userPatchUsername = (
  payload: string,
  responseType?: IUserResponse
) => {
  return {
    endpoint: `/api/User/username`,
    method: "PATCH" as MethodType,
    payload,
    responseType,
  };
};
