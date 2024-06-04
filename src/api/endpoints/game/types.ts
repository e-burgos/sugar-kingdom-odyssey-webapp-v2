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
