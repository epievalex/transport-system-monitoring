import React, { FormEvent, useEffect, useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";

import { connect, ConnectedProps } from "react-redux";
import * as ordersActions from "store/orders/actions";
import { RootState } from "store";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { initialValues } from "common/data/orders/form";
import styles from "./OrderForm.module.css";
import { Courier, OrderForm } from "common/models";
import { executeGeocoding } from "common/data/orders/geo";
import { format } from "date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  type: "create" | "change";
}

const OrderDetails: React.FC<Props> = ({ type, order, getOrderDetails, couriers }) => {
  const navigate = useNavigate();
  const params = useParams();
  const orderId = params.orderId;
  const [values, setValues] = useState<OrderForm>(initialValues);
  const [areValuesChanged, setAreValuesChanged] = useState(false);
  function changeFormField<K extends keyof typeof values>(data: Pick<typeof values, K>) {
    setValues({ ...values, ...data });
  }

  useEffect(() => {
    if (orderId) {
      getOrderDetails({ orderId });
    }
  }, [orderId, getOrderDetails]);

  useEffect(() => {
    if (order) setValues(order);
  }, [order]);

  useEffect(() => {
    switch (type) {
      case "change":
        if (order) setAreValuesChanged(!_.isEqual(order, values));
        break;

      case "create":
        setAreValuesChanged(!_.isEqual(initialValues, values));
        break;

      default:
        break;
    }
  }, [order, type, values]);

  const sumbit = (e: FormEvent) => {
    e.preventDefault();
    console.log("SEND");
  };

  return (
    <form className={styles["form"]} onSubmit={sumbit}>
      <h3 className={styles["header"]}>{type === "create" ? "Создание нового заказа" : `Заказ №${order?.id}`}</h3>

      <div className={styles["text-fields"]}>
        <TextField
          className={styles["input"]}
          label="Адрес отправителя"
          name="sender-address"
          value={values.sender.address.name}
          onChange={(e) =>
            changeFormField({ sender: { ...values.sender, address: executeGeocoding(e.currentTarget.value) } })
          }
        />

        <TextField
          className={styles["input"]}
          label="Контакт отправителя"
          name="sender-contact"
          type="tel"
          value={values.sender.contact}
          onChange={(e) => changeFormField({ sender: { ...values.sender, contact: e.currentTarget.value } })}
        />

        <TextField
          className={styles["input"]}
          label="Адрес получателя"
          name="recipient-address"
          value={values.recipient.address.name}
          onChange={(e) =>
            changeFormField({ recipient: { ...values.recipient, address: executeGeocoding(e.currentTarget.value) } })
          }
        />

        <TextField
          className={styles["input"]}
          label="Контакс получателя"
          name="recipient-contact"
          value={values.recipient.contact}
          onChange={(e) => changeFormField({ recipient: { ...values.recipient, contact: e.currentTarget.value } })}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Дата"
            value={values.date}
            onChange={(value) => changeFormField({ date: format(new Date(value as string), "dd-MM-yyyy") })}
            renderInput={(params) => <TextField className={styles["input"]} {...params} error={false} />}
          />
        </LocalizationProvider>

        <TextField
          className={styles["input"]}
          label="Груз"
          name="cargo"
          value={values.cargo}
          onChange={(e) => changeFormField({ cargo: e.currentTarget.value })}
        />

        {type === "change" && (
          <FormControl fullWidth>
            <InputLabel id="courier">Курьер</InputLabel>
            <Select
              labelId="courier"
              id="courier-select"
              value={values.courier?.id || ""}
              label="Age"
              onChange={(e) =>
                changeFormField({ courier: couriers.find((item) => e.target.value === item.id) as Courier })
              }
            >
              {couriers.map((courier) => {
                return (
                  <MenuItem key={courier.id} value={courier.id}>
                    {courier.fullName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      </div>

      <div className={styles["footer"]}>
        <Button color="error" onClick={() => navigate(-1)}>
          Отмена
        </Button>
        <Button variant="outlined" type="submit" disabled={!areValuesChanged}>
          {type === "change" ? "Изменить" : "Создать"}
        </Button>
      </div>
    </form>
  );
};

function mapStateToProps(state: RootState) {
  return {
    order: state.orders.selectedOrder,
    couriers: state.couriers.items,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ordersActions, dispatch);
}

export default connector(OrderDetails);
