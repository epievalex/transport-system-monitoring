import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";

import { ORDER_CREATE } from "routes/orders";
import logo from "common/icons/logo.png";

import styles from "./Sidebar.module.css";

console.log(logo, "logo");

const Sidebar = () => {
  const location = useLocation();

  console.log(location, "pathname");
  return (
    <div className={styles["overlay"]}>
      <header className={styles["header"]}></header>
      <div className={styles["sidebar"]}>
        <div className={styles["sidebar-header"]}>
          <img className={styles["logo"]} src={logo} alt="logo" />
          Система мониторинга транспорта
        </div>
        <div className={styles["content"]}>
          <Button href={ORDER_CREATE}>Создать новый заказ</Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
