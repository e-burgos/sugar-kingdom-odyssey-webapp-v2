import { ITicketResponse } from "../ticket/types";
import { IUserResponse } from "../user/types";

export interface IGameResponse {
  ticketId: string;
  endTime: string;
  gameTime: number;
  matches: number;
  score: number;
  maxCombo: number;
  phase: number;
  progress: number;
  startDate: string;
  computed: boolean;
  ticket: ITicketResponse;
  user: IUserResponse;
  id: string;
  validationErrors: string;
}

export interface IGamePostPayload {
  ticketId: string;
  gameTime: number;
  matches: number;
  score: number;
  maxCombo: number;
  phase: number;
  progress: number;
}
