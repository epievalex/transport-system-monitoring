import { Car } from "common/models";

export type CarParkState = {
  items: Car[];
};

export interface UpdateCarInfo {
  updatedCar: Car;
}

export interface UpdateCarInfoAction {
  type: "@carPark/UPDATE_CAR_INFO";
  payload: Car;
}

export type CarParkAction = UpdateCarInfoAction;
