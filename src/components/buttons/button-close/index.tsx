import React from "react";
import ButtonImage from "../button-image";
import Close from "../../../assets/images/buttons/close.svg";
import CloseH from "../../../assets/images/buttons/closeH.svg";

interface ButtonCloseProps {
  onClick?: () => void;
  size?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({
  onClick,
  size,
  className,
  style,
  disabled,
}) => {
  return (
    <ButtonImage
      style={style}
      img={disabled ? CloseH : Close}
      imgHover={CloseH}
      height={size || "60px"}
      aspectRatio="30/30"
      onClick={!disabled ? onClick : () => {}}
      className={className}
    />
  );
};

export default ButtonClose;
