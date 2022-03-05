import { OrderForm } from "common/models";

export const initialValues: OrderForm = {
  date: "",
  courier: null,
  sender: {
    address: {
      name: "",
      geo: {
        latitude: "",
        longitude: "",
      },
    },
    contact: "",
  },
  recipient: {
    address: {
      name: "",
      geo: {
        latitude: "",
        longitude: "",
      },
    },
    contact: "",
  },
  cargo: "",
};
