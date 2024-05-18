import { FunctionComponent } from "react";
import styles from "./spinner.module.css";

interface Props {
  size?: "normal" | "small";
  color?: string;
}

const Spinner: FunctionComponent<Props> = ({ size, color }) => {
  return (
    <div
      style={{ borderLeftColor: color }}
      className={`${styles.spinner} ${
        size === "small" ? styles.small : styles.normal
      }`}
    ></div>
  );
};

export default Spinner;
