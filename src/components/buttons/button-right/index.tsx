import React from "react";
import ButtonImage from "../button-image";
import Left from "@/assets/images/buttons/leftButton.svg";
import LeftH from "@/assets/images/buttons/leftButtonH.svg";

interface ButtonRightProps {
  onClick?: () => void;
  size?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const ButtonRight: React.FC<ButtonRightProps> = ({
  onClick,
  size,
  className,
  style,
  disabled,
}) => {
  return (
    <ButtonImage
      style={{
        transform: "rotate(180deg)",
        ...style,
      }}
      img={disabled ? LeftH : Left}
      imgHover={LeftH}
      height={size || "60px"}
      aspectRatio="30/30"
      onClick={!disabled ? onClick : () => {}}
      className={className}
    />
  );
};

export default ButtonRight;
