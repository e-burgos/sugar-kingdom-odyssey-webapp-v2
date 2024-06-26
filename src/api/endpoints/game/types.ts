import { ITicketResponse } from "../ticket/types";
import { IUserResponse } from "../user/types";

export interface IGameResponse {
  id: string;
  validationErrors: string;
  ticketId: string;
  startTime: string;
  endTime: string;
  movements: number;
  points: number;
  user: {
    id: string;
    validationErrors: string;
    wallet: string;
    userName: string;
  };
}

export interface IGamePostPayload {
  ticketId: string;
  startTime: string;
  endTime: string;
  movements: number;
  points: number;
  user: {
    wallet: string;
    userName: string;
  };
}

export interface IUserGamesResponse {
  ticketId: string;
  startTime: string;
  endTime: string;
  movements: number;
  points: number;
  computed: boolean;
  ticket: ITicketResponse;
  user: IUserResponse;
  id: string;
  validationErrors: string;
}
