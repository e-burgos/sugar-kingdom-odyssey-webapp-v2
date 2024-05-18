import React, { FunctionComponent } from "react";
import styles from "./styles/paragraph.module.css";

export interface ParagraphProps {
  children: string;
  color?: string;
  htmlTag?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  fontFamily?:
    | "Titan-Regular"
    | "Gotham-Light"
    | "Gotham-Light-Italic"
    | "Gotham-Medium"
    | "Gotham-Medium-Italic"
    | "Gotham-Bold";
  fontSize?: string;
  fontWeight?: "normal" | "bold" | "lighter" | "bolder" | "initial" | "inherit";
  className?: string;
  style?: React.CSSProperties | undefined;
}

const Paragraph: FunctionComponent<ParagraphProps> = ({
  children,
  color,
  fontSize,
  fontWeight,
  fontFamily,
  className,
  style,
  htmlTag,
}) => {
  const handleTag = () => {
    switch (htmlTag) {
      case "h1":
        return (
          <h1
            className={`${styles.text} ${className}`}
            style={{
              color: `${color ? color : "#000000"}`,
              fontSize: `${fontSize || "27px"}`,
              fontFamily: `${fontFamily ? fontFamily : "Titan-Regular"}`,
              fontWeight: fontWeight || "normal",
              ...style,
            }}
          >
            {children}
          </h1>
        );
      case "h2":
        return (
          <h2
            className={`${styles.text} ${className}`}
            style={{
              color: `${color ? color : "#000000"}`,
              fontSize: `${fontSize || "24px"}`,
              fontFamily: `${fontFamily ? fontFamily : "Titan-Regular"}`,
              fontWeight: fontWeight || "normal",
              ...style,
            }}
          >
            {children}
          </h2>
        );
      case "h3":
        return (
          <h3
            className={`${styles.text} ${className}`}
            style={{
              color: `${color ? color : "#000000"}`,
              fontSize: `${fontSize || "21px"}`,
              fontFamily: `${fontFamily ? fontFamily : "Titan-Regular"}`,
              fontWeight: fontWeight || "normal",
              ...style,
            }}
          >
            {children}
          </h3>
        );
      case "h4":
        return (
          <h4
            className={`${styles.text} ${className}`}
            style={{
              color: `${color ? color : "#000000"}`,
              fontSize: `${fontSize || "18px"}`,
              fontFamily: `${fontFamily ? fontFamily : "Titan-Regular"}`,
              fontWeight: fontWeight || "normal",
              ...style,
            }}
          >
            {children}
          </h4>
        );
      case "h5":
        return (
          <h5
            className={`${styles.text} ${className}`}
            style={{
              color: `${color ? color : "#000000"}`,
              fontSize: `${fontSize || "16px"}`,
              fontFamily: `${fontFamily ? fontFamily : "Titan-Regular"}`,
              fontWeight: fontWeight || "normal",
              ...style,
            }}
          >
            {children}
          </h5>
        );
      case "h6":
        return (
          <h6
            className={`${styles.text} ${className}`}
            style={{
              color: `${color ? color : "#000000"}`,
              fontSize: `${fontSize || "14px"}`,
              fontFamily: `${fontFamily ? fontFamily : "Titan-Regular"}`,
              fontWeight: fontWeight || "normal",
              ...style,
            }}
          >
            {children}
          </h6>
        );
      default:
        return (
          <p
            className={`${styles.text} ${className}`}
            style={{
              color: `${color ? color : "#000000"}`,
              fontSize: `${fontSize || "16px"}`,
              fontFamily: `${fontFamily ? fontFamily : "Titan-Regular"}`,
              fontWeight: fontWeight || "normal",
              ...style,
            }}
          >
            {children}
          </p>
        );
    }
  };
  return handleTag();
};

export default Paragraph;
