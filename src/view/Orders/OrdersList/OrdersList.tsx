import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "store";
import { Order } from "common/models";

import styles from "./OrdersList.module.css";

import { statusCodes } from "common/data/orders/statuses";
import { columns } from "./data";

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
          <div className={styles["table-cell"]}>{item}</div>
        ))}
      </div>
      {items.map((item) => {
        return (
          <React.Fragment>
            <div className={styles["table-row"]} key={item.id} onClick={() => onRowClick(item.id)}>
              <div className={styles["table-cell"]}>
                <span>{statusCodes[item.statusCode as keyof typeof statusCodes]}</span>
              </div>
              <div className={styles["table-cell"]}>
                <span>{item.date}</span>
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

  return <div className={styles["orders-list"]}>{gridTable}</div>;
};

function mapStateToProps(state: RootState) {
  return {
    items: state.orders.items,
  };
}

export default connect(mapStateToProps)(OrdersList);
