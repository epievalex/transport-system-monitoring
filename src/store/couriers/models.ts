import { Courier } from "common/models";

export type CourierState = {
  items: Courier[];
};

export interface GetCouriersAction {
  type: "@couriers/GET_COURIERS_ACTION";
  payload: Courier[];
}

export type OrdersAction = GetCouriersAction;
