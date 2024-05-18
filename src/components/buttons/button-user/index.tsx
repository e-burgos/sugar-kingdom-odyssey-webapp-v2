import { FunctionComponent, useEffect, useState } from "react";
import styles from "./button-user.module.css";
import { useAuth } from "../../../store/useAuth";
import ButtonImg from "../../../assets/images/buttons/largeButtonBg.svg";
import ButtonImgH from "../../../assets/images/buttons/largeButtonBgH.svg";
import Avatar from "../../../assets/images/icons/sugarAvatar.svg";
import Paragraph from "../../typography/paragraph";
import { GetScore } from "../../../api/callbacks/get-score";

interface ButtonUserProps {
  className?: string;
  height?: string;
  aspectRatio?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ButtonUser: FunctionComponent<ButtonUserProps> = ({
  className,
  height,
  aspectRatio,
  style,
  onClick,
}) => {
  const { score, wallet, isAuth, setScore } = useAuth();
  const [hover, setHover] = useState<boolean>(false);

  const buttonBgImg = new Image();
  buttonBgImg.src = ButtonImg;

  const buttonBgHoverImg = new Image();
  buttonBgHoverImg.src = ButtonImgH;

  const iconImg = new Image();
  iconImg.src = Avatar;

  const handleHover = () => {
    if (hover) return buttonBgHoverImg.src;
    return buttonBgImg.src;
  };

  // Initialize score
  const query = GetScore();
  useEffect(() => {
    if (query.isSuccess) {
      setScore(query.data?.score ? query.data.score : 0);
    }
  }, [query.data?.score, query.isSuccess, setScore]);

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      style={{
        height: height || "85%",
        aspectRatio: aspectRatio || "55/21",
        ...style,
      }}
    >
      <img src={handleHover()} alt="bg" className={styles.imgBg} />
      <div className={styles.container}>
        <img src={iconImg.src} alt="icon" className={styles.avatar} />
        <div className={styles.content}>
          {isAuth ? (
            <>
              <Paragraph htmlTag="p" fontSize="16px" color="white">
                {`Score: ${score}`}
              </Paragraph>
              <Paragraph htmlTag="p" fontSize="10px" color="white">
                {wallet?.substring(0, 18) + "..." || ""}
              </Paragraph>
            </>
          ) : (
            <Paragraph htmlTag="p" fontSize="10px" color="white">
              {`Customize your avatar!`}
            </Paragraph>
          )}
        </div>
      </div>
    </button>
  );
};

export default ButtonUser;
