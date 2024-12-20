import React from "react";
import OrdersContainer from "./components/OrdersContainer";
import "../../components/layoutStyles/Common.css";

const OrderPage = () => {
  return (
    <div className="order-page">
      <h1>Order Management</h1>
      <OrdersContainer />
    </div>
  );
};

export default OrderPage;
