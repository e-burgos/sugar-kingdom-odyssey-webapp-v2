import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../store/useAuth";
import axiosClient from "../../config/axios-client";
import { IVersusByWalletResponse } from "../../endpoints/versus/types";
import { versusGetByWallet } from "../../endpoints/versus/endpoints";

export function GetScore() {
  const { wallet } = useAuth();

  const handleGetScore = async (): Promise<IVersusByWalletResponse> => {
    if (!wallet) throw new Error("Wallet not found");
    const data = await axiosClient
      .get(versusGetByWallet(wallet).endpoint)
      .then((res) => res.data as IVersusByWalletResponse);
    return data;
  };

  return useQuery({
    queryKey: ["get-score", wallet],
    queryFn: handleGetScore,
    enabled: !!wallet,
    refetchOnWindowFocus: false,
  });
}
