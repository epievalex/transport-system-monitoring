import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import classnames from "classnames";

import { links } from "common/data/appBar";
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
          Курьерская служба доставки
        </div>
        <div className={styles["content"]}>
          {links.map((item) => (
            <NavLink
              key={item.label}
              to={item.route}
              end
              className={({ isActive }) => (isActive ? classnames(styles.link, styles["link--active"]) : styles.link)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppBar;
