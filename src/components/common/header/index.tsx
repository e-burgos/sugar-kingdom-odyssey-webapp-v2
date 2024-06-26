import { FunctionComponent } from "react";
import styles from "./header.module.css";
import BgImage from "@/assets/images/header/bg.svg";
import Paragraph from "@/components/typography/paragraph";
import ButtonBalance from "@/components/buttons/button-balance";
import TextTransition from "@/components/typography/text-transition";
import ButtonConnect from "@/components/buttons/button-connect";
import ButtonUser from "@/components/buttons/button-user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/useAuth";
import { appPaths } from "@/router/RoutesConfig";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const { userBalance } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <img src={BgImage} alt="background" className={styles.bgImage} />
      <div className={styles.container}>
        <ButtonUser onClick={() => navigate(appPaths.profile)} />

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
