import { MethodType } from "@/api/utils/HeaderEncoder";
import { IGamePostPayload, IGameResponse, IUserGamesResponse } from "./types";

export const gamePost = (
  userId: string,
  payload: IGamePostPayload,
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
  responseType?: IUserGamesResponse
) => {
  return {
    endpoint: `/api/user/${userId}/game`,
    method: "GET" as MethodType,
    responseType,
  };
};
