import React, { useState } from "react";
import styles from "./token-list.module.css";
import ButtonImage from "@/components/buttons/button-image";
import { ITournamentPrice } from "@/api/endpoints/tournament/types";

import EmptyToken from "@/assets/images/tokens/emptyToken.svg";
import CyanTooltipTokens from "@/assets/images/tournaments/cyanTooltipTokens.svg";

import GreenPlus from "@/assets/images/icons/greenPlus.svg";

interface TokenListProps {
  tokens: ITournamentPrice[];
  hidePlusButton?: boolean;
  setToken?: React.Dispatch<React.SetStateAction<ITournamentPrice | null>>;
}

const TokenList: React.FC<TokenListProps> = ({
  tokens,
  hidePlusButton,
  setToken,
}) => {
  const [hoverTooltip, setHoverTooltip] = useState<boolean>(false);

  const handleTokenList = () => {
    if (tokens.length >= 7) {
      return { tokens: tokens.slice(0, 7), emptyTokens: [] };
    }
    if (tokens.length < 7) {
      return {
        tokens: tokens,
        emptyTokens: Array.from({ length: 7 - tokens.length }, (_v, i) => i),
      };
    }
  };

  return (
    <div className={styles.tokens}>
      {tokens && (
        <div className={styles.tokenList}>
          {handleTokenList()?.emptyTokens.map((_token, index) => (
            <ButtonImage
              key={index}
              className={styles.emptyToken}
              img={EmptyToken}
              imgHover={EmptyToken}
              aspectRatio="1/1"
              height="25px"
              width="25px"
              onClick={() => setToken && setToken(null)}
            />
          ))}
          {handleTokenList()?.tokens.map((token, index) => (
            <ButtonImage
              className={styles.token}
              key={index}
              img={token.token.imageUrl}
              imgHover={token.token.imageUrl}
              aspectRatio="1/1"
              height="25px"
              width="25px"
              onClick={() => setToken && setToken(tokens[index])}
            />
          ))}
        </div>
      )}
      {!hidePlusButton && tokens?.length > 7 && (
        <div
          className={styles.plusButton}
          onMouseEnter={() => setHoverTooltip(true)}
        >
          <ButtonImage
            img={GreenPlus}
            imgHover={GreenPlus}
            aspectRatio="40/40"
            height="2.5vh"
          />
        </div>
      )}
      {hoverTooltip && (
        <div
          className={styles.tooltip}
          onMouseLeave={() => setHoverTooltip(false)}
        >
          <ButtonImage
            img={CyanTooltipTokens}
            imgHover={CyanTooltipTokens}
            aspectRatio="193/113"
            height={"22vh"}
          />
        </div>
      )}
    </div>
  );
};

export default TokenList;
