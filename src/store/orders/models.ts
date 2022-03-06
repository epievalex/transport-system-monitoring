import { Order, OrderForm } from "common/models";

export type OrdersState = {
  items: Order[];
  selectedOrder?: Order;
};

export interface CreateOrderAction {
  type: "@orders/CREATE_ORDER_ACTION";
  payload: Order;
}

export interface GetOrderDetails {
  orderId: string;
}

export interface GetOrderDetailsAction {
  type: "@orders/GET_ORDER_DETAILS";
  payload: Order | undefined;
}

export interface CreateOrder {
  orderForm: OrderForm;
}

export type OrdersAction = CreateOrderAction | GetOrderDetailsAction;
