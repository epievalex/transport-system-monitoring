import { Dispatch } from "redux";
import {
  CreateOrder,
  CreateOrderAction,
  GetOrderDetails,
  GetOrderDetailsAction,
  UpdateOrder,
  UpdateOrderAction,
} from "./models";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "store";
import { Car, Order } from "common/models";
import { UpdateCarInfo, UpdateCarInfoAction } from "store/carPark/models";

export const getOrderDetails =
  (data: GetOrderDetails) =>
  async (dispatch: Dispatch<GetOrderDetailsAction>, getState: () => RootState): Promise<void> => {
    const order = getState().orders.items.find((item) => item.id === data.orderId);
    dispatch({
      type: "@orders/GET_ORDER_DETAILS",
      payload: order,
    });
  };

export const createOrder =
  (data: CreateOrder, callback?: () => void) =>
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

export const updateOrder =
  (data: UpdateOrder, callback?: () => void) =>
  async (dispatch: Dispatch<UpdateOrderAction | UpdateCarInfoAction>, getState: () => RootState): Promise<void> => {
    const carPark = getState().carPark.items;
    const oldOrder = getState().orders.items.find((item) => item.id === data.updatedOrdered.id) as Order;
    if (oldOrder.courier?.id !== data.updatedOrdered.courier?.id) {
      const oldCar = carPark.find((item) => item.courier?.id === oldOrder.courier?.id) as Car;
      const newCar = carPark.find((item) => item.courier?.id === data.updatedOrdered.courier?.id) as Car;
      dispatch({ type: "@carPark/UPDATE_CAR_INFO", payload: { ...oldCar, statusCode: "3" } });
      dispatch({ type: "@carPark/UPDATE_CAR_INFO", payload: { ...newCar, statusCode: "1" } });
    }
    const updatedOrders = getState().orders.items.map((order) => {
      if (order.id === data.updatedOrdered.id) {
        return data.updatedOrdered;
      }
      return order;
    });

    dispatch({
      type: "@orders/UPDATE_ORDER",
      payload: updatedOrders,
    });

    callback && callback();
  };
