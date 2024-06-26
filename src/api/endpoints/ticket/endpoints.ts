import { MethodType } from "@/api/utils/HeaderEncoder";
import {
  ITicketPostPayload,
  ITicketResponse,
  ITicketsPostByTournamentIdPayload,
} from "./types";

export const ticketGetById = (id: string, responseType?: ITicketResponse) => {
  return {
    endpoint: `/api/ticket/${id}`,
    method: "GET" as MethodType,
    responseType,
  };
};

export const ticketPatchById = (
  id: string,
  userId?: string,
  responseType?: ITicketResponse
) => {
  return {
    endpoint: `/api/ticket/${id}`,
    method: "PATCH" as MethodType,
    header: {
      userId: userId,
    },
    responseType,
  };
};

export const ticketGetByUser = (
  userId: string,
  responseType?: ITicketResponse[]
) => {
  return {
    endpoint: `/api/user/${userId}/ticket`,
    method: "GET" as MethodType,
    responseType,
  };
};

export const ticketGetByTournament = (
  tournamentId: string,
  responseType?: ITicketResponse[]
) => {
  return {
    endpoint: `/api/tournament/${tournamentId}/ticket`,
    method: "GET" as MethodType,
    responseType,
  };
};

export const ticketGetAll = (responseType?: ITicketResponse[]) => {
  return {
    endpoint: `/api/ticket`,
    method: "GET" as MethodType,
    responseType,
  };
};

// Only por development
export const ticketPost = (
  payload: ITicketPostPayload,
  responseType?: ITicketResponse
) => {
  return {
    endpoint: `/api/ticket`,
    method: "POST" as MethodType,
    payload,
    responseType,
  };
};

export const ticketPostByTournamentId = (
  tournamentId: string,
  payload: ITicketsPostByTournamentIdPayload,
  responseType?: ITicketResponse[]
) => {
  return {
    endpoint: `/api/tournament/${tournamentId}/ticket`,
    method: "POST" as MethodType,
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
    method: "PATCH" as MethodType,
    header: {
      userId: userId,
    },
    responseType,
  };
};
