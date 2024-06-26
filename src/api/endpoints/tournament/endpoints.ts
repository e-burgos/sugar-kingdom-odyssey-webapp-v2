import { MethodType } from "@/api/utils/HeaderEncoder";
import {
  ITournamentGetAllPaginatedResponse,
  ITournamentPostPayload,
  ITournamentPostTicketsPayload,
  ITournamentResponse,
} from "./types";

export const tournamentPostTickets = (
  tournamentId: string,
  userId: string,
  payload: ITournamentPostTicketsPayload,
  responseType?: ITournamentResponse
) => {
  return {
    endpoint: `/api/tournament/${tournamentId}/ticket`,
    method: "POST" as MethodType,
    header: {
      userId: userId,
    },
    payload,
    responseType,
  };
};

export const tournamentGetAllPaginated = (
  userId: string,
  page: number,
  pageSize: number,
  responseType?: ITournamentGetAllPaginatedResponse
) => {
  return {
    endpoint: `/api/Tournament?page=${page}&pageSize=${pageSize}`,
    method: "GET" as MethodType,
    header: {
      userId: userId,
    },
    responseType,
  };
};

export const tournamentGetById = (
  userId: string,
  tournamentId: string,
  responseType?: ITournamentResponse
) => {
  return {
    endpoint: `/api/Tournament/${tournamentId}`,
    method: "GET" as MethodType,
    header: {
      userId: userId,
    },
    responseType,
  };
};

export const tournamentPost = (
  payload: ITournamentPostPayload,
  responseType?: ITournamentResponse
) => {
  return {
    endpoint: `/api/Tournament`,
    method: "POST" as MethodType,
    payload,
    responseType,
  };
};
