import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../store/useAuth";
import axiosClient from "../config/axios-client";
import { IGetScoreResponse } from "./types/get-score.types";

export function GetScore() {
  const { wallet } = useAuth();

  const handleGetScore = async (): Promise<IGetScoreResponse> => {
    if (!wallet) throw new Error("Wallet not found");
    const data = await axiosClient
      .get(`/versus/${wallet}`)
      .then((res) => res.data);
    return data;
  };

  return useQuery({
    queryKey: ["get-score", wallet],
    queryFn: handleGetScore,
    enabled: !!wallet,
    refetchOnWindowFocus: false,
  });
}
