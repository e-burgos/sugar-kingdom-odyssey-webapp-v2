import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/store/useAuth";
import axiosClient from "@/api/config/axios-client";
import { userPatchUsername } from "@/api/endpoints/user/endpoints";
import { IUserResponse } from "@/api/endpoints/user/types";
import { generateHeaders } from "@/api/utils/HeaderEncoder";
import { GetUserById } from "./get-user-by-id";

export function PatchUserName(userName: string) {
  const getUser = GetUserById();
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: userPatchUsername(userName).method,
    endpoint: userPatchUsername(userName).endpoint,
    payload: userName,
    wallet,
    sessionId,
    userId,
  });

  const handlePatchUserName = async (): Promise<IUserResponse> => {
    if (!userName) throw new Error("userName is required");
    const data = await axiosClient
      .patch(userPatchUsername(userName).endpoint, JSON.stringify(userName), {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      })
      .then((res) => res.data as IUserResponse);
    return data;
  };

  return useMutation({
    mutationKey: ["patch-username", userName, userId],
    mutationFn: handlePatchUserName,
    onSettled: () => getUser.refetch(),
    onError: (err) => console.error(err),
  });
}
