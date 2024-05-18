import { create } from "zustand";
import { storage } from "../utils/localStorage";

export type AvailablePageType =
  | "home"
  | "tournaments"
  | "profile"
  | "leaderboard"
  | "staking"
  | "game";

export interface IPageOrchestrator {
  currentPage: AvailablePageType;
  setCurrentPage: (value: AvailablePageType) => void;
}

export const usePageOrchestrator = create<IPageOrchestrator>((set) => {
  const page = storage.get("current-page");
  return {
    currentPage: page || "home",
    setCurrentPage: (value: AvailablePageType) => {
      storage.set("current-page", value);
      set({ currentPage: value });
    },
  };
});
