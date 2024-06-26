import { HistoryFilterType } from "@/api/endpoints/history/types";
import { create } from "zustand";

export interface IHistoryFilterStore {
  filter: HistoryFilterType;
  setFilter: (value: HistoryFilterType) => void;
}

export const useHistoryFilterStore = create<IHistoryFilterStore>((set) => {
  return {
    filter: "purchases",
    setFilter: (value) => set({ filter: value }),
  };
});
