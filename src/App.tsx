import Layout from "./components/common/layout";
import Home from "./pages/home";
import MobilePage from "./pages/mobile-page";
import { useIsMobile } from "./hooks/useIsMobile";
import { usePageOrchestrator } from "./store/usePageOrchestrator";
import Tournaments from "./pages/tournaments";
import Leaderboard from "./pages/leaderboard";
import Staking from "./pages/staking";
import Game from "./pages/game";
import Profile from "./pages/profile";
import { useAuth } from "./store/useAuth";
import { useCallback, useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useXerialWallet } from "./hooks/useXerialWallet";

function App() {
  const { isAuth } = useAuth();
  const { currentPage, setCurrentPage } = usePageOrchestrator();
  const { isMobile } = useIsMobile();
  const { handleLogout } = useXerialWallet();

  const handleReload = useCallback(() => {
    if (window.performance) {
      if (window.performance.navigation.type === 1) {
        setCurrentPage("game");
      } else {
        setCurrentPage("home");
      }
    }
  }, [setCurrentPage]);

  useEffect(() => {
    if (isAuth) handleReload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [userInactive, setUserInactive] = useState<boolean>(false);
  useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle: (event) => {
      isAuth &&
        alert(
          "Your user is inactive, the session will be closed. To play please log in again, thank you."
        );
      setUserInactive(!event && isAuth ? true : false);
    },
    debounce: 500,
  });

  useEffect(() => {
    if (userInactive && isAuth) {
      handleLogout();
      setUserInactive(false);
    }
  }, [handleLogout, isAuth, userInactive]);

  return (
    <>
      {isMobile ? (
        <MobilePage />
      ) : (
        <Layout header menuBar>
          {currentPage === "home" && <Home />}
          {currentPage === "tournaments" && <Tournaments />}
          {currentPage === "leaderboard" && <Leaderboard />}
          {currentPage === "staking" && <Staking />}
          {currentPage === "profile" && <Profile />}
          <Game
            style={{
              visibility: currentPage === "game" ? "visible" : "hidden",
              height: currentPage === "game" ? "100%" : "0px",
            }}
          />
        </Layout>
      )}
    </>
  );
}

export default App;
