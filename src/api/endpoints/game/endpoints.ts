import { IGamePostPayload, IGameResponse } from "./types";

export const gamePost = (
  userId: string,
  payload: IGamePostPayload,
  responseType?: IGameResponse
) => {
  return {
    endpoint: `/api/Game`,
    method: "POST",
    header: {
      userId: userId,
    },
    payload,
    responseType,
  };
};
