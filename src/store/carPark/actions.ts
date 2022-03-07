import { Dispatch } from "redux";
import { UpdateCarInfo, UpdateCarInfoAction } from "./models";

export const updateCarInfo =
  (data: UpdateCarInfo) =>
  async (dispatch: Dispatch<UpdateCarInfoAction>, ...props: any[]): Promise<void> => {
    console.log(props, "props");
    // const order = orders.find((item) => item.id === data.orderId);
    // dispatch({
    //   type: "@orders/GET_ORDER_DETAILS",
    //   payload: order,
    // });
  };
