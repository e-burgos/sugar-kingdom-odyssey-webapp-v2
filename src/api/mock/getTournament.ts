import { ITournamentResponse } from "../endpoints/tournament/types";

export const tournament: ITournamentResponse = {
  name: "Tournament Test 2",
  startDate: "2024-06-13T00:00:00",
  endDate: "2024-06-20T00:00:00",
  wallet: "0x09b45179169e386ddedcbc607a4ad872055b8557",
  imageUrl: "https://picsum.photos/seed/picsum/200/300",
  colorARGB: -16728065,
  color: {
    r: 0,
    g: 191,
    b: 255,
    a: 255,
    isKnownColor: false,
    isEmpty: false,
    isNamedColor: false,
    isSystemColor: false,
    name: "ff00bfff",
  },
  prices: [
    {
      tokenId: "ac883953-5e87-4669-0863-08dc76bb11fd",
      amount: "5",
      token: {
        contractAddress: "0x55d398326f99059ff775485246999027b3197955",
        imageUrl:
          "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
        id: "ac883953-5e87-4669-0863-08dc76bb11fd",
        name: "USDT",
        symbol: "USDT",
        validationErrors: "",
      },
    },
  ],
  status: 0,
  contestantCount: 100,
  pricePool: 2831.28,
  remainingTime: "2.04:58:40.6039045",
  statusFlag: "now",
  id: "9403bfb9-2644-44eb-39ac-08dc76d4f259",
  validationErrors: "",
};
