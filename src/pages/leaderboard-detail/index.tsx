import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./leaderboard-detail.module.css";
import DarkContainer from "@/components/dark-container";
import { GetLeaderboardByTournamentId } from "@/api/queries/leaderboard/get-leaderboard-by-tournament-id";
import Paragraph from "@/components/typography/paragraph";
import ButtonLeft from "@/components/buttons/button-left";
import { columns, mapper } from "./Datatable/LeaderboardColumns";
import Spinner from "@/components/spinner/Spinner";
import DataTableDetail from "@/components/datatable/DatatableDetail";
import { useAuth } from "@/store/useAuth";
import { GetTournamentById } from "@/api/queries/tournament/get-tournament-by-id";

// assets
import ButtonImage from "@/components/buttons/button-image";
import BuyTicketBtn from "@/assets/images/leaderboard/buyTicket.svg";
import BuyTicketBtnH from "@/assets/images/leaderboard/buyTicketH.svg";
import PlayNowBtn from "@/assets/images/leaderboard/playNow.svg";
import PlayNowBtnH from "@/assets/images/leaderboard/playNowH.svg";
import BuyTicketsCard from "@/components/tournaments/cards/BuyTicketsCard";
import PlayNowCard from "@/components/tournaments/cards/PlayNowCard";
import PendingCard from "@/components/tournaments/cards/PendingCard";
import SuccessCard from "@/components/tournaments/cards/SuccessCard";
import { useBuyTickets } from "@/store/useBuyTickets";

interface LeaderboardDetailProps {
  style?: React.CSSProperties;
}

const LeaderboardDetail: React.FC<LeaderboardDetailProps> = ({ style }) => {
  // Get the tournament ID from the URL
  const params = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const tournamentId = params.id as string;

  // Fetch the leaderboard data
  const getTournament = GetTournamentById(tournamentId);
  const getLeaderboard = GetLeaderboardByTournamentId(tournamentId);

  // state
  const { data: ticketData, setData, setAction } = useBuyTickets();
  const currentTicket = ticketData.find((item) => item.id === tournamentId);
  const action = currentTicket?.action || "leaderboard";

  useEffect(() => {
    if (!currentTicket)
      setData({
        id: tournamentId,
        action: "leaderboard",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserRank = useCallback(() => {
    if (
      userId &&
      getLeaderboard?.data &&
      getLeaderboard.data?.Error !== undefined
    ) {
      const user = getLeaderboard.data.entries?.find(
        (entry) => entry?.userId === userId
      );
      return user;
    }
    return undefined;
  }, [getLeaderboard.data, userId]);

  // Prepare data for the table
  const initialData = mapper(
    getLeaderboard.data?.entries || [],
    getTournament.data,
    handleUserRank()
  );

  return (
    <DarkContainer
      style={style}
      hideGain
      isError={
        getLeaderboard.isError ||
        getTournament.isError ||
        getLeaderboard.data?.Error !== undefined
      }
      header={
        <div className={styles.header}>
          <ButtonLeft
            size="50px"
            className={styles.backButton}
            onClick={
              action !== "leaderboard"
                ? () => setAction(tournamentId, "leaderboard")
                : () => navigate(-1)
            }
          />
          <Paragraph
            fontFamily="Titan-Regular"
            color="#F2AB02"
            fontWeight="bold"
            fontSize="50px"
          >
            {action !== "leaderboard" ? "" : "Leaderboard"}
          </Paragraph>
          <div className={styles.rightHeaderContainer}>
            {getTournament.data?.statusFlag !== "previous" &&
              action === "leaderboard" && (
                <ButtonImage
                  img={BuyTicketBtn}
                  imgHover={BuyTicketBtnH}
                  height="50px"
                  aspectRatio="30/11"
                  onClick={() => setAction(tournamentId, "buy-ticket")}
                />
              )}
            {getTournament.data?.statusFlag === "now" &&
              action === "leaderboard" && (
                <ButtonImage
                  img={PlayNowBtn}
                  imgHover={PlayNowBtnH}
                  height="50px"
                  aspectRatio="30/11"
                  onClick={() => setAction(tournamentId, "play-now")}
                />
              )}
          </div>
        </div>
      }
    >
      {action === "leaderboard" && (
        <div
          className={styles.wrapper}
          style={{
            justifyContent: !getLeaderboard.isSuccess ? "center" : "flex-start",
          }}
        >
          {(!getLeaderboard.isSuccess || !getTournament.isSuccess) && (
            <Spinner color="rgba(150, 233, 237, 1)" />
          )}
          {getTournament.isSuccess &&
            getLeaderboard.isSuccess &&
            getLeaderboard.data?.entries?.length && (
              <DataTableDetail
                data={initialData || []}
                columns={columns}
                tournamentData={getTournament.data || []}
                hideFooter={!handleUserRank()}
                showPagination
              />
            )}
        </div>
      )}
      {getTournament.isSuccess && action !== "leaderboard" && (
        <div
          className={styles.wrapper}
          style={{
            justifyContent: "center",
          }}
        >
          {action === "buy-ticket" && (
            <BuyTicketsCard
              tournament={getTournament.data}
              cancelAction="leaderboard"
            />
          )}
          {action === "play-now" && (
            <PlayNowCard
              cancelAction="leaderboard"
              tournament={getTournament.data}
            />
          )}
          {action === "pending" && (
            <PendingCard tournament={getTournament.data} />
          )}
          {action === "success" && (
            <SuccessCard tournament={getTournament.data} />
          )}
        </div>
      )}
    </DarkContainer>
  );
};

export default LeaderboardDetail;
