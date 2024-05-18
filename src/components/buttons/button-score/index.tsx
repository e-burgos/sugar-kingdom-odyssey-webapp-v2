import React from "react";
import { useXerialWallet } from "../../../hooks/useXerialWallet";
import ButtonText from "../button-text";

interface ButtonScoreProps {}

const ButtonScore: React.FC<ButtonScoreProps> = () => {
  const { wallet, score } = useXerialWallet();

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
