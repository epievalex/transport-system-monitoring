import { Dispatch } from "redux";
import { GetOrderDetails, GetOrderDetailsAction } from "./models";
import { orders } from "common/data";

export const getOrderDetails =
  (data: GetOrderDetails) =>
  async (dispatch: Dispatch<GetOrderDetailsAction>): Promise<void> => {
    const order = orders.find((item) => item.id === +data.orderId);
    dispatch({
      type: "@orders/GET_ORDER_DETAILS",
      payload: order,
    });
  };
