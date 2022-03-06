import { Dispatch } from "redux";
import { CreateOrder, CreateOrderAction, GetOrderDetails, GetOrderDetailsAction } from "./models";
import { orders } from "common/data";
import { v4 as uuidv4 } from "uuid";

export const getOrderDetails =
  (data: GetOrderDetails) =>
  async (dispatch: Dispatch<GetOrderDetailsAction>): Promise<void> => {
    const order = orders.find((item) => item.id === data.orderId);
    dispatch({
      type: "@orders/GET_ORDER_DETAILS",
      payload: order,
    });
  };

export const createOrder =
  (data: CreateOrder, callback: () => void) =>
  async (dispatch: Dispatch<CreateOrderAction>): Promise<void> => {
    const newOrder = {
      id: uuidv4(),
      statusCode: "1",
      ...data.orderForm,
    };

    dispatch({
      type: "@orders/CREATE_ORDER_ACTION",
      payload: newOrder,
    });
    callback && callback();
  };
