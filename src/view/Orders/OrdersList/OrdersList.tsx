import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { RootState } from "store";
import { Order } from "common/models";

import styles from "./OrdersList.module.css";

import { statusCodes } from "common/data/orders/statuses";
import { columns } from "./data";
import { ORDER_CREATE } from "routes/orders";
import { format } from "date-fns/esm";

interface PropsFromRedux {
  items: Order[];
}

interface Props extends PropsFromRedux {}

const OrdersList: React.FC<Props> = ({ items }) => {
  const navigate = useNavigate();
  const onRowClick = (orderId: string) => {
    navigate(orderId);
  };

  const gridTable = (
    <div className={styles["grid-table"]}>
      <div className={styles["table-row"]}>
        {columns.map((item) => (
          <div key={item} className={styles["table-cell"]}>
            {item}
          </div>
        ))}
      </div>
      {items.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <div className={styles["table-row"]} onClick={() => onRowClick(item.id)}>
              <div className={styles["table-cell"]}>
                <span>{statusCodes[item.statusCode as keyof typeof statusCodes]}</span>
              </div>
              <div className={styles["table-cell"]}>
                <span>{format(new Date(item.date), "dd-MM-yyyy HH:mm")}</span>
              </div>
              <div className={styles["table-cell"]}>
                <span>{item.courier?.fullName || "Не назначен"}</span>
              </div>
              <div className={styles["table-cell"]} title={item.sender.address.name}>
                <span>{item.sender.address.name}</span>
              </div>
              <div className={styles["table-cell"]}>
                <span>{item.sender.contact}</span>
              </div>
              <div className={styles["table-cell"]} title={item.recipient.address.name}>
                <span>{item.recipient.address.name}</span>
              </div>
              <div className={styles["table-cell"]}>
                <span>{item.recipient.contact}</span>
              </div>
              <div className={styles["table-cell"]}>
                <span>{item.cargo}</span>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div className={styles["orders-list"]}>
      <div className={styles.header}>
        <Link to={ORDER_CREATE} className={styles.link}>
          Создать новый заказ
        </Link>
      </div>
      {gridTable}
    </div>
  );
};

function mapStateToProps(state: RootState) {
  return {
    items: state.orders.items,
  };
}

export default connect(mapStateToProps)(OrdersList);
