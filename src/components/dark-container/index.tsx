import React from "react";
import styles from "./dark-container.module.css";
import ButtonClose from "../buttons/button-close";
import ButtonImage from "../buttons/button-image";
import GainImg from "../../assets/images/buttons/gain.svg";
import GainHImg from "../../assets/images/buttons/gainH.svg";
import NoAvailable from "../../assets/images/utils/no-available.svg";
import { usePageOrchestrator } from "../../store/usePageOrchestrator";
import Paragraph from "../typography/paragraph";

interface DarkContainerProps {
  children?: React.ReactNode;
  label?: string;
  hideGain?: boolean;
  noAvailable?: boolean;
  style?: React.CSSProperties;
  onClose?: () => void;
}

const DarkContainer: React.FC<DarkContainerProps> = ({
  children,
  label,
  hideGain,
  noAvailable,
  style,
  onClose,
}) => {
  const { setCurrentPage } = usePageOrchestrator();
  return (
    <div className={styles.wrapper} style={style}>
      <ButtonClose
        onClick={onClose ? onClose : () => setCurrentPage("home")}
        className={styles.closeButton}
      />
      {label && (
        <div className={styles.label}>
          <Paragraph color="#F2AB02" fontWeight="bold" fontSize="50px">
            {label.toLocaleUpperCase()}
          </Paragraph>
        </div>
      )}
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
      {children}
    </div>
  );
};

export default DarkContainer;
