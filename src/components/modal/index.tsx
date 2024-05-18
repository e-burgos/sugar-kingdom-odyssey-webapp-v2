import { ReactNode, useEffect, useRef } from "react";
import styles from "./modal.module.css";

type ModalProps = {
  onClickClose: () => void;
  children: ReactNode;
  className?: string;
};

const Modal = ({ onClickClose, children, className }: ModalProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  return (
    <div className={`${styles.container}`}>
      <div className={styles.background} aria-hidden onClick={onClickClose} />
      <div className={`${className} ${styles.modalContainer}`}>
        {children}
        <div className={styles.button}>X</div>
      </div>
    </div>
  );
};

export default Modal;
