import { create } from "zustand";

interface User {
  amountTokens: number;
  gamepoints: number;
  name: string;
  selectedNFT: string;
}

export interface IUserSliceStore {
  amountTokens: number;
  gamepoints: number;
  name: string;
  selectedNFT: string;
  resetState: () => void;
  setBalance: (action: number) => void;
  setUserInfo: (action: User) => void;
  setName: (action: string) => void;
  setSelectedNFT: (action: string) => void;
}

export const useUserSlice = create<IUserSliceStore>((set) => {
  return {
    amountTokens: 0,
    gamepoints: 0,
    name: "",
    selectedNFT: "",
    resetState: () =>
      set({ amountTokens: 0, gamepoints: 0, name: "", selectedNFT: "" }),
    setBalance: (action) => set({ amountTokens: action }),
    setUserInfo: (action) =>
      set({
        amountTokens: action.amountTokens,
        gamepoints: action.gamepoints,
        name: action.name,
        selectedNFT: action.selectedNFT,
      }),
    setName: (action) => set({ name: action }),
    setSelectedNFT: (action) => set({ selectedNFT: action }),
  };
});
