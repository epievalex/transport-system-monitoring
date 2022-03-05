import { Reducer } from "redux";
import { couriers } from "common/data";
import { GetCouriersAction, CourierState } from "./models";

const initialState: CourierState = {
  items: couriers,
};

export const reducer: Reducer<CourierState, GetCouriersAction> = (state = initialState, action): CourierState => {
  switch (action.type) {
    case "@couriers/GET_COURIERS_ACTION":
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};
