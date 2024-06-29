import { useCallback, useEffect, useState } from "react";
import { useUnityProvider } from "./useUnityProvider";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { useLocation, useNavigate } from "react-router-dom";
import { appPaths } from "../router/RoutesConfig";
import { useAuth } from "@/store/useAuth";
import { PatchTicketFirstUnused } from "@/api/queries/tickets/patch-ticket-first-unused";
import { IGameOverResponse } from "@/api/types/unity";
import { PostGame } from "@/api/queries/game/post-game";
import { IGamePostPayload } from "@/api/endpoints/game/types";
import { ITicketResponse } from "@/api/endpoints/ticket/types";
import { toast } from "react-toastify";

export function useMessageSystem() {
  const { wallet } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname;

  const {
    unityConfigParams,
    unityProvider,
    loadingProgression,
    unityInstance,
    isLoaded,
    sendMessage,
    addEventListener,
    removeEventListener,
    handleRemoveUnityInstance,
  } = useUnityProvider();

  const [gameTicket, setGameTicket] = useState<ITicketResponse | null>(null);
  const postGame = PostGame();
  const patchTicketFirstUnused = PatchTicketFirstUnused();

  const handleSendMessage = useCallback(
    (type: string, payload: string) => {
      const message = { type, payload };
      return sendMessage(
        "WebBridge",
        "WebsiteToUnity",
        JSON.stringify(message)
      );
    },
    [sendMessage]
  );

  const handleSendWallet = useCallback(() => {
    return handleSendMessage("Wallet", wallet || "");
  }, [handleSendMessage, wallet]);

  const handleSendAudio = useCallback(
    (audio: boolean) => {
      handleSendMessage("Audio", audio.toString());
      return;
    },
    [handleSendMessage]
  );

  const handleGameOver = useCallback(
    (gameData: ReactUnityEventParameter) => {
      const results: IGameOverResponse = JSON.parse(gameData as string);
      const payload: IGamePostPayload = {
        ticketId: gameTicket?.id || "",
        gameTime: results.GameTime,
        matches: results.Matches,
        score: results.Score,
        maxCombo: results.MaxCombo,
        phase: results.Phase,
        progress: results.Progress,
      };
      if (currentPage !== appPaths.game) return;
      const data = postGame.mutate(payload);
      return data;
    },
    [gameTicket, currentPage, postGame]
  );

  const handleCloseUnity = useCallback(() => {
    if (currentPage === appPaths.game) return navigate(appPaths.home);
    return;
  }, [currentPage, navigate]);

  const handleUsedTicket = useCallback(() => {
    if (currentPage === appPaths.game) patchTicketFirstUnused.mutate();
  }, [currentPage, patchTicketFirstUnused]);

  // Add event listener
  useEffect(() => {
    if (isLoaded) {
      addEventListener("GameOver", handleGameOver);
      addEventListener("UsedTicket", handleUsedTicket);
      addEventListener("CloseUnity", handleCloseUnity);
    }
    return () => {
      removeEventListener("GameOver", handleGameOver);
      removeEventListener("UsedTicket", handleUsedTicket);
      removeEventListener("CloseUnity", handleCloseUnity);
    };
  }, [
    isLoaded,
    addEventListener,
    handleGameOver,
    handleUsedTicket,
    removeEventListener,
    handleCloseUnity,
  ]);

  // Send audio
  useEffect(() => {
    if (currentPage === appPaths.game || currentPage === appPaths.tryGame) {
      if (isLoaded) handleSendAudio(true);
    } else if (isLoaded) handleSendAudio(false);
  }, [currentPage, handleSendAudio, isLoaded]);

  // Post score
  useEffect(() => {
    if (patchTicketFirstUnused.isSuccess) {
      setGameTicket(patchTicketFirstUnused.data);
    }
    if (patchTicketFirstUnused.isError) {
      navigate(appPaths.home);
      toast.error("Your ticket is invalid, please try again.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patchTicketFirstUnused.isSuccess, patchTicketFirstUnused.isError]);

  return {
    unity: {
      unityConfigParams,
      unityProvider,
      loadingProgression,
      unityInstance,
      handleRemoveUnityInstance,
      isLoaded,
      sendMessage,
      addEventListener,
      removeEventListener,
    },
    systemMessage: {
      handleSendMessage,
      handleSendWallet,
      handleSendAudio,
      handleGameOver,
    },
  };
}
