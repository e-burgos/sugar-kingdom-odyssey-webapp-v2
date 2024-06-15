import { useNavigate } from "react-router-dom";
import LeaderboardBtn from "@/assets/images/buttons/leaderboard.svg";
import LeaderboardBtnH from "@/assets/images/buttons/leaderboardH.svg";
import ButtonImage from "@/components/buttons/button-image";
import { ITournamentResponse } from "@/api/endpoints/tournament/types";
import { useTournament } from "@/store/useTournament";
import { FC } from "react";

interface LeaderboardDetailButtonProps {
  data: ITournamentResponse;
  size?: string;
  style?: React.CSSProperties;
}

const LeaderboardDetailButton: FC<LeaderboardDetailButtonProps> = ({
  data,
  size,
  style,
}) => {
  const navigate = useNavigate();
  const { setCurrentTournament } = useTournament();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        ...style,
      }}
    >
      <ButtonImage
        img={LeaderboardBtn}
        imgHover={LeaderboardBtnH}
        height={size || "45px"}
        aspectRatio="59/61"
        onClick={() => {
          setCurrentTournament(data);
          navigate(`/leaderboard/${data.id}`);
        }}
      />
    </div>
  );
};

export default LeaderboardDetailButton;
