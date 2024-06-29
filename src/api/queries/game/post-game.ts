import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/store/useAuth";
import { gamePost } from "@/api/endpoints/game/endpoints";
import { IGamePostPayload, IGameResponse } from "@/api/endpoints/game/types";
import { generateHeaders } from "@/api/utils/HeaderEncoder";
import axiosClient from "@/api/config/axios-client";

export function PostGame() {
  const { sessionId, userId, wallet } = useAuth();

  const handlePostGame = async (
    payload: IGamePostPayload
  ): Promise<IGameResponse> => {
    if (!userId) throw new Error("User ID is required");
    const headers = generateHeaders({
      method: gamePost(userId as string).method,
      endpoint: gamePost(userId as string).endpoint,
      payload: payload,
      wallet,
      sessionId,
      userId,
    });
    const data = await axiosClient
      .post(gamePost(userId).endpoint, payload, {
        headers: {
          ...headers,
        },
      })
      .then((res) => res.data as IGameResponse);
    return data;
  };

  return useMutation({
    mutationKey: ["post-game", userId],
    mutationFn: (payload: IGamePostPayload) => handlePostGame(payload),
  });
}
