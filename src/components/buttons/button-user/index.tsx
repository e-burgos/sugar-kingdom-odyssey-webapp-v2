import { FunctionComponent, useEffect, useState } from "react";
import styles from "./button-user.module.css";
import { useAuth } from "@/store/useAuth";
import { GetUserById } from "@/api/queries/user/get-user-by-id";

// Assets
import ButtonImg from "@/assets/images/buttons/largeButtonBg.svg";
import ButtonImgH from "@/assets/images/buttons/largeButtonBgH.svg";
import Avatar from "@/assets/images/profile/emptyAvatar.svg";
import Paragraph from "@/components/typography/paragraph";

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
  const { userId, wallet, userName, setWallet, setUserName } = useAuth();
  const [hover, setHover] = useState<boolean>(false);

  const buttonBgImg = new Image();
  buttonBgImg.src = ButtonImg;

  const buttonBgHoverImg = new Image();
  buttonBgHoverImg.src = ButtonImgH;

  const iconImg = new Image();
  iconImg.src = Avatar;

  const handleHover = () => {
    if (hover) return buttonBgImg.src;
    return buttonBgHoverImg.src;
  };

  // Initialize score
  const getUser = GetUserById();

  useEffect(() => {
    if (getUser.isSuccess) {
      setWallet(getUser.data?.wallet);
      setUserName(getUser.data?.userName);
    }
  }, [
    getUser.data?.wallet,
    getUser.data?.userName,
    getUser?.isSuccess,
    setWallet,
    setUserName,
  ]);

  return (
    <>
      {userId && (
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
              {userId ? (
                <>
                  <Paragraph htmlTag="p" fontSize="16px" color="white">
                    {`${
                      userName?.substring(0, 11) +
                        `${userName && userName?.length > 10 ? "..." : ""}` ||
                      ""
                    }`}
                  </Paragraph>
                  <Paragraph htmlTag="p" fontSize="10px" color="white">
                    {wallet?.substring(0, 18) +
                      `${wallet && wallet?.length > 17 ? "..." : ""}` || ""}
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
      )}
    </>
  );
};

export default ButtonUser;
