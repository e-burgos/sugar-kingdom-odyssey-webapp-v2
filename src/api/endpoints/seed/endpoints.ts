import { ISeedResponse } from "./types";

export const seedGet = (users: number, responseType: ISeedResponse) => {
  return {
    endpoint: `/api/Seed?users=${users}`,
    method: "GET",
    responseType,
  };
};
