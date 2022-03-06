import React from "react";
import styles from "./Overlay.module.css";

const Overlay: React.FC = ({ children }) => {
  return <div className={styles.overlay}>{children}</div>;
};

export default Overlay;
