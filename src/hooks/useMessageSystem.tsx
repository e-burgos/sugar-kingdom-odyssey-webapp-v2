import { useCallback, useEffect, useState } from "react";
import { useXerialWallet } from "./useXerialWallet";
import { useUnityProvider } from "./useUnityProvider";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { usePageOrchestrator } from "../store/usePageOrchestrator";
import { PostScore } from "../api/callbacks/post-score";

export function useMessageSystem() {
  const { wallet } = useXerialWallet();
  const { currentPage } = usePageOrchestrator();
  const {
    unityConfigParams,
    unityProvider,
    loadingProgression,
    unityInstance,
    handleRemoveUnityInstance,
    isLoaded,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useUnityProvider();

  const [points, setPoints] = useState<number>(0);
  const postScore = PostScore(points);

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

  const handleReceiveScore = useCallback(
    (getScore: ReactUnityEventParameter) => {
      const newScore = Number(getScore);
      return setPoints(newScore);
    },
    [setPoints]
  );

  // Add event listener
  useEffect(() => {
    if (isLoaded) addEventListener("GameOver", handleReceiveScore);
    return () => {
      removeEventListener("GameOver", handleReceiveScore);
    };
  }, [addEventListener, handleReceiveScore, isLoaded, removeEventListener]);

  // Send audio
  useEffect(() => {
    if (currentPage === "game") {
      if (isLoaded) handleSendAudio(true);
    } else if (isLoaded) handleSendAudio(false);
  }, [currentPage, handleSendAudio, isLoaded]);

  // Post score
  useEffect(() => {
    if (points > 0) {
      postScore.mutate();
      setPoints(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

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
      handleReceiveScore,
    },
  };
}
