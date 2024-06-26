import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../config/axios-client";
import { useAuth } from "@/store/useAuth";
import { nonceGet } from "@/api/endpoints/nonce/endpoints";
import { INonceResponse } from "@/api/endpoints/nonce/types";

export function GetNonce() {
  const { wallet } = useAuth();

  const handleGetNonce = async (): Promise<INonceResponse> => {
    if (!wallet) throw new Error("Wallet is required");
    const data = await axiosClient
      .get(nonceGet(wallet).endpoint)
      .then((res) => res.data as INonceResponse);
    return data;
  };

  return useMutation({
    mutationKey: ["get-nonce", wallet],
    mutationFn: handleGetNonce,
  });
}
