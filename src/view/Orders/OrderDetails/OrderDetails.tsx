import React, { FormEvent, useEffect, useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";

import { connect, ConnectedProps } from "react-redux";
import * as ordersActions from "store/orders/actions";
import { RootState } from "store";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { initialValues } from "common/data/orders/form";
import styles from "./OrderForm.module.css";
import { Courier, Order, OrderForm } from "common/models";
import { executeGeocoding } from "common/data/orders/geo";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const OrderDetails: React.FC<Props> = ({ order, getOrderDetails, updateOrder, couriers, cars }) => {
  const navigate = useNavigate();
  const params = useParams();
  const orderId = params.orderId;
  const [values, setValues] = useState<Order>({ id: "-1", statusCode: "-1", ...initialValues });
  const [areValuesChanged, setAreValuesChanged] = useState(false);
  function changeFormField<K extends keyof typeof values>(data: Pick<typeof values, K>) {
    setValues({ ...values, ...data });
  }

  console.log(order, "order");

  useEffect(() => {
    if (orderId) {
      getOrderDetails({ orderId });
    }
  }, [orderId, getOrderDetails]);

  useEffect(() => {
    if (order) setValues(order);
  }, [order]);

  useEffect(() => {
    setAreValuesChanged(!_.isEqual(order, values));
  }, [order, values]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    updateOrder({ updatedOrdered: values }, () => navigate("/orders"));
  };

  return (
    <form className={styles["form"]} onSubmit={submit}>
      <h3 className={styles["header"]}>{`Заказ №${order?.id}`}</h3>

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
          label="Контакт получателя"
          name="recipient-contact"
          value={values.recipient.contact}
          onChange={(e) => changeFormField({ recipient: { ...values.recipient, contact: e.currentTarget.value } })}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Дата"
            value={values.date}
            onChange={(value) => changeFormField({ date: value ? Date.parse(value as string) : "" })}
            renderInput={(params) => <TextField className={styles["input"]} {...params} />}
          />
        </LocalizationProvider>

        <TextField
          className={styles["input"]}
          label="Груз"
          name="cargo"
          value={values.cargo}
          onChange={(e) => changeFormField({ cargo: e.currentTarget.value })}
        />

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
            {cars.map((car) => {
              return (
                <MenuItem disabled={car.statusCode !== "3"} key={car.id} value={car.courier?.id}>
                  <div className={styles["menu-item"]}>
                    {car.courier?.fullName}
                    {car.statusCode !== "3" && <span className={styles.annotation}>(Запланирован или занят)</span>}
                  </div>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div className={styles["footer"]}>
        <Button color="error" onClick={() => navigate(-1)}>
          Отмена
        </Button>
        <Button variant="outlined" type="submit" disabled={!areValuesChanged}>
          Изменить
        </Button>
      </div>
    </form>
  );
};

function mapStateToProps(state: RootState) {
  return {
    order: state.orders.selectedOrder,
    couriers: state.couriers.items,
    cars: state.carPark.items,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ordersActions, dispatch);
}

export default connector(OrderDetails);
