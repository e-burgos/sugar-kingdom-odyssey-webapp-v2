import {
  Game,
  Home,
  Leaderboard,
  LeaderboardDetail,
  MobilePage,
  Profile,
  Staking,
  Tournaments,
  BuySugar,
  TryGame,
} from "./entry-points";

export type IRouteConfig = {
  key: string;
  path: string;
  element: JSX.Element;
  isPrivate?: boolean;
  disabled?: boolean;
};

export const appPaths = {
  home: "/",
  mobilePage: "/mobile-page",
  game: "/game",
  tryGame: "/try-game",
  leaderboard: "/leaderboard",
  profile: "/profile",
  staking: "/staking",
  buySugar: "/buy-sugar",
  tournaments: "/tournaments",
};

export const RoutesConfig: IRouteConfig[] = [
  {
    key: "home",
    path: "/",
    element: <Home />,
  },
  {
    key: "mobile-page",
    path: "/mobile-page",
    element: <MobilePage />,
  },
  {
    key: "game",
    path: "/game",
    element: <Game />,
    isPrivate: true,
  },
  {
    key: "leaderboard",
    path: "/leaderboard",
    element: <Leaderboard />,
    isPrivate: true,
  },
  {
    key: "leaderboard-detail",
    path: "/leaderboard/:id",
    element: <LeaderboardDetail />,
    isPrivate: true,
  },
  {
    key: "profile",
    path: "/profile",
    element: <Profile />,
    isPrivate: true,
  },
  {
    key: "staking",
    path: "/staking",
    element: <Staking />,
    isPrivate: true,
  },
  {
    key: "tournaments",
    path: "/tournaments",
    element: <Tournaments />,
    isPrivate: true,
  },
  {
    key: "buy-sugar",
    path: "/buy-sugar",
    element: <BuySugar />,
    isPrivate: true,
  },
  {
    key: "try-game",
    path: "/try-game",
    element: <TryGame />,
    isPrivate: true,
  },
];
