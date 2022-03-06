import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "@mui/material";

import { links } from "common/data/app-bar";
import logo from "common/icons/logo.png";

import styles from "./AppBar.module.css";

const AppBar = () => {
  const location = useLocation();

  console.log(location, "pathname");
  return (
    <div className={styles["app-bar"]}>
      {/* <header className={styles["header"]}></header> */}
      <div className={styles["sidebar"]}>
        <div className={styles["sidebar-header"]}>
          <img className={styles["logo"]} src={logo} alt="logo" />
          Система мониторинга транспорта
        </div>
        <div className={styles["content"]}>
          {links.map((item) => (
            <Link href={item.route} variant="overline" underline="none">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppBar;
