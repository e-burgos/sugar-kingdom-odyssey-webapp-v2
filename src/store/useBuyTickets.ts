import { ITicketResponse } from "@/api/endpoints/ticket/types";
import { ITournamentPrice } from "@/api/endpoints/tournament/types";
import { create } from "zustand";

export type BuyTicketStatus = "initial" | "pending" | "completed" | "fail";

export type TournamentAction =
  | "initial"
  | "buy-ticket"
  | "play-now"
  | "pending"
  | "success"
  | "leaderboard";

export interface IBuyTicket {
  id: string;
  action?: TournamentAction;
  txHash?: string;
  txStatus?: BuyTicketStatus;
  token?: ITournamentPrice | null;
  tickets?: number;
  amount?: string;
  purchasedTickets?: ITicketResponse[];
}

export interface IBuyTicketStore {
  data: IBuyTicket[];
  setData: (data: IBuyTicket) => void;
  setAction: (id: string, action: TournamentAction) => void;
  setTxHash: (id: string, txHash: string) => void;
  setTxStatus: (id: string, txStatus: BuyTicketStatus) => void;
  setToken: (id: string, token: ITournamentPrice | null) => void;
  setTickets: (id: string, tickets: number) => void;
  setAmount: (id: string, amount: string) => void;
  setPurchasedTickets: (
    id: string,
    purchasedTickets: ITicketResponse[]
  ) => void;
  removeData: (id: string) => void;
  clearData: () => void;
}

export const useBuyTickets = create<IBuyTicketStore>((set) => {
  return {
    data: [],
    setData: (data) =>
      set((state) => ({
        data: [...state.data, data],
      })),
    setAction: (id, action) =>
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id ? { ...item, action } : item
        ),
      })),
    setTxHash: (id, txHash) =>
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id ? { ...item, txHash } : item
        ),
      })),
    setTxStatus: (id, txStatus) =>
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id ? { ...item, txStatus } : item
        ),
      })),
    setToken: (id, token) =>
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id ? { ...item, token } : item
        ),
      })),
    setTickets: (id, tickets) =>
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id ? { ...item, tickets } : item
        ),
      })),
    setAmount: (id, amount) =>
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id ? { ...item, amount } : item
        ),
      })),
    setPurchasedTickets: (id, purchasedTickets) =>
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id ? { ...item, purchasedTickets } : item
        ),
      })),
    removeData: (id) =>
      set((state) => ({
        data: state.data.filter((item) => item.id !== id),
      })),
    clearData: () =>
      set(() => ({
        data: [],
      })),
  };
});
