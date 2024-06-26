import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/api/config/axios-client";
import { useAuth } from "@/store/useAuth";
import { authLogin } from "@/api/endpoints/auth/endpoints";
import { ILoginPostPayload, ILoginResponse } from "@/api/endpoints/auth/types";

export function PostLogin() {
  const { wallet } = useAuth();

  const handlePostLogin = async (
    signature: string
  ): Promise<ILoginResponse> => {
    if (!wallet) throw new Error("Wallet is required");
    const payload: ILoginPostPayload = {
      wallet,
      signature,
    };
    const data = await axiosClient
      .post(authLogin(payload).endpoint, {
        wallet,
        signature,
      })
      .then((res) => res.data as ILoginResponse);
    return data;
  };

  return useMutation({
    mutationKey: ["post-login", wallet],
    mutationFn: handlePostLogin,
  });
}
