import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/useAuth";
import axiosClient from "@/api/config/axios-client";
import { userGet } from "@/api/endpoints/user/endpoints";
import { IUserResponse } from "@/api/endpoints/user/types";
import { generateHeaders } from "@/api/utils/HeaderEncoder";

export function GetUserById() {
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: userGet(userId as string).method,
    endpoint: userGet(userId as string).endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handleGetUserById = async (): Promise<IUserResponse> => {
    if (!userId) throw new Error("userId not found");
    const data = await axiosClient
      .get(userGet(userId).endpoint, {
        headers,
      })
      .then((res) => res.data as IUserResponse);
    return data;
  };

  return useQuery({
    queryKey: ["get-user-by-id", userId],
    queryFn: handleGetUserById,
    refetchOnWindowFocus: false,
    //enabled: !!userId,
    //staleTime: 1000 * 60 * 5,
  });
}
