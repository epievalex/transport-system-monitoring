import { Order } from "common/models";

export type OrdersState = {
  items: Order[];
  selectedOrder?: Order;
};

export interface CreateOrderAction {
  type: "@orders/CREATE_ORDER_ACTION";
  payload: Order;
}

export interface GetOrderDetails {
  orderId: number;
}

export interface GetOrderDetailsAction {
  type: "@orders/GET_ORDER_DETAILS";
  payload: Order | undefined;
}

export type OrdersAction = CreateOrderAction | GetOrderDetailsAction;
