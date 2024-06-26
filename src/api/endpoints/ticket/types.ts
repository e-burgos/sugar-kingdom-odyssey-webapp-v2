export interface ITicketResponse {
  id: string;
  validationErrors: string;
  userId: string;
  tournamentId: string;
  priceId: string;
  transactionHash: string;
  paymentComplete: boolean;
  usedDate: string;
  paymentRegisteredDate: string;
  transactionId: string;
  createdDate: string;
  used: boolean;
}

export interface ITicketPostPayload {
  userId: string;
  tournamentId: string;
  priceId: string;
  transactionHash: string;
  paymentComplete: boolean;
  usedDate: string;
  paymentRegisteredDate: string;
  transactionId: string;
  createdDate: string;
  used: boolean;
}

export interface ITicketsPostByTournamentIdPayload {
  ticketAmount: number;
  priceId: string;
  transactionHash: string;
}
