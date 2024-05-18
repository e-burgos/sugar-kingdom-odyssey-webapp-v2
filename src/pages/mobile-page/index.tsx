import React from "react";
import styles from "./mobile-page.module.css";
import BgImage from "../../assets/images/mobile/bg.svg";
import HeaderImage from "../../assets/images/mobile/header.svg";
import FooterImage from "../../assets/images/mobile/footer.svg";
import ButtonImage from "../../components/buttons/button-image";
import Title from "../../assets/images/mobile/title.svg";
import Container from "../../assets/images/mobile/container.svg";

import Discord from "../../assets/images/social/discord.svg";
import DiscordH from "../../assets/images/social/discordH.svg";
import Telegram from "../../assets/images/social/telegram.svg";
import TelegramH from "../../assets/images/social/telegramH.svg";
import Twitter from "../../assets/images/social/x.svg";
import TwitterH from "../../assets/images/social/xH.svg";
import Paragraph from "../../components/typography/paragraph";
import { linksData } from "../../data/links";

const bgImg = new Image();
bgImg.src = BgImage;

const headerImg = new Image();
headerImg.src = HeaderImage;

const footerImg = new Image();
footerImg.src = FooterImage;

const titleImg = new Image();
titleImg.src = Title;

const containerImg = new Image();
containerImg.src = Container;

interface MobilePageProps {}

const MobilePage: React.FC<MobilePageProps> = () => {
  return (
    <main
      className={styles.wrapper}
      style={{
        backgroundImage: `url(${bgImg.src})`,
      }}
    >
      <header
        style={{
          backgroundImage: `url(${headerImg.src})`,
        }}
        className={styles.header}
      />

      <img src={titleImg.src} alt="title" className={styles.title} />
      <div
        style={{
          backgroundImage: `url(${containerImg.src})`,
        }}
        className={styles.container}
      >
        <Paragraph color="#ffffff">
          Unfortunately, Sugar Kingdom Odyssey is only accessible via computer.
          While this may limit its convenience for those relying solely on
          mobile devices, it offers the advantage of a more robust and
          feature-rich experience typically associated with desktop platforms.
        </Paragraph>
        <Paragraph color="#ffffff">
          If you can only use mobile devices, please have a little patience, we
          will release soon.
        </Paragraph>
      </div>

      <footer
        style={{
          backgroundImage: `url(${footerImg.src})`,
        }}
        className={styles.footer}
      >
        <ButtonImage
          img={Twitter}
          imgHover={TwitterH}
          width="20vw"
          aspectRatio="41/38"
          goToLink={linksData.twitter}
        />
        <ButtonImage
          img={Telegram}
          imgHover={TelegramH}
          width="20vw"
          aspectRatio="41/38"
          goToLink={linksData.telegram}
        />
        <ButtonImage
          img={Discord}
          imgHover={DiscordH}
          width="20vw"
          aspectRatio="41/38"
          goToLink={linksData.discord}
        />
      </footer>
    </main>
  );
};

export default MobilePage;
