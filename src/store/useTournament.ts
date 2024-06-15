import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import { create } from "zustand";

export type TournamentAction =
  | "initial"
  | "buy-ticket"
  | "play-now"
  | "pending"
  | "success";

export interface ITournamentActionType {
  id: string;
  action: TournamentAction;
}

export interface ITournament {
  currentTournament: ITournamentResponse | null;
  setCurrentTournament: (value: ITournamentResponse | null) => void;
  tournamentActions: ITournamentActionType[];
  setTournamentActions: (value: ITournamentActionType[]) => void;
}

export const useTournament = create<ITournament>((set) => {
  return {
    currentTournament: null,
    setCurrentTournament: (value) => set({ currentTournament: value }),
    tournamentActions: [],
    setTournamentActions: (value) => set({ tournamentActions: value }),
  };
});
