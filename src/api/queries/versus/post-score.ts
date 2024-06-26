import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../store/useAuth";
import axiosClient from "../../config/axios-client";
import { GetScore } from "./get-score";
import { IVersusResponse } from "../../endpoints/versus/types";
import { versusPost } from "../../endpoints/versus/endpoints";
import { generateHeaders } from "@/api/utils/HeaderEncoder";

export function PostScore(points: number) {
  const getScore = GetScore();
  const { sessionId, userId, wallet } = useAuth();

  const payload = {
    wallet: wallet as string,
    points,
  };

  const headers = generateHeaders({
    method: versusPost(payload).method,
    endpoint: versusPost(payload).endpoint,
    payload: payload,
    wallet,
    sessionId,
    userId,
  });

  const handlePostScore = async (): Promise<IVersusResponse> => {
    if (!wallet) throw new Error("Wallet not found");
    if (!points) throw new Error("Points not found");
    const payload = {
      wallet,
      points,
    };
    const data = await axiosClient
      .post(versusPost(payload).endpoint, versusPost(payload).payload, {
        headers,
      })
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
