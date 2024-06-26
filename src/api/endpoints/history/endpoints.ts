import { MethodType } from "@/api/utils/HeaderEncoder";
import { HistoryFilterType, IHistory } from "./types";

export const historyGetByUserId = (
  userId: string,
  filter?: HistoryFilterType,
  responseType?: IHistory[]
) => {
  const filterQuery =
    filter === "purchases"
      ? "?filter=2"
      : filter === "matches"
      ? "?filter=1"
      : "?filter=0";
  return {
    endpoint: `/api/user/${userId}/history${filterQuery}`,
    method: "GET" as MethodType,
    responseType,
  };
};
