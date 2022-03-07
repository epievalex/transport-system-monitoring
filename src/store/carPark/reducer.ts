import { carPark } from "common/data/carPark";
import { Reducer } from "redux";
import { CarParkAction, CarParkState } from "./models";

const initialState: CarParkState = {
  items: carPark,
};

export const reducer: Reducer<CarParkState, CarParkAction> = (state = initialState, action): CarParkState => {
  switch (action.type) {
    case "@carPark/UPDATE_CAR_INFO":
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};
