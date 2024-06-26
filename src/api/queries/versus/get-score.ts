import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/useAuth";
import axiosClient from "@/api/config/axios-client";
import { generateHeaders } from "@/api/utils/HeaderEncoder";
import { versusGetByWallet } from "@/api/endpoints/versus/endpoints";
import { IVersusByWalletResponse } from "@/api/endpoints/versus/types";

export function GetScore() {
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: versusGetByWallet(wallet as string).method,
    endpoint: versusGetByWallet(wallet as string).endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handleGetScore = async (): Promise<IVersusByWalletResponse> => {
    if (!wallet) throw new Error("Wallet not found");
    const data = await axiosClient
      .get(versusGetByWallet(wallet).endpoint, {
        headers,
      })
      .then((res) => res.data as IVersusByWalletResponse);
    return data;
  };

  return useQuery({
    queryKey: ["get-score", wallet],
    queryFn: handleGetScore,
    refetchOnWindowFocus: false,
    //enabled: !!wallet,
    //staleTime: 1000 * 60 * 5,
  });
}
