/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import { useBuyTickets } from "@/store/useBuyTickets";
import { ethers } from "ethers";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

const useTransaction = (tournament: ITournamentResponse, value: string) => {
  const { data, setData, setTxHash, setTxStatus, setAction } = useBuyTickets();

  const ticketData = data.find((item) => item.id === tournament.id);
  useEffect(() => {
    if (!ticketData)
      setData({
        id: tournament.id,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendTransaction = useCallback(async () => {
    // @ts-ignore
    const ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const transactionParameters = {
          to: tournament.wallet,
          value: ethers.utils.parseEther(value)._hex,
        };
        // Envía la transacción
        const tx = await signer.sendTransaction(transactionParameters);
        setTxHash(tournament.id, tx.hash);
        toast.info(`Transaction sent with hash: ${tx.hash}`);
        setTxStatus(tournament.id, "pending");
        setAction(tournament.id, "pending");

        // Espera a que la transacción sea minada
        const status = await tx.wait();
        if (status.status === 1) {
          setTxStatus(tournament.id, "completed");
          setAction(tournament.id, "success");
          toast.success("Transaction completed");
        } else {
          setTxStatus(tournament.id, "fail");
          setAction(tournament.id, "initial");
          toast.error("Transaction failed");
        }
      } catch (error) {
        setTxStatus(tournament.id, "fail");
        setAction(tournament.id, "initial");
        toast.error("Transaction failed");
        console.error("Error sending transaction:", error);
      }
    } else {
      console.log("MetaMask is not installed!");
    }
  }, [
    setAction,
    setTxHash,
    setTxStatus,
    tournament.id,
    tournament.wallet,
    value,
  ]);

  return { sendTransaction };
};

export default useTransaction;
