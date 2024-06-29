import React, { Fragment, useEffect } from "react";
import styles from "./tournaments.module.css";
import DarkContainer from "@/components/dark-container";
import { usePaginationStore } from "@/store/usePagination";
import { GetTournaments } from "@/api/queries/tournament/get-tournaments";
import PreviusCard from "@/components/tournaments/cards/PreviusCard";
import OrchestratorCard from "@/components/tournaments/cards/OrchestratorCard";
import Spinner from "@/components/spinner/Spinner";
interface TournamentsProps {
  style?: React.CSSProperties;
}

const Tournaments: React.FC<TournamentsProps> = ({ style }) => {
  // hooks
  const { pageNumber, pageSize } = usePaginationStore();
  const getTournaments = GetTournaments(pageNumber, pageSize);

  useEffect(() => {
    getTournaments.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DarkContainer
      isError={getTournaments.isError}
      style={style}
      hideGain
      goToHomeButton
    >
      <div className={styles.wrapper}>
        {(!getTournaments.isSuccess ||
          getTournaments.isLoading ||
          getTournaments.isFetching) && <Spinner />}
        {getTournaments.isSuccess &&
          getTournaments.data?.data
            .sort((a, b) => (a.statusFlag > b.statusFlag ? -1 : 1))
            .map((tournament) => (
              <Fragment key={tournament.id}>
                {(tournament.statusFlag === "now" ||
                  tournament.statusFlag === "future") && (
                  <OrchestratorCard tournament={tournament} />
                )}
                {tournament.statusFlag === "previous" && (
                  <PreviusCard tournament={tournament} />
                )}
              </Fragment>
            ))}
      </div>
    </DarkContainer>
  );
};

export default Tournaments;
