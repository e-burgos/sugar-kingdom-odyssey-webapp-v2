import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./leaderboard-detail.module.css";
import DarkContainer from "@/components/dark-container";
import { GetLeaderboardByTournamentId } from "@/api/queries/leaderboard/get-leaderboard-by-tournament-id";
import Paragraph from "@/components/typography/paragraph";
import ButtonLeft from "@/components/buttons/button-left";
import { columns, mapper } from "./datatable/LeaderboardColumns";
import Spinner from "@/components/spinner/Spinner";
import DataTableDetail from "@/components/datatable/DatatableDetail";
import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import { GetTournaments } from "@/api/queries/tournament/get-tournaments";
import { useAuth } from "@/store/useAuth";
import ButtonImage from "@/components/buttons/button-image";
import BuyTicketBtn from "@/assets/images/leaderboard/buyTicket.svg";
import BuyTicketBtnH from "@/assets/images/leaderboard/buyTicketH.svg";
import PlayNowBtn from "@/assets/images/leaderboard/playNow.svg";
import PlayNowBtnH from "@/assets/images/leaderboard/playNowH.svg";
import { appPaths } from "@/router/RoutesConfig";

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
  const { data: tournamentData, isSuccess: tournamentIsSuccess } =
    GetTournaments(1, 100);
  const { data, isSuccess } = GetLeaderboardByTournamentId(tournamentId);

  const handleUserRank = useCallback(() => {
    if (userId && data) {
      const user = data.entries.find((entry) => entry.userId === userId);
      return user;
    }
    return undefined;
  }, [data, userId]);

  const handleCurrentTournament = useCallback(() => {
    if (tournamentData?.data) {
      return tournamentData.data.find(
        (tournament: ITournamentResponse) => tournament.id === tournamentId
      );
    }
    return undefined;
  }, [tournamentData, tournamentId]);

  // Prepare data for the table
  const initialData = mapper(
    data?.entries || [],
    handleCurrentTournament(),
    handleUserRank()
  );

  return (
    <DarkContainer
      style={style}
      hideGain
      header={
        <div className={styles.header}>
          <ButtonLeft
            size="50px"
            className={styles.backButton}
            onClick={() => navigate(-1)}
          />
          <Paragraph
            fontFamily="Titan-Regular"
            color="#F2AB02"
            fontWeight="bold"
            fontSize="50px"
          >
            {"Leaderboard"}
          </Paragraph>
          <div className={styles.rightHeaderContainer}>
            {handleCurrentTournament()?.statusFlag !== "previous" && (
              <ButtonImage
                img={BuyTicketBtn}
                imgHover={BuyTicketBtnH}
                height="50px"
                aspectRatio="30/11"
                onClick={() => navigate(appPaths.tournaments)}
              />
            )}
            {handleCurrentTournament()?.statusFlag === "now" && (
              <ButtonImage
                img={PlayNowBtn}
                imgHover={PlayNowBtnH}
                height="50px"
                aspectRatio="30/11"
                onClick={() => navigate(appPaths.game)}
              />
            )}
          </div>
        </div>
      }
    >
      <div
        className={styles.wrapper}
        style={{ justifyContent: !isSuccess ? "center" : "flex-start" }}
      >
        {!isSuccess && <Spinner color="rgba(150, 233, 237, 1)" />}
        {tournamentIsSuccess && isSuccess && data.entries.length && (
          <DataTableDetail
            data={initialData}
            columns={columns}
            tournamentData={handleCurrentTournament() as ITournamentResponse}
            showPagination
          />
        )}
      </div>
    </DarkContainer>
  );
};

export default LeaderboardDetail;
