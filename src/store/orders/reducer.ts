import { Reducer } from "redux";
import { orders } from "common/data";
import { OrdersAction, OrdersState } from "./models";

const initialState: OrdersState = {
  items: orders,
};

export const reducer: Reducer<OrdersState, OrdersAction> = (state = initialState, action): OrdersState => {
  switch (action.type) {
    case "@orders/GET_ORDER_DETAILS":
      return {
        ...state,
        selectedOrder: action.payload,
      };

    case "@orders/CREATE_ORDER_ACTION":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "@orders/UPDATE_ORDER":
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};
