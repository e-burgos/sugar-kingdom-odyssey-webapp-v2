/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { storage } from "../utils/localStorage";
import { User, IXerialToken } from "../utils/types";

export interface IAuthStore {
  isAuth: boolean;
  userData: User | null;
  userBalance: string | null;
  transaction: any;
  inventory: any;
  score: number;
  wallet: string | null;
  setIsAuth: (value: boolean) => void;
  setUserData: (value: User | null) => void;
  setUserBalance: (value: string | null) => void;
  setTransaction: (value: any) => void;
  setInventory: (value: any) => void;
  setScore: (value: number) => void;
  setWallet: (value: string | null) => void;
}

export const useAuth = create<IAuthStore>((set) => {
  const xerialStorage: IXerialToken = storage.get("xerial");
  const balance: string | null = storage.get("balance");
  const userData: User | null = storage.get("user-data");
  const wallet: string | null = storage.get("wallet");
  return {
    isAuth: xerialStorage ? true : false,
    userData: userData || null,
    userBalance: balance || null,
    transaction: null,
    inventory: null,
    score: 0,
    wallet: wallet || null,
    setIsAuth: (value) => set({ isAuth: value }),
    setUserData: (value) => {
      storage.set("user-data", value);
      set({ userData: value });
    },
    setUserBalance: (value) => {
      storage.set("balance", value);
      set({ userBalance: value });
    },
    setTransaction: (value) => set({ transaction: value }),
    setInventory: (value) => set({ inventory: value }),
    setScore: (value) => {
      set({ score: value });
    },
    setWallet: (value) => {
      storage.set("wallet", value);
      set({ wallet: value });
    },
  };
});
