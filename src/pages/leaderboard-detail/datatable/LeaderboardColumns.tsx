import { createColumnHelper } from "@tanstack/react-table";
import CellInfo from "@/components/datatable/components/CellInfo";
import HeaderInfo from "@/components/datatable/components/HeaderInfo";
import { ILeaderboardEntry } from "@/api/endpoints/leaderboard/types";

export type TData = {
  rank: number;
  userName: string;
  points: number;
};

export const mapper = (data: ILeaderboardEntry[]) => {
  const filterData: TData[] = [];
  data.map((row) =>
    filterData.push({
      rank: row.rank,
      userName: row.userName,
      points: row.points,
    })
  );
  return filterData;
};

const columnHelper = createColumnHelper<TData>();

export const columns = [
  columnHelper.accessor((row) => row.rank, {
    id: "rank",
    cell: (info) => (
      <CellInfo
        info={info.getValue().toString()}
        color="rgba(150, 233, 237, 1)"
      />
    ),
    header: () => <HeaderInfo title="Rank" />,
  }),
  columnHelper.accessor((row) => row.userName, {
    id: "userName",
    cell: (info) => <CellInfo info={info.getValue().toString()} />,
    header: () => <HeaderInfo title="User Name" />,
  }),
  columnHelper.accessor((row) => row.points, {
    id: "points",
    cell: (info) => <CellInfo info={`${info.getValue().toString()} points`} />,
    header: () => <HeaderInfo title="Points" />,
  }),
];
