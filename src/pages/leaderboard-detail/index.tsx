import React from "react";
import { useParams } from "react-router-dom";
import styles from "./leaderboard-detail.module.css";
import DarkContainer from "@/components/dark-container";
import { GetLeaderboardByTournamentId } from "@/api/queries/leaderboard/get-leaderboard-by-tournament-id";
import Paragraph from "@/components/typography/paragraph";
import ButtonLeft from "@/components/buttons/button-left";
import ButtonText from "@/components/buttons/button-text";
import { columns, mapper } from "./datatable/LeaderboardColumns";
import Spinner from "@/components/spinner/Spinner";
import DataTable from "@/components/datatable";

interface LeaderboardDetailProps {
  style?: React.CSSProperties;
}

const LeaderboardDetail: React.FC<LeaderboardDetailProps> = ({ style }) => {
  // Get the tournament ID from the URL
  const params = useParams();
  const tournamentId = params.id as string;

  // Fetch the leaderboard data
  const { data, isSuccess } = GetLeaderboardByTournamentId(tournamentId);

  // Prepare data for the table
  const initialData = mapper(data?.entries || []);

  return (
    <DarkContainer
      style={style}
      hideGain
      header={
        <div className={styles.header}>
          <ButtonLeft className={styles.backButton} />
          <Paragraph
            fontFamily="Titan-Regular"
            color="#F2AB02"
            fontWeight="bold"
            fontSize="50px"
          >
            {"Leaderboard"}
          </Paragraph>
          <div className={styles.rightHeaderContainer}>
            <ButtonText height="60px" label="Buy Ticket" />
            <ButtonText height="60px" label="Play Now!" />
          </div>
        </div>
      }
    >
      <div className={styles.wrapper}>
        {!isSuccess && <Spinner color="rgba(150, 233, 237, 1)" />}
        {isSuccess && data.entries.length && (
          <DataTable data={initialData} columns={columns} showPagination />
        )}
      </div>
    </DarkContainer>
  );
};

export default LeaderboardDetail;
