import { ITicketPostPayload, ITicketResponse } from "./types";

export const ticketGetById = (id: string, responseType?: ITicketResponse) => {
  return {
    endpoint: `/api/ticket/${id}`,
    method: "GET",
    responseType,
  };
};

export const ticketPatch = (
  id: string,
  userId: string,
  responseType?: ITicketResponse
) => {
  return {
    endpoint: `/api/ticket/${id}`,
    method: "PATCH",
    header: {
      userId: userId,
    },
    responseType,
  };
};

export const ticketGetByUser = (
  userId: string,
  responseType?: ITicketResponse
) => {
  return {
    endpoint: `/api/user/${userId}/ticket`,
    method: "GET",
    responseType,
  };
};

export const ticketGetByTournament = (
  tournamentId: string,
  responseType?: ITicketResponse
) => {
  return {
    endpoint: `/api/tournament/${tournamentId}/ticket`,
    method: "GET",
    responseType,
  };
};

export const ticketGetAll = (responseType?: ITicketResponse[]) => {
  return {
    endpoint: `/api/ticket`,
    method: "GET",
    responseType,
  };
};

export const ticketPost = (
  payload: ITicketPostPayload,
  responseType?: ITicketResponse
) => {
  return {
    endpoint: `/api/ticket`,
    method: "POST",
    payload,
    responseType,
  };
};

export const ticketPatchFirstUnused = (
  userId: string,
  responseType?: ITicketResponse
) => {
  return {
    endpoint: `/api/ticket`,
    method: "PATCH",
    header: {
      userId: userId,
    },
    responseType,
  };
};
