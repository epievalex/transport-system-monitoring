import React from "react";
import { Route, Routes } from "react-router-dom";
import { OrdersList } from "./OrdersList";
import { CreateOrder } from "./CreateOrder";
import { OrderDetails } from "./OrderDetails";
import { ORDERS_INDEX, ORDER_CREATE, ORDER_DETAILS } from "routes/orders";

const Orders: React.FC = () => {
  return (
    <Routes>
      <Route path={ORDERS_INDEX} element={<OrdersList />} />
      <Route path={ORDER_CREATE} element={<CreateOrder />} />
      <Route path={ORDER_DETAILS} element={<OrderDetails />} />
    </Routes>
  );
};

export default Orders;
