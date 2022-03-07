import { Dispatch } from "redux";
import { RootState } from "store";
import { UpdateCarInfo, UpdateCarInfoAction } from "./models";

export const updateCarInfo =
  (data: UpdateCarInfo) =>
  async (dispatch: Dispatch<UpdateCarInfoAction>, getState: () => RootState): Promise<void> => {
    dispatch({
      type: "@carPark/UPDATE_CAR_INFO",
      payload: data.updatedCar,
    });
  };
