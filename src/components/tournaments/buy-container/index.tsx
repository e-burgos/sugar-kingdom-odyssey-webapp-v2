import React, { useState } from "react";
import styles from "./buy-container.module.css";
import BlueContainer from "@/assets/images/tournaments/blue.svg";
import OrangeContainer from "@/assets/images/tournaments/orange.svg";
import CyanContainer from "@/assets/images/tournaments/cyan.svg";

import PlayButton from "@/assets/images/tournaments/playButton.svg";
import PlayButtonH from "@/assets/images/tournaments/playButtonH.svg";

import CyanBoardButton from "@/assets/images/tournaments/cyanBoardButton.svg";
import BlueBoardButton from "@/assets/images/tournaments/blueBoardButton.svg";
import OrangeBoardButton from "@/assets/images/tournaments/orangeBoardButton.svg";

import CyanButton from "@/assets/images/tournaments/cyanButton.svg";
import OrangeButton from "@/assets/images/tournaments/orangeButton.svg";
import BlueButton from "@/assets/images/tournaments/blueButton.svg";
import BlueTokens from "@/assets/images/tournaments/blueTokens.svg";

import BlueCharacter from "@/assets/images/tournaments/blueCharacter.svg";
import OrangeCharacter from "@/assets/images/tournaments/orangeCharacter.svg";
import CyanCharacter from "@/assets/images/tournaments/cyanCharacter.svg";

import X1 from "@/assets/images/tournaments/x1.svg";
import BlueTooltipTokens from "@/assets/images/tournaments/blueTooltipTokens.svg";
import OrangeTooltipTokens from "@/assets/images/tournaments/orangeTooltipTokens.svg";
import CyanTooltipTokens from "@/assets/images/tournaments/cyanTooltipTokens.svg";

import OrangePlus from "@/assets/images/icons/orangePlus.svg";
import GreenPlus from "@/assets/images/icons/greenPlus.svg";
import PinkPlus from "@/assets/images/icons/pinkPlus.svg";

import ButtonImage from "@/components/buttons/button-image";
import Paragraph from "@/components/typography/paragraph";

const BlueContainerImg = new Image();
BlueContainerImg.src = BlueContainer;

const OrangeContainerImg = new Image();
OrangeContainerImg.src = OrangeContainer;

const CyanContainerImg = new Image();
CyanContainerImg.src = CyanContainer;

interface BuyContainerProps {
  color: "blue" | "orange" | "cyan";
  title?: string;
  price?: string;
  timeLeft?: string;
  x1Button?: boolean;
  onBuyClick?: () => void;
}

const BuyContainer: React.FC<BuyContainerProps> = ({
  color,
  title,
  price,
  timeLeft,
  x1Button,
  onBuyClick,
}) => {
  const [hoverTooltip, setHoverTooltip] = useState<boolean>(false);
  return (
    <div className={styles.wrapper}>
      <ButtonImage
        className={styles.playButton}
        img={PlayButton}
        imgHover={PlayButtonH}
        width="50%"
        aspectRatio="113/26"
        label="PLAY"
        labelSize="18px"
      />
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${
            color === "blue"
              ? BlueContainerImg.src
              : color === "orange"
              ? OrangeContainerImg.src
              : CyanContainerImg.src
          })`,
        }}
      >
        {x1Button && (
          <ButtonImage
            className={styles.x1Button}
            img={X1}
            imgHover={X1}
            height="5vh"
            aspectRatio="251/116"
          />
        )}
        <div className={styles.content}>
          <div className={styles.title}>
            {title && (
              <Paragraph color="white" fontSize="20px">
                {title}
              </Paragraph>
            )}
            <div className={styles.tokens}>
              <ButtonImage
                img={BlueTokens}
                imgHover={BlueTokens}
                aspectRatio="316/49"
                height="3vh"
              />
              <div
                className={styles.plusButton}
                onMouseEnter={() => setHoverTooltip(true)}
              >
                <ButtonImage
                  img={
                    color === "blue"
                      ? PinkPlus
                      : color === "orange"
                      ? OrangePlus
                      : GreenPlus
                  }
                  imgHover={
                    color === "blue"
                      ? PinkPlus
                      : color === "orange"
                      ? OrangePlus
                      : GreenPlus
                  }
                  aspectRatio="40/40"
                  height="2.5vh"
                />
              </div>
              {hoverTooltip && (
                <div
                  className={styles.tooltip}
                  onMouseLeave={() => setHoverTooltip(false)}
                >
                  <ButtonImage
                    img={
                      color === "blue"
                        ? BlueTooltipTokens
                        : color === "orange"
                        ? OrangeTooltipTokens
                        : CyanTooltipTokens
                    }
                    imgHover={
                      color === "blue"
                        ? BlueTooltipTokens
                        : color === "orange"
                        ? OrangeTooltipTokens
                        : CyanTooltipTokens
                    }
                    aspectRatio="193/113"
                    height={"22vh"}
                  />
                </div>
              )}
            </div>
          </div>

          <ButtonImage
            img={
              color === "blue"
                ? BlueCharacter
                : color === "orange"
                ? OrangeCharacter
                : CyanCharacter
            }
            imgHover={
              color === "blue"
                ? BlueCharacter
                : color === "orange"
                ? OrangeCharacter
                : CyanCharacter
            }
            aspectRatio={
              color === "blue"
                ? "1/1"
                : color === "orange"
                ? "252/167"
                : "162/173"
            }
            height="13vh"
          />

          <div className={styles.title}>
            <Paragraph color="white" fontSize="20px">
              {`Prize Pool: ${price}`}
            </Paragraph>
            <Paragraph color="white" fontSize="20px">
              {`Time Left: ${timeLeft}`}
            </Paragraph>
          </div>

          <ButtonImage
            img={
              color === "blue"
                ? BlueBoardButton
                : color === "orange"
                ? OrangeBoardButton
                : CyanBoardButton
            }
            imgHover={
              color === "blue"
                ? BlueBoardButton
                : color === "orange"
                ? OrangeBoardButton
                : CyanBoardButton
            }
            aspectRatio="229/39"
            height="30px"
            label="Leaderboard"
          />
        </div>
      </div>
      <ButtonImage
        className={styles.buyButton}
        img={
          color === "cyan"
            ? CyanButton
            : color === "orange"
            ? OrangeButton
            : BlueButton
        }
        imgHover={
          color === "cyan"
            ? CyanButton
            : color === "orange"
            ? OrangeButton
            : BlueButton
        }
        width="60%"
        aspectRatio="251/116"
        label="Buy Ticket"
        labelSize="18px"
        labelColor={
          color === "cyan"
            ? "#0F565D"
            : color === "orange"
            ? "#7D1500"
            : "#002762"
        }
        onClick={onBuyClick}
      />
    </div>
  );
};

export default BuyContainer;
