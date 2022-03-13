import { OrderForm } from "common/models";

export const initialValues: OrderForm = {
  date: Date.parse(new Date().toString()),
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
