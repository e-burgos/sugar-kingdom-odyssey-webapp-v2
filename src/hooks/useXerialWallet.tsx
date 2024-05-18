/* eslint-disable @typescript-eslint/ban-ts-comment */
import Xerial from "xerial-wallet-sdk";
import { User } from "../utils/types";
import { useCallback, useMemo } from "react";
import { storage } from "../utils/localStorage";
import { useAuth } from "../store/useAuth";
import { usePageOrchestrator } from "../store/usePageOrchestrator";

export function useXerialWallet() {
  const {
    isAuth,
    userData,
    userBalance,
    transaction,
    inventory,
    wallet,
    score,
    setIsAuth,
    setUserData,
    setUserBalance,
    setTransaction,
    setInventory,
    setWallet,
    setScore,
  } = useAuth();
  const { setCurrentPage } = usePageOrchestrator();
  const projectId = import.meta.env.VITE_XERIAL_PROJECT_ID;

  const xerial = useMemo(
    () => new Xerial({ projectId, chain: "polygon" }),
    [projectId]
  );

  // @ts-ignore
  const walletAuthHost = xerial?.walletAuthHost; // "https://wallet.staging.xerial.io/auth";
  // @ts-ignore
  const walletApiHost = xerial?.walletApiHost; // "https://wallet.staging.xerial.io/api";

  const handleLogout = useCallback(async () => {
    try {
      await xerial.logout();
      setCurrentPage("home");
      setIsAuth(false);
      setUserData(null);
      setUserBalance(null);
      setWallet(null);
      setScore(0);
      storage.remove("xerial");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [
    xerial,
    setCurrentPage,
    setIsAuth,
    setUserData,
    setUserBalance,
    setWallet,
    setScore,
  ]);

  const handleLogin = useCallback(async () => {
    try {
      const user = (await xerial.auth()) as User;
      setCurrentPage("game");
      setUserData(user);
      setIsAuth(true);
      setWallet(user.wallets[0].address);
      handleTokenBalances(user.wallets[0].address);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsAuth, setUserData, setWallet, setCurrentPage, xerial]);

  const handleUser = useCallback(async () => {
    try {
      const user = await xerial.user();
      setUserData(user);
      setIsAuth(true);
      setWallet(user.wallets[0].address);
    } catch (error) {
      console.error("Error fetching user information:", error);
      setUserData(null);
    }
  }, [setIsAuth, setUserData, setWallet, xerial]);

  const handleTokenBalances = useCallback(
    async (address?: string) => {
      const userAddress =
        address || (userData?.wallets[0].address as string) || "";
      if (userAddress) {
        try {
          const balance = await xerial.tokens(userAddress);
          setUserBalance(balance.usdc);
          setIsAuth(true);
        } catch (error) {
          console.error("Error fetching token balances:", error);
          setUserBalance(null);
        }
      }
    },
    [setIsAuth, setUserBalance, userData?.wallets, xerial]
  );

  const handleNativeCurrencyBalance = useCallback(
    async (address?: string) => {
      const userAddress =
        address || (userData?.wallets[0].address as string) || "";
      if (userAddress) {
        try {
          const balance = await xerial.eth(userAddress);
          setUserBalance(balance.usdc);
          setIsAuth(true);
        } catch (error) {
          console.error("Error fetching Ethereum balance:", error);
          setUserBalance(null);
        }
      }
    },
    [setIsAuth, setUserBalance, userData?.wallets, xerial]
  );

  const handleTransaction = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (transaction: any, address?: string) => {
      const userAddress =
        address || (userData?.wallets[0].address as string) || "";
      if (transaction) {
        try {
          const tx = await xerial.sendTransaction(transaction, userAddress);
          setTransaction(tx);
          setIsAuth(true);
        } catch (error) {
          console.error("Error sending transaction:", error);
          setTransaction(null);
        }
      } else {
        console.error("Transaction is undefined");
        return;
      }
    },
    [setIsAuth, setTransaction, userData?.wallets, xerial]
  );

  const handlePolygonInventory = useCallback(
    async (address?: string) => {
      const userAddress =
        address || (userData?.wallets[0].address as string) || "";
      if (userAddress) {
        try {
          const inventory = await xerial.inventory(userAddress);
          setInventory(inventory);
          setIsAuth(true);
        } catch (error) {
          console.error("Error fetching inventory:", error);
          setInventory(null);
        }
      }
    },
    [setInventory, setIsAuth, userData?.wallets, xerial]
  );

  return {
    xerial,
    walletAuthHost,
    walletApiHost,
    isAuth,
    userData,
    userBalance,
    transaction,
    inventory,
    wallet,
    score,
    handleLogout,
    handleLogin,
    handleUser,
    handleTokenBalances,
    handleNativeCurrencyBalance,
    handleTransaction,
    handlePolygonInventory,
    setScore,
  };
}
