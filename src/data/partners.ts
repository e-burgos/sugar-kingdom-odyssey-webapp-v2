import partner01 from "../assets/images/partners/color/1.png";
import partner02 from "../assets/images/partners/color/2.png";
import partner03 from "../assets/images/partners/color/3.png";
import partner04 from "../assets/images/partners/color/4.png";
import partner05 from "../assets/images/partners/color/5.png";
import partner06 from "../assets/images/partners/color/6.png";
import partner07 from "../assets/images/partners/color/7.png";
import partner08 from "../assets/images/partners/color/8.png";
import partner09 from "../assets/images/partners/color/9.png";
import partner10 from "../assets/images/partners/color/10.png";
import partner11 from "../assets/images/partners/color/11.png";
import partner12 from "../assets/images/partners/color/12.png";
import partner13 from "../assets/images/partners/color/13.png";
import partner14 from "../assets/images/partners/color/14.png";
import partner15 from "../assets/images/partners/color/15.png";
import partner16 from "../assets/images/partners/color/16.png";
import partner17 from "../assets/images/partners/color/17.png";
import partner18 from "../assets/images/partners/color/18.png";
import partner19 from "../assets/images/partners/color/19.png";
import partner20 from "../assets/images/partners/color/20.png";
import partner21 from "../assets/images/partners/color/21.png";
import partner22 from "../assets/images/partners/color/22.png";
import partner23 from "../assets/images/partners/color/23.png";
import partner24 from "../assets/images/partners/color/24.png";
import partner25 from "../assets/images/partners/color/25.png";
import partner26 from "../assets/images/partners/color/26.png";
import partner27 from "../assets/images/partners/color/27.png";
import partner28 from "../assets/images/partners/color/28.png";
import partner29 from "../assets/images/partners/color/29.png";
import partner30 from "../assets/images/partners/color/30.png";
import partner31 from "../assets/images/partners/color/31.png";
import partner32 from "../assets/images/partners/color/32.png";
import partner33 from "../assets/images/partners/color/33.png";
import partner34 from "../assets/images/partners/color/34.png";
import partner35 from "../assets/images/partners/color/35.png";
import partner36 from "../assets/images/partners/color/36.png";
import partner37 from "../assets/images/partners/color/37.png";
import partner38 from "../assets/images/partners/color/38.png";
import partner39 from "../assets/images/partners/color/39.png";
import partner40 from "../assets/images/partners/color/40.png";
import partner41 from "../assets/images/partners/color/41.png";
import partner42 from "../assets/images/partners/color/42.png";
import partner43 from "../assets/images/partners/color/43.png";
import partner44 from "../assets/images/partners/color/44.png";
import partner45 from "../assets/images/partners/color/45.png";

// Docs: https://docs.google.com/spreadsheets/d/1ZTjlyfox8YIAw8W8ebdX2mQwd8ew12WSj0RISGIz178/edit#gid=0

const partner01Img = new Image();
partner01Img.src = partner01;
const partner02Img = new Image();
partner02Img.src = partner02;
const partner03Img = new Image();
partner03Img.src = partner03;
const partner04Img = new Image();
partner04Img.src = partner04;
const partner05Img = new Image();
partner05Img.src = partner05;
const partner06Img = new Image();
partner06Img.src = partner06;
const partner07Img = new Image();
partner07Img.src = partner07;
const partner08Img = new Image();
partner08Img.src = partner08;
const partner09Img = new Image();
partner09Img.src = partner09;
const partner10Img = new Image();
partner10Img.src = partner10;
const partner11Img = new Image();
partner11Img.src = partner11;
const partner12Img = new Image();
partner12Img.src = partner12;
const partner13Img = new Image();
partner13Img.src = partner13;
const partner14Img = new Image();
partner14Img.src = partner14;
const partner15Img = new Image();
partner15Img.src = partner15;
const partner16Img = new Image();
partner16Img.src = partner16;
const partner17Img = new Image();
partner17Img.src = partner17;
const partner18Img = new Image();
partner18Img.src = partner18;
const partner19Img = new Image();
partner19Img.src = partner19;
const partner20Img = new Image();
partner20Img.src = partner20;
const partner21Img = new Image();
partner21Img.src = partner21;
const partner22Img = new Image();
partner22Img.src = partner22;
const partner23Img = new Image();
partner23Img.src = partner23;
const partner24Img = new Image();
partner24Img.src = partner24;
const partner25Img = new Image();
partner25Img.src = partner25;
const partner26Img = new Image();
partner26Img.src = partner26;
const partner27Img = new Image();
partner27Img.src = partner27;
const partner28Img = new Image();
partner28Img.src = partner28;
const partner29Img = new Image();
partner29Img.src = partner29;
const partner30Img = new Image();
partner30Img.src = partner30;
const partner31Img = new Image();
partner31Img.src = partner31;
const partner32Img = new Image();
partner32Img.src = partner32;
const partner33Img = new Image();
partner33Img.src = partner33;
const partner34Img = new Image();
partner34Img.src = partner34;
const partner35Img = new Image();
partner35Img.src = partner35;
const partner36Img = new Image();
partner36Img.src = partner36;
const partner37Img = new Image();
partner37Img.src = partner37;
const partner38Img = new Image();
partner38Img.src = partner38;
const partner39Img = new Image();
partner39Img.src = partner39;
const partner40Img = new Image();
partner40Img.src = partner40;
const partner41Img = new Image();
partner41Img.src = partner41;
const partner42Img = new Image();
partner42Img.src = partner42;
const partner43Img = new Image();
partner43Img.src = partner43;
const partner44Img = new Image();
partner44Img.src = partner44;
const partner45Img = new Image();
partner45Img.src = partner45;

export interface Logo {
  srcGray: string;
  srcColor: string;
  url: string;
  name: string;
  order: number;
}
export interface SectionPartners {
  name: string;
  logos: Logo[];
}

export const partnersData: SectionPartners = {
  name: "Partners",
  logos: [
    {
      srcGray: partner01Img.src,
      srcColor: partner01Img.src,
      name: "7o'clock Capital",
      url: "https://www.7oclockcapital.com/",
      order: 1,
    },
    // {
    //   srcGray: partner02Img.src,
    //   srcColor: partner02Img.src,
    //   name: 'AcknoLedger',
    //   url: 'https://acknoledger.com/',
    //   order: 2,
    // },
    {
      srcGray: partner03Img.src,
      srcColor: partner03Img.src,
      name: "Alpha Hunt",
      url: "https://linktr.ee/alphahunt",
      order: 3,
    },
    {
      srcGray: partner04Img.src,
      srcColor: partner04Img.src,
      name: "Alpha Ventures",
      url: "https://www.alphaventure.xyz/",
      order: 4,
    },
    {
      srcGray: partner05Img.src,
      srcColor: partner05Img.src,
      name: "Aza Ventures",
      url: "https://aza.ventures/",
      order: 5,
    },
    {
      srcGray: partner06Img.src,
      srcColor: partner06Img.src,
      name: "Babylon",
      url: "https://babylons.io/",
      order: 6,
    },
    {
      srcGray: partner07Img.src,
      srcColor: partner07Img.src,
      name: "BinStarter",
      url: "https://binstarter.io/",
      order: 7,
    },
    {
      srcGray: partner08Img.src,
      srcColor: partner08Img.src,
      name: "Blue Wheel Capital",
      url: "https://www.bluewheelcapital.com/",
      order: 8,
    },
    {
      srcGray: partner09Img.src,
      srcColor: partner09Img.src,
      name: "Brotherhood Ventures",
      url: "https://brotherhood.ventures/",
      order: 9,
    },
    {
      srcGray: partner10Img.src,
      srcColor: partner10Img.src,
      name: "BTAF",
      url: "https://btaftoken.io/",
      order: 10,
    },
    // {
    //   srcGray: partner11Img.src,
    //   srcColor: partner11Img.src,
    //   name: 'CoinGecko',
    //   url: 'https://www.coingecko.com/',
    //   order: 11,
    // },
    // {
    //   srcGray: partner12Img.src,
    //   srcColor: partner12Img.src,
    //   name: 'CoinMarketcap',
    //   url: 'https://coinmarketcap.com/',
    //   order: 12,
    // },
    // {
    //   srcGray: partner13Img.src,
    //   srcColor: partner13Img.src,
    //   name: 'CryptoBlades',
    //   url: 'https://www.cryptoblades.io/',
    //   order: 13,
    // },
    {
      srcGray: partner14Img.src,
      srcColor: partner14Img.src,
      name: "CryptoFomo",
      url: "https://www.youtube.com/c/CryptoFOMO/videos",
      order: 14,
    },
    {
      srcGray: partner15Img.src,
      srcColor: partner15Img.src,
      name: "Cryptopia",
      url: "https://cryptopia-group.com/",
      order: 15,
    },
    {
      srcGray: partner16Img.src,
      srcColor: partner16Img.src,
      name: "DaoLaunch",
      url: "https://daolaunch.net/",
      order: 16,
    },
    // {
    //   srcGray: partner17Img.src,
    //   srcColor: partner17Img.src,
    //   name: 'DuckDao',
    //   url: 'https://duckdao.io/',
    //   order: 17,
    // },
    {
      srcGray: partner18Img.src,
      srcColor: partner18Img.src,
      name: "Dutch Crypto Investors",
      url: "https://dutchcryptoinvestors.com/",
      order: 18,
    },
    {
      srcGray: partner19Img.src,
      srcColor: partner19Img.src,
      name: "Empire VC",
      url: "https://www.empire-vc.com/",
      order: 19,
    },
    {
      srcGray: partner20Img.src,
      srcColor: partner20Img.src,
      name: "GameFi Capital",
      url: "https://gamefi.org/",
      order: 20,
    },
    {
      srcGray: partner21Img.src,
      srcColor: partner21Img.src,
      name: "GameStatiOn",
      url: "https://linktr.ee/gamestationio",
      order: 21,
    },
    {
      srcGray: partner22Img.src,
      srcColor: partner22Img.src,
      name: "GemPad",
      url: "https://gempad.app/home",
      order: 22,
    },
    {
      srcGray: partner23Img.src,
      srcColor: partner23Img.src,
      name: "Metavest Capital",
      url: "https://metavest.capital/",
      order: 23,
    },
    {
      srcGray: partner24Img.src,
      srcColor: partner24Img.src,
      name: "AVG",
      url: "https://twitter.com/AutoVentureGr",
      order: 24,
    },
    {
      srcGray: partner25Img.src,
      srcColor: partner25Img.src,
      name: "Halvins Capital",
      url: "http://halvingscapital.com/",
      order: 25,
    },
    {
      srcGray: partner26Img.src,
      srcColor: partner26Img.src,
      name: "Ixir Launchpad",
      url: "https://www.ixirpad.com/",
      order: 26,
    },
    {
      srcGray: partner27Img.src,
      srcColor: partner27Img.src,
      name: "KoiStarter",
      url: "https://www.koistarter.io/",
      order: 27,
    },
    {
      srcGray: partner28Img.src,
      srcColor: partner28Img.src,
      name: "Kommunitas",
      url: "https://kommunitas.net/",
      order: 28,
    },
    {
      srcGray: partner29Img.src,
      srcColor: partner29Img.src,
      name: "Legion Ventures",
      url: "https://legion.ventures/",
      order: 29,
    },
    {
      srcGray: partner30Img.src,
      srcColor: partner30Img.src,
      name: "Moonstarter",
      url: "https://moonstarter.net/",
      order: 30,
    },
    {
      srcGray: partner31Img.src,
      srcColor: partner31Img.src,
      name: "Prostarter",
      url: "https://prostarter.io/",
      order: 31,
    },
    {
      srcGray: partner32Img.src,
      srcColor: partner32Img.src,
      name: "SafeLaunch",
      url: "https://safelaunch.io/",
      order: 32,
    },
    {
      srcGray: partner33Img.src,
      srcColor: partner33Img.src,
      name: "Scotty Beam",
      url: "https://scottybeam.io/",
      order: 33,
    },
    {
      srcGray: partner34Img.src,
      srcColor: partner34Img.src,
      name: "Source Hat",
      url: "https://sourcehat.com/",
      order: 34,
    },
    {
      srcGray: partner35Img.src,
      srcColor: partner35Img.src,
      name: "Spintop",
      url: "https://spintop.network/",
      order: 35,
    },
    {
      srcGray: partner36Img.src,
      srcColor: partner36Img.src,
      name: "Synapse Network",
      url: "https://synapse.network/",
      order: 36,
    },
    {
      srcGray: partner37Img.src,
      srcColor: partner37Img.src,
      name: "TGDAO",
      url: "https://tgdao.io/",
      order: 37,
    },
    {
      srcGray: partner38Img.src,
      srcColor: partner38Img.src,
      name: "TrustFi",
      url: "https://www.trustfi.org/",
      order: 38,
    },
    {
      srcGray: partner39Img.src,
      srcColor: partner39Img.src,
      name: "UnReal Capital",
      url: "https://sc.linkedin.com/company/unreal-capital-vc",
      order: 39,
    },
    {
      srcGray: partner40Img.src,
      srcColor: partner40Img.src,
      name: "Yasar Corporation",
      url: "https://www.yasarcorp.com/",
      order: 40,
    },
    {
      srcGray: partner41Img.src,
      srcColor: partner41Img.src,
      name: "ZBS Capital",
      url: "https://www.zbs.capital/",
      order: 41,
    },
    {
      srcGray: partner42Img.src,
      srcColor: partner42Img.src,
      name: "Zephyrus Capital",
      url: "https://zephyruscapital.com/",
      order: 42,
    },
    {
      srcGray: partner43Img.src,
      srcColor: partner43Img.src,
      name: "DeChat",
      url: "https://www.dechat.io/",
      order: 43,
    },
    {
      srcGray: partner44Img.src,
      srcColor: partner44Img.src,
      name: "UniLend",
      url: "https://unilend.finance/",
      order: 44,
    },
    {
      srcGray: partner45Img.src,
      srcColor: partner45Img.src,
      name: "Hela Network",
      url: "https://helalabs.com/",
      order: 45,
    },
  ],
};
