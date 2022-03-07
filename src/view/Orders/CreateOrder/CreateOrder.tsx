import React, { FormEvent, useEffect, useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { connect, ConnectedProps } from "react-redux";
import * as ordersActions from "store/orders/actions";
import { RootState } from "store";
import { Button, CircularProgress, TextField } from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { initialValues } from "common/data/orders/form";
import styles from "./CreateOrder.module.css";
import { OrderForm } from "common/models";
import { executeGeocoding } from "common/data/orders/geo";
import { format } from "date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Overlay } from "common/components/Overlay";

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const CreateOrder: React.FC<Props> = ({ createOrder, cars }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState<OrderForm>(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchingForCourier, setIsSearchingForCourier] = useState(false);
  const [isCourierFound, setIsCourierFound] = useState(false);
  const [areValuesChanged, setAreValuesChanged] = useState(false);
  function changeFormField<K extends keyof typeof values>(data: Pick<typeof values, K>) {
    setValues({ ...values, ...data });
  }

  useEffect(() => {
    setAreValuesChanged(!_.isEqual(initialValues, values));
  }, [values]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSearchingForCourier(true);
    await createOrder({ orderForm: values }, () => {
      setTimeout(() => {
        setIsSearchingForCourier(false);
        cars.filter((car) => car.statusCode === "3").length ? setIsCourierFound(true) : setIsCourierFound(false);
      }, 10000);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/orders");
      }, 15000);
    });
  };

  return (
    <form className={styles["form"]} onSubmit={submit}>
      {isLoading && (
        <Overlay>
          <div className={styles["loading-screen"]}>
            <CircularProgress size={100} color="primary" />
            {isSearchingForCourier
              ? "Идет поиск сводобного курьера. Пожалуйста, подождите..."
              : isCourierFound
              ? "Курьер найден, через несколько секунд Вы будете возвращены на страницу заказов"
              : "Заказ создан, но свободный курьер не найден, через несколько секунд Вы будете возвращены на страницу заказов"}
          </div>
        </Overlay>
      )}
      <h3 className={styles["header"]}>Создание нового заказа</h3>

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
      </div>

      <div className={styles["footer"]}>
        <Button color="error" onClick={() => navigate(-1)}>
          Отмена
        </Button>
        <Button variant="outlined" type="submit" disabled={!areValuesChanged}>
          Создать
        </Button>
      </div>
    </form>
  );
};

function mapStateToProps(state: RootState) {
  return {
    couriers: state.couriers.items,
    cars: state.carPark.items,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ordersActions, dispatch);
}

export default connector(CreateOrder);
