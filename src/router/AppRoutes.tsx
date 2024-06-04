/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { IRouteConfig } from "./RoutesConfig";
import Layout from "../components/common/layout";
import { useIsMobile } from "../hooks/useIsMobile";
import { MobilePage } from "./entry-points";

export interface AppRoutesProps {
  routesConfig: IRouteConfig[];
}

export function AppRoutes({ routesConfig }: AppRoutesProps) {
  const { isMobile } = useIsMobile();
  const routes = routesConfig;

  const checkIsPrivateRoute = useCallback(
    (route: IRouteConfig) => {
      if (isMobile) {
        return <MobilePage />;
      }
      if (route.isPrivate) {
        return (
          <Layout header menuBar>
            {route.element}
          </Layout>
        );
      }
      return (
        <Layout header menuBar>
          {route.element}
        </Layout>
      );
    },
    [isMobile]
  );

  return (
    <React.Suspense fallback={null}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={checkIsPrivateRoute(route)}
          />
        ))}
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </React.Suspense>
  );
}

export default AppRoutes;
