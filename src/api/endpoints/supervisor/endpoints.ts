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
    method: "POST",
    payload,
    responseType,
  };
};

export const supervisorGet = (responseType?: ISupervisorGetResponse) => {
  return {
    endpoint: `/api/Supervisor`,
    method: "GET",
    responseType,
  };
};

export const supervisorGetTransfers = (
  responseType?: ISupervisorGetTransfersResponse
) => {
  return {
    endpoint: `/api/Supervisor/transfers`,
    method: "GET",
    responseType,
  };
};

export const supervisorGetWalletTransfers = (
  wallet: string,
  responseType?: ISupervisorGetTransfersResponse
) => {
  return {
    endpoint: `/api/Supervisor/transfers/${wallet}`,
    method: "GET",
    responseType,
  };
};
