import { useEffect } from "react";
import { useWindowSize } from "./useWindowSize";

export function useIsMobile() {
  const { mobileWidth } = useWindowSize();
  const mobileMode = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        mobileMode.Android() ||
        mobileMode.BlackBerry() ||
        mobileMode.iOS() ||
        mobileMode.Opera() ||
        mobileMode.Windows() ||
        mobileWidth
      );
    },
  };

  const handleIsMobile = () => {
    if (mobileMode.any()) return true;
    return false;
  };

  useEffect(() => {
    if (mobileWidth) handleIsMobile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileWidth]);

  return {
    isMobile: handleIsMobile(),
  };
}
