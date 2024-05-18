import { useCallback } from "react";
import { UnityConfig, useUnityContext } from "react-unity-webgl";

export function useUnityProvider() {
  const unityConfigParams: UnityConfig = {
    dataUrl: "unity/Build/sugar-page.data",
    frameworkUrl: "unity/Build/sugar-page.framework.js",
    loaderUrl: "unity/Build/sugar-page.loader.js",
    codeUrl: "unity/Build/sugar-page.wasm",
    streamingAssetsUrl: "assets",
    companyName: "SugarKingdomOddysey",
    productName: "candy-cash",
    productVersion: "1.4",
  };
  const {
    unityProvider,
    isLoaded,
    sendMessage,
    addEventListener,
    removeEventListener,
    loadingProgression,
    UNSAFE__unityInstance,
  } = useUnityContext(unityConfigParams);

  const element = document.getElementById("unity-container");

  const handleRemoveUnityInstance = useCallback(() => {
    if (element) {
      element.remove();
      unityProvider.setUnityInstance(null);
      window.location.reload();
    }
  }, [element, unityProvider]);

  return {
    unityConfigParams,
    unityProvider,
    isLoaded,
    loadingProgression,
    unityInstance: UNSAFE__unityInstance,
    handleRemoveUnityInstance,
    sendMessage,
    addEventListener,
    removeEventListener,
  };
}
