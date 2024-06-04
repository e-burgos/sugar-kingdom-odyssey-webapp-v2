import { createColumnHelper } from "@tanstack/react-table";
import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import TournamentButton from "./LeaderboardDetailButton";
import CellInfo from "@/components/datatable/components/CellInfo";
import HeaderInfo from "@/components/datatable/components/HeaderInfo";

export type TData = {
  tournamentName: string;
  price: number;
  contestants: number;
  startDate: string;
  endDate: string;
  status: string;
  leaderboard: string;
};

export const mapper = (data: ITournamentResponse[]) => {
  const filterData: TData[] = [];
  data.map((row) =>
    filterData.push({
      tournamentName: row.name,
      price: Number(row.prices.map((price) => price.amount)),
      contestants: row.contestantCount,
      startDate: new Date(row.startDate).toLocaleDateString(),
      endDate: new Date(row.endDate).toLocaleDateString(),
      status: row.status === 0 ? "Paid" : "Free",
      leaderboard: row.id,
    })
  );
  return filterData;
};

const columnHelper = createColumnHelper<TData>();

export const columns = [
  columnHelper.accessor((row) => row.tournamentName, {
    id: "tournamentName",
    cell: (info) => (
      <CellInfo info={info.getValue()} color="rgba(150, 233, 237, 1)" />
    ),
    header: () => <HeaderInfo title="Tournament Name" />,
  }),
  columnHelper.accessor((row) => row.price, {
    id: "price",
    cell: (info) => <CellInfo info={info.getValue().toString()} />,
    header: () => <HeaderInfo title="Price Pool" />,
  }),
  columnHelper.accessor((row) => row.contestants, {
    id: "contestants",
    cell: (info) => <CellInfo info={info.getValue().toString()} />,
    header: () => <HeaderInfo title="Number of Contestants" />,
  }),
  columnHelper.accessor((row) => row.startDate, {
    id: "startDate",
    cell: (info) => <CellInfo info={info.getValue().toString()} />,
    header: () => <HeaderInfo title="Start Date" />,
  }),
  columnHelper.accessor((row) => row.endDate, {
    id: "endDate",
    cell: (info) => <CellInfo info={info.getValue().toString()} />,
    header: () => <HeaderInfo title="End Date" />,
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    cell: (info) => <CellInfo info={info.getValue().toString()} />,
    header: () => <HeaderInfo title="Current Status" />,
  }),
  columnHelper.accessor((row) => row.leaderboard, {
    id: "leaderboard",
    cell: (info) => <TournamentButton info={info.getValue().toString()} />,
    header: () => <HeaderInfo title="Leaderboard" />,
  }),
];
