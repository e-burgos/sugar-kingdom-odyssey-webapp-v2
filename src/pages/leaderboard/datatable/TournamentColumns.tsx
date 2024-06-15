import { createColumnHelper } from "@tanstack/react-table";
import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import TournamentButton from "@/components/leaderboard/LeaderboardDetailButton";
import CellInfo from "@/components/datatable/components/CellInfo";
import HeaderInfo from "@/components/datatable/components/HeaderInfo";
import {
  formatToMoney,
  formatUTCDate,
  numberWithCommas,
} from "@/utils/numberUtils";

export type TData = {
  tournamentName: string;
  price: string;
  contestants: string;
  startDate: string;
  endDate: string;
  status: string;
  leaderboard: ITournamentResponse;
};

export const mapper = (data: ITournamentResponse[]) => {
  const filterData: TData[] = [];
  data.map((row) =>
    filterData.push({
      tournamentName: row.name,
      price: `$${formatToMoney(Number(row.pricePool), 2)}`,
      contestants: `${numberWithCommas(row.contestantCount)}`,
      startDate: formatUTCDate(row.startDate),
      endDate: formatUTCDate(row.endDate),
      status:
        row.status === 0
          ? "Open"
          : row.status === 1
          ? "Pending Payment"
          : "Paid",
      leaderboard: row,
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
    cell: (info) => <CellInfo info={info.getValue()} />,
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
    cell: (info) => <TournamentButton data={info.getValue()} />,
    header: () => <HeaderInfo title="Leaderboard" />,
  }),
];
