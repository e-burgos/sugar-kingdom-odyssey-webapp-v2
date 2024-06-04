import React from "react";
import ButtonImage from "../button-image";
import Left from "../../../assets/images/buttons/leftButton.svg";
import LeftH from "../../../assets/images/buttons/leftButtonH.svg";

interface ButtonLeftProps {
  onClick?: () => void;
  size?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const ButtonLeft: React.FC<ButtonLeftProps> = ({
  onClick,
  size,
  className,
  style,
  disabled,
}) => {
  return (
    <ButtonImage
      style={style}
      img={disabled ? LeftH : Left}
      imgHover={LeftH}
      height={size || "60px"}
      aspectRatio="30/30"
      onClick={!disabled ? onClick : () => {}}
      className={className}
    />
  );
};

export default ButtonLeft;
