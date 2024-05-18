import telegramDisabled from "../assets/images/social/telegram.svg";
import telegramEnabled from "../assets/images/social/telegramH.svg";
import discordDisabled from "../assets/images/social/discord.svg";
import discordEnabled from "../assets/images/social/discordH.svg";
import twDisabled from "../assets/images/social/x.svg";
import twEnabled from "../assets/images/social/xH.svg";

const tgdImg = new Image();
tgdImg.src = telegramDisabled;
const tgeImg = new Image();
tgeImg.src = telegramEnabled;

const ddImg = new Image();
ddImg.src = discordDisabled;
const deImg = new Image();
deImg.src = discordEnabled;

const tweImg = new Image();
tweImg.src = twEnabled;
const twdImg = new Image();
twdImg.src = twDisabled;

export const socialData = {
  icons: {
    discordDisabled: ddImg.src,
    discordEnabled: deImg.src,
    twDisabled: twdImg.src,
    twEnabled: tweImg.src,
    telegramDisabled: tgdImg.src,
    telegramEnabled: tgeImg.src,
  },
  links: {
    discord: "https://discord.gg/sugar-kingdom",
    telegram: "https://t.me/SugarKingdomOfficialChat",
    twitter: "https://twitter.com/SugarKingdomNFT",
  },
  alt: {
    discord: "discord",
    telegram: "telegram",
    twitter: "twitter",
  },
  list: [
    {
      id: 1,
      icon: {
        disabled: discordDisabled,
        enabled: discordEnabled,
      },
      link: "https://discord.gg/sugar-kingdom",
      alt: "discord",
    },
    {
      id: 2,
      icon: {
        disabled: twDisabled,
        enabled: twEnabled,
      },
      link: "https://twitter.com/SugarKingdomNFT",
      alt: "twitter",
    },
    {
      id: 3,
      icon: {
        disabled: telegramDisabled,
        enabled: telegramEnabled,
      },
      link: "https://t.me/SugarKingdomOfficialChat",
      alt: "telegram",
    },
  ],
};
