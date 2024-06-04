import { useNavigate } from "react-router-dom";
import LeaderboardBtn from "@/assets/images/buttons/leaderboard.svg";
import LeaderboardBtnH from "@/assets/images/buttons/leaderboardH.svg";
import ButtonImage from "@/components/buttons/button-image";

const LeaderboardDetailButton = (props: { info: string }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
      }}
    >
      <ButtonImage
        img={LeaderboardBtn}
        imgHover={LeaderboardBtnH}
        height="45px"
        aspectRatio="59/61"
        onClick={() => navigate(`/leaderboard/${props.info}`)}
      />
    </div>
  );
};

export default LeaderboardDetailButton;
