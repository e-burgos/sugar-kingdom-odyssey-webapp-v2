import React from "react";
import ButtonText from "../button-text";
import { useAuth } from "@/store/useAuth";

interface ButtonScoreProps {}

const ButtonScore: React.FC<ButtonScoreProps> = () => {
  const { wallet, score } = useAuth();

  return (
    <ButtonText
      label={`Score: ${score}`}
      subLabel={wallet?.substring(0, 12) + "..." || ""}
      height={"70px"}
      aspectRatio="155/74"
      style={{
        padding: "0 20px",
        zIndex: 999,
        position: "absolute",
        top: 20,
        right: 75,
      }}
    />
  );
};

export default ButtonScore;
