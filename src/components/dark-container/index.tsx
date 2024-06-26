import React, { useEffect, useState } from "react";
import styles from "./dark-container.module.css";
import ButtonClose from "@/components/buttons/button-close";
import ButtonImage from "@/components/buttons/button-image";
import GainImg from "@/assets/images/buttons/gain.svg";
import GainHImg from "@/assets/images/buttons/gainH.svg";
import NoAvailable from "@/assets/images/utils/no-available.svg";
import Paragraph from "@/components/typography/paragraph";
import { appPaths } from "@/router/RoutesConfig";
import { useNavigate } from "react-router-dom";
import ButtonConnect from "@/components/buttons/button-connect";
import useHandleChain from "@/hooks/useHandleChain";
import ButtonText from "../buttons/button-text";
import { useAuth } from "@/store/useAuth";

interface DarkContainerProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  label?: string;
  hideGain?: boolean;
  noAvailable?: boolean;
  style?: React.CSSProperties;
  onClose?: () => void;
  goToHomeButton?: boolean;
  isError?: boolean;
}

const DarkContainer: React.FC<DarkContainerProps> = ({
  children,
  label,
  header,
  hideGain,
  noAvailable,
  style,
  onClose,
  goToHomeButton,
  isError,
}) => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [initialize, setInitialize] = useState<boolean>(false);
  const { isBnbNetwork, handleNetworkSwitch } = useHandleChain();

  useEffect(() => {
    if (!initialize) {
      setTimeout(() => {
        setInitialize(true);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={style} className={styles.wrapper}>
      {onClose && (
        <ButtonClose
          style={{ position: "absolute" }}
          onClick={onClose}
          className={styles.closeButton}
        />
      )}
      {goToHomeButton && (
        <ButtonClose
          style={{ position: "absolute" }}
          onClick={() => navigate(appPaths.home)}
          className={styles.closeButton}
        />
      )}
      {isAuth && !isError && label && !header && (
        <div className={styles.label}>
          <Paragraph
            fontFamily="Titan-Regular"
            color="#F2AB02"
            fontWeight="bold"
            fontSize="50px"
          >
            {label}
          </Paragraph>
        </div>
      )}
      {isAuth && !isError && header && !label && header}
      {!hideGain && (
        <ButtonImage
          img={GainImg}
          imgHover={GainHImg}
          height="100px"
          aspectRatio="85/89"
          className={styles.gainButton}
        />
      )}
      {noAvailable && (
        <div className={styles.noAvailable}>
          <ButtonImage
            img={NoAvailable}
            imgHover={NoAvailable}
            height="150px"
            aspectRatio="391/112"
          />
        </div>
      )}
      {!isAuth && (
        <div className={styles.container}>
          <Paragraph color="#F2AB02" fontWeight="bold" fontSize="40px">
            Please connect your wallet
          </Paragraph>
          <ButtonConnect size="90px" />
        </div>
      )}
      {initialize && !isBnbNetwork && (
        <div className={styles.container}>
          <Paragraph color="#F2AB02" fontWeight="bold" fontSize="40px">
            Please switch to BNB Smart Chain
          </Paragraph>
          <ButtonText
            label="Switch Network"
            height="90px"
            aspectRatio="155/74"
            style={{ padding: "0 20px" }}
            onClick={handleNetworkSwitch}
          />
        </div>
      )}
      {isError && (
        <div className={styles.container}>
          <Paragraph color="#F2AB02" fontWeight="bold" fontSize="40px">
            An error occurred, please try again.
          </Paragraph>
          <ButtonText
            label="Go Back"
            height="90px"
            aspectRatio="155/74"
            style={{ padding: "0 20px" }}
            onClick={() => navigate(-1)}
          />
        </div>
      )}
      {isAuth && isBnbNetwork && !isError && children}
    </div>
  );
};

export default DarkContainer;
