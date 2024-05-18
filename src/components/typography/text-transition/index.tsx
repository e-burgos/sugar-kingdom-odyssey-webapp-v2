import React, { useEffect, useState } from "react";
import ReactTextTransition from "react-text-transition";
import Paragraph from "../paragraph";

interface TextTransitionProps {}

const TextTransition: React.FC<TextTransitionProps> = () => {
  const [index, setIndex] = useState(0);
  const texts = [
    "Play with your favorite altcoins and BRC20 tokens!",
    "Stake $SUGAR and get airdrops from multiple tokens!",
    "Play with your Ordinals and BRC20!",
  ];

  const handleNextIndex = (currentIndex: number, length: number) => {
    if (currentIndex === length - 1) return 0;
    return currentIndex + 1;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(handleNextIndex(index, texts.length));
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [index, texts.length]);

  return (
    <ReactTextTransition inline>
      <Paragraph htmlTag="h1" color="white">
        {`${texts[index]}`}
      </Paragraph>
    </ReactTextTransition>
  );
};

export default TextTransition;
