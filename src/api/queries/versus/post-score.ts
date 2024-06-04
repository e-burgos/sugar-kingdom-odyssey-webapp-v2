import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../store/useAuth";
import axiosClient from "../../config/axios-client";
import { GetScore } from "./get-score";
import { IVersusResponse } from "../../endpoints/versus/types";
import { versusPost } from "../../endpoints/versus/endpoints";

export function PostScore(points: number) {
  const { wallet } = useAuth();
  const getScore = GetScore();

  const handlePostScore = async (): Promise<IVersusResponse> => {
    if (!wallet) throw new Error("Wallet not found");
    if (!points) throw new Error("Points not found");
    const payload = {
      wallet,
      points,
    };
    const data = await axiosClient
      .post(versusPost(payload).endpoint, versusPost(payload).payload)
      .then((res) => res.data as IVersusResponse);
    return data;
  };

  return useMutation({
    mutationKey: ["post-score", wallet, points],
    mutationFn: handlePostScore,
    onSettled: () => getScore.refetch(),
    onError: (err) => console.error(err),
  });
}
