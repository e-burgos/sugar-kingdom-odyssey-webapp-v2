import { FunctionComponent } from "react";
import styles from "./header.module.css";
import BgImage from "../../../assets/images/header/bg.svg";
import Paragraph from "../../typography/paragraph";
import ButtonBalance from "../../buttons/button-balance";
import TextTransition from "../../typography/text-transition";
import { usePageOrchestrator } from "../../../store/usePageOrchestrator";
import ButtonConnect from "../../buttons/button-connect";
import ButtonUser from "../../buttons/button-user";
import { useAuth } from "../../../store/useAuth";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const { userBalance } = useAuth();
  const { setCurrentPage } = usePageOrchestrator();

  return (
    <header className={styles.header}>
      <img src={BgImage} alt="background" className={styles.bgImage} />
      <div className={styles.container}>
        <ButtonUser onClick={() => setCurrentPage("profile")} />

        <div className={styles.labels}>
          <Paragraph htmlTag="h1" color="#0D2759">
            Don’t you want to join? You can:
          </Paragraph>
          <TextTransition />
        </div>
        <div className={styles.buttons}>
          <ButtonBalance
            label={userBalance || "0"}
            height="70px"
            aspectRatio="155/74"
          />
          <ButtonConnect />
        </div>
      </div>
    </header>
  );
};

export default Header;
