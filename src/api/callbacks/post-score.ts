import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../store/useAuth";
import axiosClient from "../config/axios-client";
import { IPostScoreResponse } from "./types/post-score.types";
import { GetScore } from "./get-score";

export function PostScore(points: number) {
  const { wallet } = useAuth();

  const getScore = GetScore();

  const handlePostScore = async (): Promise<IPostScoreResponse> => {
    if (!wallet) throw new Error("Wallet not found");
    if (!points) throw new Error("Points not found");
    const data = await axiosClient
      .post("/versus", {
        points: Number(points),
        wallet: wallet,
      })
      .then((res) => res.data);
    return data;
  };

  return useMutation({
    mutationKey: ["post-score", wallet, points],
    mutationFn: handlePostScore,
    onSettled: () => getScore.refetch(),
    onError: (err) => console.error(err),
  });
}
