import { FunctionComponent, useState } from "react";
import styles from "./button.module.css";
import ButtonBg from "@/assets/images/buttons/buttonBg.svg";
import ButtonBgH from "@/assets/images/buttons/buttonBgH.svg";
import imgIcon from "@/assets/images/icons/token.webp";
import Paragraph from "@/components/typography/paragraph";

interface ButtonBalanceProps {
  label: string;
  img?: React.ImgHTMLAttributes<HTMLImageElement>["src"] | string;
  imgHover?: React.ImgHTMLAttributes<HTMLImageElement>["src"] | string;
  className?: string;
  height?: string;
  aspectRatio?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ButtonBalance: FunctionComponent<ButtonBalanceProps> = ({
  label,
  img,
  imgHover,
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
      if (imgHover) return imgCover.src;
      return buttonBgImg.src;
    }
    if (img) return imgHoverCover.src;
    return buttonBgHoverImg.src;
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
      <div className={styles.container}>
        <img
          src={iconImg.src}
          alt="icon"
          style={{
            width: "33px",
            height: "33px",
          }}
        />
        <Paragraph htmlTag="p" fontSize="18px" color="white">
          {label}
        </Paragraph>
      </div>
    </button>
  );
};

export default ButtonBalance;
