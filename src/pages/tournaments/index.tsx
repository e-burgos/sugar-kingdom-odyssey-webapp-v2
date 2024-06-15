import React, { Fragment } from "react";
import styles from "./tournaments.module.css";
import DarkContainer from "../../components/dark-container";
import { usePaginationStore } from "@/store/usePagination";
import { GetTournaments } from "@/api/queries/tournament/get-tournaments";
import PreviusCard from "@/components/tournaments/cards/PreviusCard";
import OrchestratorCard from "@/components/tournaments/cards/OrchestratorCard";
import Spinner from "@/components/spinner/Spinner";
import { GetTicketsByUserId } from "@/api/queries/tickets/get-tickets-by-user-id";

interface TournamentsProps {
  style?: React.CSSProperties;
}

const Tournaments: React.FC<TournamentsProps> = ({ style }) => {
  // hooks
  const { pageNumber, pageSize } = usePaginationStore();
  const { data: userTickets } = GetTicketsByUserId();
  const { data, isSuccess, isLoading } = GetTournaments(pageNumber, pageSize);

  return (
    <DarkContainer style={style} hideGain goToHomeButton>
      <div className={styles.wrapper}>
        {!isSuccess || (isLoading && <Spinner />)}
        {isSuccess &&
          data?.data
            .sort((a, b) => (a.statusFlag > b.statusFlag ? 1 : -1))
            .reverse()
            .map((tournament) => (
              <Fragment key={tournament.id}>
                {(tournament.statusFlag === "now" ||
                  tournament.statusFlag === "future") && (
                  <OrchestratorCard
                    userTickets={userTickets}
                    tournament={tournament}
                  />
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
