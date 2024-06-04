import { FunctionComponent } from "react";
import styles from "./menu-bar.module.css";
import BgImage from "../../../assets/images/menu/menuBg.svg";
import Logo from "../../../assets/images/menu/logo.svg";

import HomeButton from "../../../assets/images/menu/homeButton.svg";
import HomeButtonH from "../../../assets/images/menu/homeButtonH.svg";

import PlayButton from "../../../assets/images/menu/playButton.svg";
import PlayButtonH from "../../../assets/images/menu/playButtonH.svg";

import LeadButton from "../../../assets/images/menu/leaderboardButton.svg";
import LeadButtonH from "../../../assets/images/menu/leaderboardButtonH.svg";

import StakeButton from "../../../assets/images/menu/stakeButton.svg";
import StakeButtonH from "../../../assets/images/menu/stakeButtonH.svg";

import TryGameButton from "../../../assets/images/menu/tryGameButton.svg";
import TryGameButtonH from "../../../assets/images/menu/tryGameButtonH.svg";

import BuyButton from "../../../assets/images/menu/buyButton.svg";
import BuyButtonH from "../../../assets/images/menu/buyButtonH.svg";

import FaqButton from "../../../assets/images/menu/faqButton.svg";
import FaqButtonH from "../../../assets/images/menu/faqButtonH.svg";

import Discord from "../../../assets/images/social/discord.svg";
import DiscordH from "../../../assets/images/social/discordH.svg";

import Telegram from "../../../assets/images/social/telegram.svg";
import TelegramH from "../../../assets/images/social/telegramH.svg";

import Twitter from "../../../assets/images/social/x.svg";
import TwitterH from "../../../assets/images/social/xH.svg";

import ButtonImage from "../../buttons/button-image";
import { linksData } from "../../../data/links";
import { useNavigate, useLocation } from "react-router-dom";
import { appPaths } from "../../../router/RoutesConfig";

interface MenuBarProps {
  className?: string;
}

const MenuBar: FunctionComponent<MenuBarProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={`${styles.menuBar} ${className}`}
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      <div className={styles.container}>
        <ButtonImage
          img={Logo}
          imgHover={Logo}
          height="13vh"
          aspectRatio="62/39"
          onClick={() => navigate(appPaths.home)}
        />
        <ButtonImage
          img={location.pathname === appPaths.home ? HomeButtonH : HomeButton}
          imgHover={HomeButtonH}
          height="11vh"
          aspectRatio="115/52"
          onClick={() => navigate(appPaths.home)}
        />
        <div className={styles.actions}>
          <ButtonImage
            img={location.pathname === appPaths.game ? PlayButtonH : PlayButton}
            imgHover={PlayButtonH}
            height="6.5vh"
            aspectRatio="271/74"
            onClick={() => navigate(appPaths.game)}
          />
          <ButtonImage
            img={
              location.pathname === appPaths.leaderboard
                ? LeadButtonH
                : LeadButton
            }
            imgHover={LeadButtonH}
            height="6.5vh"
            aspectRatio="271/74"
            onClick={() => navigate(appPaths.leaderboard)}
          />
          <ButtonImage
            img={
              location.pathname === appPaths.staking
                ? StakeButtonH
                : StakeButton
            }
            imgHover={StakeButtonH}
            height="6.5vh"
            aspectRatio="271/74"
            goToLink={linksData.stake}
          />
        </div>
        <div className={styles.separator} />
        <div className={styles.profile}>
          <ButtonImage
            img={
              location.pathname === appPaths.tryGame
                ? TryGameButtonH
                : TryGameButton
            }
            imgHover={TryGameButtonH}
            height="6.5vh"
            aspectRatio="271/74"
            onClick={() => navigate(appPaths.tryGame)}
          />
          <ButtonImage
            img={
              location.pathname === appPaths.buySugar ? BuyButtonH : BuyButton
            }
            imgHover={BuyButtonH}
            height="6.5vh"
            aspectRatio="271/74"
            onClick={() => navigate(appPaths.buySugar)}
          />
          <ButtonImage
            img={FaqButton}
            imgHover={FaqButtonH}
            height="6.5vh"
            aspectRatio="271/74"
            goToLink={linksData.faq}
          />
        </div>
        <div className={styles.social}>
          <ButtonImage
            img={Twitter}
            imgHover={TwitterH}
            height="7vh"
            aspectRatio="41/38"
            goToLink={linksData.twitter}
          />
          <ButtonImage
            img={Telegram}
            imgHover={TelegramH}
            height="7vh"
            aspectRatio="41/38"
            goToLink={linksData.telegram}
          />
          <ButtonImage
            img={Discord}
            imgHover={DiscordH}
            height="7vh"
            aspectRatio="41/38"
            goToLink={linksData.discord}
          />
        </div>
        {/* <div className={styles.price}>
          <Paragraph fontSize="2.4vh" fontFamily="Gotham-Medium" color="#fff">
            SUGAR Price $3,14
          </Paragraph>
        </div> */}
      </div>
    </aside>
  );
};

export default MenuBar;
