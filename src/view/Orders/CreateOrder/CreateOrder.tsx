import React from "react";
import { OrderDetails } from "../OrderDetails";
import styles from "./CreateOrder.module.css";

export const CreateOrder: React.FC = () => {
  return (
    <div className={styles["create-order"]}>
      <OrderDetails type="create" />
    </div>
  );
};
