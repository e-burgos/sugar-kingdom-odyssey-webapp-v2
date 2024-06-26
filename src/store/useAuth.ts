/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { storage } from "../utils/localStorage";

export interface IAuthStore {
  isAuth: boolean;
  userName: string | null;
  wallet: string | null;
  userId: string | null;
  sessionId: string | null;
  userBalance: string | null;
  transaction: any;
  score: number;
  expirationDate: string | null;
  setIsAuth: (value: boolean) => void;
  setUserName: (value: string | null) => void;
  setWallet: (value: string | null) => void;
  setUserId: (value: string | null) => void;
  setSessionId: (value: string | null) => void;
  setUserBalance: (value: string | null) => void;
  setTransaction: (value: any) => void;
  setScore: (value: number) => void;
  setExpirationDate: (value: string | null) => void;
  setLogout: () => void;
}

export const useAuth = create<IAuthStore>((set) => {
  const balance: string | null = storage.get("balance");
  const userName: string | null = storage.get("user-name");
  const wallet: string | null = storage.get("wallet");
  const userId: string | null = storage.get("user-id");
  const sessionId: string | null = storage.get("session-id");
  const expirationDate: string | null = storage.get("expiration-date");
  return {
    isAuth: sessionId ? true : false,
    userBalance: balance || null,
    transaction: null,
    score: 0,
    wallet: wallet || null,
    userId: userId || null,
    userName: userName || null,
    sessionId: sessionId || null,
    expirationDate: expirationDate || null,
    setIsAuth: (value) => set({ isAuth: value }),
    setUserName: (value) => {
      storage.set("user-name", value);
      set({ userName: value });
    },
    setUserBalance: (value) => {
      storage.set("balance", value);
      set({ userBalance: value });
    },
    setTransaction: (value) => set({ transaction: value }),
    setScore: (value) => {
      set({ score: value });
    },
    setWallet: (value) => {
      storage.set("wallet", value);
      set({ wallet: value });
    },
    setUserId: (value) => {
      storage.set("user-id", value);
      set({ userId: value });
    },
    setSessionId: (value) => {
      storage.set("session-id", value);
      set({ sessionId: value });
    },
    setExpirationDate: (value) => {
      storage.set("expiration-date", value);
      set({ expirationDate: value });
    },
    setLogout: () => {
      storage.remove("user-name");
      storage.remove("wallet");
      storage.remove("user-id");
      storage.remove("session-id");
      storage.remove("balance");
      storage.remove("expiration-date");
      set({
        userName: null,
        wallet: null,
        userId: null,
        sessionId: null,
        userBalance: null,
        expirationDate: null,
        isAuth: false,
      });
    },
  };
});
