import { FunctionComponent, ReactNode, useState } from "react";
import styles from "./button-text.module.css";
import Paragraph from "../../typography/paragraph";
import ButtonBg from "../../../assets/images/buttons/buttonBgH.svg";
import ButtonBgH from "../../../assets/images/buttons/buttonBg.svg";

interface ButtonTextProps {
  label?: string;
  children?: ReactNode;
  subLabel?: string;
  img?: React.ImgHTMLAttributes<HTMLImageElement>["src"] | string;
  imgHover?: React.ImgHTMLAttributes<HTMLImageElement>["src"] | string;
  imgIcon?: React.ImgHTMLAttributes<HTMLImageElement>["src"] | string;
  className?: string;
  height?: string;
  aspectRatio?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ButtonText: FunctionComponent<ButtonTextProps> = ({
  label,
  subLabel,
  children,
  img,
  imgHover,
  imgIcon,
  className,
  height,
  aspectRatio,
  style,
  onClick,
}) => {
  const [hover, setHover] = useState<boolean>(false);

  const buttonBgImg = new Image();
  buttonBgImg.src = ButtonBg;

  const buttonBgHoverImg = new Image();
  buttonBgHoverImg.src = ButtonBgH;

  const iconImg = new Image();
  if (imgIcon) iconImg.src = imgIcon;

  const imgCover = new Image();
  if (img) imgCover.src = img;

  const imgHoverCover = new Image();
  if (imgHover) imgHoverCover.src = imgHover;

  const handleHover = () => {
    if (hover) {
      if (imgHover) return imgHoverCover.src;
      return buttonBgHoverImg.src;
    }
    if (img) return imgCover.src;
    return buttonBgImg.src;
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      style={{
        height: height || "100%",
        aspectRatio: aspectRatio,
        ...style,
      }}
    >
      <img src={handleHover()} alt="bg" className={styles.imgBg} />
      <div
        className={styles.container}
        style={{ justifyContent: imgIcon ? "flex-end" : "center" }}
      >
        {imgIcon && (
          <img
            src={iconImg.src}
            alt="icon"
            style={{
              width: "60px",
              height: "60px",
              position: "absolute",
              left: "10px",
            }}
          />
        )}

        {label && (
          <Paragraph htmlTag="p" fontSize="18px" color="white">
            {label}
          </Paragraph>
        )}
        {children && children}
        {subLabel && (
          <Paragraph htmlTag="p" fontSize="10px" color="white">
            {subLabel}
          </Paragraph>
        )}
      </div>
    </button>
  );
};

export default ButtonText;
