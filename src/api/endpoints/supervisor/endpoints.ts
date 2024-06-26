import { MethodType } from "@/api/utils/HeaderEncoder";
import {
  ISupervisorGetResponse,
  ISupervisorGetTransfersResponse,
  ISupervisorPostPayload,
  ISupervisorPostResponse,
} from "./types";

export const supervisorPost = (
  payload: ISupervisorPostPayload,
  responseType?: ISupervisorPostResponse
) => {
  return {
    endpoint: `/api/Supervisor`,
    method: "POST" as MethodType,
    payload,
    responseType,
  };
};

export const supervisorGet = (responseType?: ISupervisorGetResponse) => {
  return {
    endpoint: `/api/Supervisor`,
    method: "GET" as MethodType,
    responseType,
  };
};

export const supervisorGetTransfers = (
  responseType?: ISupervisorGetTransfersResponse
) => {
  return {
    endpoint: `/api/Supervisor/transfers`,
    method: "GET" as MethodType,
    responseType,
  };
};

export const supervisorGetWalletTransfers = (
  wallet: string,
  responseType?: ISupervisorGetTransfersResponse
) => {
  return {
    endpoint: `/api/Supervisor/transfers/${wallet}`,
    method: "GET" as MethodType,
    responseType,
  };
};
