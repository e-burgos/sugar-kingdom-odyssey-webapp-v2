import AppRoutes from "./router/AppRoutes";
import { useAuth } from "./store/useAuth";
import { useCallback, useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { appPaths, RoutesConfig } from "./router/RoutesConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { useMessageSystem } from "./hooks/useMessageSystem";
import useLogin from "./hooks/useLogin";

function App() {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, setLogout } = useAuth();
  const { unity } = useMessageSystem();
  const { handleRemoveUnityInstance } = unity;
  const { disconnectWallet } = useLogin();
  const currentPage = location.pathname;

  // state
  const [userInactive, setUserInactive] = useState<boolean>(false);

  const handleReload = useCallback(() => {
    if (window.performance) {
      if (window.performance.navigation.type === 1) {
        navigate(appPaths.home);
      }
    }
  }, [navigate]);

  useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: (event) => {
      userId &&
        alert(
          "Your user is inactive, the session will be closed. To play please log in again, thank you."
        );
      setUserInactive(!event && userId ? true : false);
    },
    debounce: 500,
  });

  useEffect(() => {
    if (userInactive) {
      setLogout();
      disconnectWallet();
      setUserInactive(false);
      handleReload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInactive]);

  useEffect(() => {
    if (currentPage !== appPaths.game || currentPage !== appPaths.tryGame)
      handleRemoveUnityInstance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return <AppRoutes routesConfig={RoutesConfig} />;
}

export default App;
