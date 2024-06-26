/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAuth } from "@/store/useAuth";
import { toast } from "react-toastify";
import { PostNonce } from "@/api/queries/auth/post-nonce";

const useLogin = () => {
  const { wallet, isAuth, setWallet, setLogout } = useAuth();
  const [nonce, setNonce] = useState<string>("");
  const [signature, setSignature] = useState<string | null>(null);

  const postNonce = PostNonce();
  const BSC_NETWORK_ID = import.meta.env.VITE_NETWORK_ID as string;

  const signNonce = useCallback(async () => {
    // @ts-ignore
    const ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(nonce);
        setSignature(signature);
      } catch (error) {
        console.warn("Error signing nonce:", error);
      }
    }
  }, [nonce, setSignature]);

  const handleChainChanged = useCallback(
    async (chainId: string) => {
      if (chainId !== BSC_NETWORK_ID) {
        toast("Please switch to BNB Smart Chain", { type: "warning" });
      }
      return signNonce();
    },
    [BSC_NETWORK_ID, signNonce]
  );

  const handleNetworkSwitch = useCallback(async () => {
    // @ts-ignore
    const ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      const chainId = await ethereum.request({ method: "eth_chainId" });
      if (chainId !== BSC_NETWORK_ID) {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: BSC_NETWORK_ID }],
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: BSC_NETWORK_ID,
                    chainName: "BNB Smart Chain Mainnet",
                    nativeCurrency: {
                      name: "BNB",
                      symbol: "BNB", // 2-6 characters long
                      decimals: 18,
                    },
                    rpcUrls: ["https://bsc-dataseed.binance.org/"],
                    blockExplorerUrls: ["https://bscscan.com/"],
                  },
                ],
              });
            } catch (addError) {
              toast("Failed to add BNB Smart Chain", { type: "error" });
              console.error("Failed to add BNB Smart Chain:", addError);
            }
          }
          ethereum.on("chainChanged", () => handleChainChanged(chainId));
        }
      }
    }
  }, [BSC_NETWORK_ID, handleChainChanged]);

  const connectWallet = useCallback(async () => {
    // @ts-ignore
    const ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      try {
        // Request account access if needed
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // Set the first account
        setWallet(accounts[0]);
        postNonce.mutate(accounts[0]);
        handleNetworkSwitch();
      } catch (error) {
        setNonce("");
        setSignature("");
        setLogout();
        toast("User denied wallet access or there was an error!", {
          type: "error",
        });
      }
    } else {
      toast("MetaMask not detected!", {
        type: "error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleNetworkSwitch, setLogout, setWallet]);

  const disconnectWallet = useCallback(async () => {
    // @ts-ignore
    const ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      try {
        await ethereum.request({
          method: "wallet_revokePermissions",
          params: [{ eth_accounts: {} }],
        });
        setNonce("");
        setSignature("");
        setLogout();
        return toast("Wallet disconnected!", { type: "success" });
      } catch (error) {
        return toast("User denied wallet access or there was an error!", {
          type: "error",
        });
      }
    } else {
      return toast("MetaMask not detected!", {
        type: "error",
      });
    }
  }, [setLogout]);

  useEffect(() => {
    if (postNonce.isSuccess && !nonce) setNonce(postNonce.data?.nonce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce, postNonce.isSuccess]);

  useEffect(() => {
    if (nonce && !isAuth && !signature) signNonce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, nonce, signature, isAuth]);

  return {
    wallet,
    nonce,
    signature,
    connectWallet,
    disconnectWallet,
    signNonce,
  };
};

export default useLogin;
