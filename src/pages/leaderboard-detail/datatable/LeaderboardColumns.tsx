import { createColumnHelper } from "@tanstack/react-table";
import CellInfo from "@/components/datatable/components/CellInfo";
import HeaderInfo from "@/components/datatable/components/HeaderInfo";
import { ILeaderboardEntry } from "@/api/endpoints/leaderboard/types";
import {
  formatToMoney,
  formatUTCDate,
  numberWithCommas,
} from "@/utils/numberUtils";
import MedalButton from "@/components/leaderboard/MedalButton";
import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import { Fragment } from "react";
import { handleRemainingTime } from "@/utils/functions";

export type TData = {
  rank: {
    rank: number;
    userName: string;
  };
  paid: {
    rank: number;
    paid: string;
  };
  points: string;
  currentTournament: ITournamentResponse;
  userRank: ILeaderboardEntry;
};

export const mapper = (
  data: ILeaderboardEntry[],
  currentTournament: ITournamentResponse | undefined,
  userRank: ILeaderboardEntry | undefined
) => {
  const filterData: TData[] = [];
  data.map((row) =>
    filterData.push({
      rank: { rank: row.rank, userName: row.userName },
      paid: {
        rank: row.rank,
        paid: `PAID: $${formatToMoney(Number(500000), 2)}`,
      },
      points: `${numberWithCommas(row.points)} PTS`,
      currentTournament: currentTournament as ITournamentResponse,
      userRank: userRank as ILeaderboardEntry,
    })
  );
  return filterData;
};

const columnHelper = createColumnHelper<TData>();

export const columns = [
  columnHelper.accessor((row) => row.rank, {
    id: "rank",
    cell: (info) => {
      const userRank = info.table.options.data[0].userRank?.rank || 0;
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "15%",
            gap: "20px",
          }}
        >
          {info.getValue().rank === 1 && (
            <>
              <MedalButton place={1} />
              <CellInfo
                info={`${info.getValue().userName}`}
                color="rgba(150, 233, 237, 1)"
                fontSize="16px"
              />
            </>
          )}
          {info.getValue().rank === 2 && (
            <>
              <MedalButton place={2} />
              <CellInfo
                info={`${info.getValue().userName}`}
                color="rgba(150, 233, 237, 1)"
                fontSize="16px"
              />
            </>
          )}
          {info.getValue().rank === 3 && (
            <>
              <MedalButton place={3} />
              <CellInfo
                info={`${info.getValue().userName}`}
                color="rgba(150, 233, 237, 1)"
                fontSize="16px"
              />
            </>
          )}
          {info.getValue().rank > 3 && (
            <>
              <CellInfo
                info={`# ${info.getValue().rank}`}
                color={
                  info.getValue().rank === userRank
                    ? "red"
                    : "rgba(150, 233, 237, 1)"
                }
                fontSize={info.getValue().rank === userRank ? "24px" : "20px"}
              />
              <CellInfo
                info={`${info.getValue().userName}`}
                color={
                  info.getValue().rank === userRank
                    ? "red"
                    : "rgba(150, 233, 237, 1)"
                }
                fontSize={info.getValue().rank === userRank ? "20px" : "16px"}
              />
            </>
          )}
        </div>
      );
    },
    header: (info) => {
      const pricePool = info.table.options.data[0].currentTournament.pricePool;
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingLeft: "15%",
            gap: "5px",
          }}
        >
          <HeaderInfo title="PRIZE POOL" />
          <CellInfo info={`$${formatToMoney(Number(pricePool), 2)}`} />
        </div>
      );
    },
    footer: (info) => (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "15%",
          gap: "20px",
        }}
      >
        <CellInfo
          info={`# ${info.table.options.data[0].userRank?.rank || 0}`}
          fontSize="20px"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CellInfo info={"YOU"} />
          <CellInfo
            info={
              info.table.options.data[0].userRank?.userName?.toLocaleUpperCase() ||
              ""
            }
            color="rgba(150, 233, 237, 1)"
          />
        </div>
      </div>
    ),
  }),
  columnHelper.accessor((row) => row.paid, {
    id: "paid",
    cell: (info) => (
      <Fragment>
        {info.getValue().rank < 4 &&
          info.table.options.data[0].currentTournament.statusFlag ===
            "previous" && <CellInfo info={info.getValue().paid} />}
      </Fragment>
    ),
    header: (info) => (
      <HeaderInfo
        title={info.table.options.data[0].currentTournament.name}
        fontSize="30px"
      />
    ),
  }),
  columnHelper.accessor((row) => row.points, {
    id: "points",
    cell: (info) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingRight: "15%",
          gap: "5px",
        }}
      >
        <CellInfo info={info.getValue()} />
      </div>
    ),
    header: (info) => {
      const statusFlag =
        info.table.options.data[0].currentTournament.statusFlag;
      const endDate = formatUTCDate(
        info.table.options.data[0].currentTournament.endDate
      );
      const startDate = formatUTCDate(
        info.table.options.data[0].currentTournament.startDate
      );
      const remainingTime = handleRemainingTime(
        info.table.options.data[0].currentTournament.remainingTime
      );

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingRight: "15%",
            gap: "5px",
          }}
        >
          <HeaderInfo
            title={
              statusFlag === "previous"
                ? "END DATE"
                : statusFlag === "now"
                ? "TIME LEFT"
                : "START DATE"
            }
          />
          <CellInfo
            info={
              statusFlag === "previous"
                ? endDate
                : statusFlag === "now"
                ? remainingTime
                : startDate
            }
          />
        </div>
      );
    },
    footer: (info) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingRight: "15%",
          gap: "5px",
        }}
      >
        <CellInfo
          info={`${numberWithCommas(
            info.table.options.data[0].userRank?.points || 0
          )} PTS`}
        />
      </div>
    ),
  }),
];
