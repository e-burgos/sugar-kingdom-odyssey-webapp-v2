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
}
