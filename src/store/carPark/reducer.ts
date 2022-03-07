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
        items: state.items.map((car) => (car.id === action.payload.id ? action.payload : car)),
      };

    default:
      return state;
  }
};
