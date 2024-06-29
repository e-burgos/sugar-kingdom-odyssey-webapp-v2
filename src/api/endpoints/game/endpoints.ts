import { MethodType } from "@/api/utils/HeaderEncoder";
import { IGamePostPayload, IGameResponse } from "./types";

export const gamePost = (
  userId: string,
  payload?: IGamePostPayload,
  responseType?: IGameResponse
) => {
  return {
    endpoint: `/api/Game`,
    method: "POST" as MethodType,
    header: {
      userId: userId,
    },
    payload,
    responseType,
  };
};

export const gameGetByUser = (
  userId: string,
  responseType?: IGameResponse[]
) => {
  return {
    endpoint: `/api/user/${userId}/game`,
    method: "GET" as MethodType,
    responseType,
  };
};
