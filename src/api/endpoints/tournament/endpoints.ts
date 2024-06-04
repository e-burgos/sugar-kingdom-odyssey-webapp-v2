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
    method: "POST",
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
    method: "GET",
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
    method: "POST",
    payload,
    responseType,
  };
};
