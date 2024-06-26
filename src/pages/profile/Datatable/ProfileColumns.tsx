import { createColumnHelper } from "@tanstack/react-table";
import CellInfo from "@/components/datatable/components/CellInfo";
import { IHistory } from "@/api/endpoints/history/types";
import Paragraph from "@/components/typography/paragraph";
import HistoryFilterButton from "../HistoryFilterButton";

export type TData = {
  action: string;
  status: string;
  tournamentName: string;
};

export const mapper = (data: IHistory[]) => {
  const filterData: TData[] = [];
  data &&
    data.map((row) =>
      filterData.push({
        action: row.action,
        status: row.status,
        tournamentName: row.tournamentName,
      })
    );
  return filterData;
};

const columnHelper = createColumnHelper<TData>();

export const columns = [
  columnHelper.accessor((row) => row.tournamentName, {
    id: "tournamentName",
    cell: (info) => {
      return (
        <CellInfo
          style={{ textAlign: "left", paddingLeft: "15%", zIndex: 1 }}
          info={`${info.getValue().toLocaleUpperCase()}`}
          color="rgba(42, 252, 253, 1)"
          fontSize="15px"
        />
      );
    },
    header: () => {
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
          <HistoryFilterButton buttonType="matches" />
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.action, {
    id: "action",
    cell: (info) => {
      return (
        <CellInfo
          info={`${info.getValue().toLocaleUpperCase()}`}
          color="white"
          fontSize="15px"
        />
      );
    },
    header: () => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paragraph color="white" fontSize="30px">
            History
          </Paragraph>
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    cell: (info) => {
      return (
        <CellInfo
          style={{ textAlign: "right", paddingRight: "15%" }}
          info={`${info.getValue()}`}
          color="white"
          fontSize="16px"
        />
      );
    },
    header: () => {
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
          <HistoryFilterButton buttonType="purchases" />
        </div>
      );
    },
  }),
];
