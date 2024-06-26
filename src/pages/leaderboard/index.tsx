import React from "react";
import styles from "./leaderboard.module.css";
import DarkContainer from "@/components/dark-container";
import DataTable from "@/components/datatable";
import { GetTournaments } from "@/api/queries/tournament/get-tournaments";
import Spinner from "@/components/spinner/Spinner";
import { columns, mapper } from "./Datatable/TournamentColumns";
import { usePaginationStore } from "@/store/usePagination";

interface LeaderboardProps {
  style?: React.CSSProperties;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ style }) => {
  // hooks
  const { pageNumber, pageSize } = usePaginationStore();
  const { data, isSuccess } = GetTournaments(pageNumber, pageSize);

  // prepare data
  const initialData = mapper(data?.data || []);

  return (
    <DarkContainer style={style} label={"Leaderboard"} hideGain>
      <div
        className={styles.wrapper}
        style={{ justifyContent: !isSuccess ? "center" : "flex-start" }}
      >
        {!isSuccess && <Spinner />}
        {isSuccess && data?.data.length && (
          <DataTable data={initialData} columns={columns} showPagination />
        )}
      </div>
    </DarkContainer>
  );
};

export default Leaderboard;
