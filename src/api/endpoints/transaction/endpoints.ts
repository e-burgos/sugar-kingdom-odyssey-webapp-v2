import { MethodType } from "@/api/utils/HeaderEncoder";

export const transactionPost = (responseType?: number) => {
  return {
    endpoint: `/api/Transaction`,
    method: "GET" as MethodType,
    responseType,
  };
};
