import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/api/config/axios-client";
import { noncePost } from "@/api/endpoints/nonce/endpoints";
import { INonceResponse } from "@/api/endpoints/nonce/types";

export function PostNonce() {
  const handlePostNonce = async (wallet: string): Promise<INonceResponse> => {
    if (!wallet) throw new Error("Wallet is required");
    const data = await axiosClient
      .post(noncePost(wallet).endpoint)
      .then((res) => res.data as INonceResponse);
    return data;
  };

  return useMutation({
    mutationKey: ["post-nonce"],
    mutationFn: handlePostNonce,
    retry: false,
  });
}
