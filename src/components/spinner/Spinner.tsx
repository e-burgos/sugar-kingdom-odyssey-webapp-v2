import { FunctionComponent } from "react";
import styles from "./spinner.module.css";

interface Props {
  size?: "normal" | "small";
  color?: string;
}

const Spinner: FunctionComponent<Props> = ({ size, color }) => {
  return (
    <div
      style={{ borderLeftColor: color || "rgba(150, 233, 237, 1)" }}
      className={`${styles.spinner} ${
        size === "small" ? styles.small : styles.normal
      }`}
    ></div>
  );
};

export default Spinner;
