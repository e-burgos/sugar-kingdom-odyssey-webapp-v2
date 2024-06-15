import AppRoutes from "./router/AppRoutes";
import { useAuth } from "./store/useAuth";
import { useCallback, useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useXerialWallet } from "./hooks/useXerialWallet";
import { appPaths, RoutesConfig } from "./router/RoutesConfig";
import { useNavigate } from "react-router-dom";

function App() {
  // hooks
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { handleLogout } = useXerialWallet();

  // state
  const [userInactive, setUserInactive] = useState<boolean>(false);

  const handleReload = useCallback(() => {
    if (window.performance) {
      if (window.performance.navigation.type === 1) {
        navigate(appPaths.game);
      } else {
        navigate(appPaths.home);
      }
    }
  }, [navigate]);

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
    if (isAuth) handleReload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userInactive && isAuth) {
      handleLogout();
      setUserInactive(false);
    }
  }, [handleLogout, isAuth, userInactive]);

  return <AppRoutes routesConfig={RoutesConfig} />;
}

export default App;
