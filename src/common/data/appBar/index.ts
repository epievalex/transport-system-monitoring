import { CAR_PARK_INDEX } from "routes/carPark";
import { ORDERS_INDEX } from "routes/orders";

const links = [
  { route: ORDERS_INDEX, label: "Список заказов" },
  // { route: ORDER_CREATE, label: "Создать заказ" },
  { route: CAR_PARK_INDEX, label: "Автопарк" },
];

export { links };
