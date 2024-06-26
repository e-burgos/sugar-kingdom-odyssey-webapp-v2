import { FunctionComponent, useState } from "react";
import styles from "./button-image.module.css";
import NoAvailable from "../../../assets/images/utils/no-available.svg";
import { handleLink } from "../../../utils/functions";
import Paragraph, { ParagraphProps } from "../../typography/paragraph";

interface ButtonImageProps {
  img: React.ImgHTMLAttributes<HTMLImageElement>["src"] | string;
  imgHover: React.ImgHTMLAttributes<HTMLImageElement>["src"] | string;
  className?: string;
  label?: string;
  labelColor?: string;
  labelSize?: string;
  labelFont?: ParagraphProps["fontFamily"];
  height?: string;
  width?: string;
  aspectRatio?: string;
  style?: React.CSSProperties;
  goToLink?: string;
  noAvailable?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const ButtonImage: FunctionComponent<ButtonImageProps> = ({
  img,
  imgHover,
  className,
  height,
  width,
  label,
  labelColor,
  labelSize,
  labelFont,
  aspectRatio,
  style,
  goToLink,
  noAvailable,
  disabled,
  onClick,
}) => {
  const [hover, setHover] = useState<boolean>(false);

  const imgCover = new Image();
  if (img) imgCover.src = img;

  const imgHoverCover = new Image();
  if (imgHover) imgHoverCover.src = imgHover;

  const imgNoAvailable = new Image();
  imgNoAvailable.src = NoAvailable;

  const handleClick = () => {
    if (goToLink && !disabled) handleLink(goToLink, "_blank");
    if (onClick && !disabled) onClick();
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      className={`${styles.button} ${className}`}
      style={{
        height: height,
        width: width,
        aspectRatio: aspectRatio,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {hover && noAvailable && (
        <img
          src={imgNoAvailable.src}
          alt="no available"
          className={styles.noAvailable}
        />
      )}
      <img
        src={
          hover
            ? imgHoverCover.src
            : disabled
            ? imgHoverCover.src
            : imgCover.src
        }
        alt="Logo"
        className={styles.buttonImage}
      />
      {label && (
        <Paragraph
          className={styles.label}
          color={labelColor || "white"}
          fontSize={labelSize}
          fontFamily={labelFont}
        >
          {label}
        </Paragraph>
      )}
    </button>
  );
};

export default ButtonImage;
