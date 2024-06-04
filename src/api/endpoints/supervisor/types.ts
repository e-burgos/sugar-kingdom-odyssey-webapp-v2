export interface ISupervisorPostResponse {
  address: string;
  tokens: string[];
}

export interface ISupervisorResponse extends ISupervisorPostResponse {
  id: 0;
}

export type ISupervisorGetResponse = ISupervisorResponse[];

export interface ISupervisorTransfer {
  from: string;
  to: string;
  token: string;
  amount: string;
  txhash: string;
  timestamp: string;
  block: number;
}

export type ISupervisorGetTransfersResponse = ISupervisorTransfer[];

export interface ISupervisorPostPayload {
  address: string;
  tokens: string[];
}
