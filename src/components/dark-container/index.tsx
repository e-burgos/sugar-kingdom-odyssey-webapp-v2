import React from "react";
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

interface DarkContainerProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  label?: string;
  hideGain?: boolean;
  noAvailable?: boolean;
  style?: React.CSSProperties;
  onClose?: () => void;
  goToHomeButton?: boolean;
  connectWallet?: boolean;
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
  connectWallet,
}) => {
  const navigate = useNavigate();
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
      {label && !header && (
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
      {header && !label && header}
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
      {connectWallet && (
        <div className={styles.container}>
          <Paragraph color="#F2AB02" fontWeight="bold" fontSize="40px">
            Please connect your wallet
          </Paragraph>
          <ButtonConnect size="90px" />
        </div>
      )}
      {children}
    </div>
  );
};

export default DarkContainer;
