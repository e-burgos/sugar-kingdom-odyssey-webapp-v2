/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const useHandleChain = () => {
  const [chainId, setchainId] = useState<string>("");
  const BSC_NETWORK_ID = import.meta.env.VITE_NETWORK_ID as string;

  const handleChainChanged = useCallback(async () => {
    toast("Switch to BNB Smart Chain", { type: "success" });
  }, []);

  const getChainId = useCallback(async () => {
    // @ts-ignore
    const ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      const chainId = await ethereum.request({ method: "eth_chainId" });
      setchainId(chainId);
    }
  }, []);

  const handleNetworkSwitch = useCallback(async () => {
    // @ts-ignore
    const ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      if (chainId !== BSC_NETWORK_ID) {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: BSC_NETWORK_ID }],
          });
          setchainId(BSC_NETWORK_ID);
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
              setchainId(BSC_NETWORK_ID);
            } catch (addError) {
              toast("Failed to add BNB Smart Chain", { type: "error" });
              console.error("Failed to add BNB Smart Chain:", addError);
            }
          }
        }
        ethereum.on("chainChanged", handleChainChanged);
      }
    }
  }, [BSC_NETWORK_ID, chainId, handleChainChanged]);

  useEffect(() => {
    if (!chainId) getChainId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  return {
    handleNetworkSwitch,
    chainId,
    BSC_NETWORK_ID,
    isBnbNetwork: chainId === BSC_NETWORK_ID,
  };
};

export default useHandleChain;
