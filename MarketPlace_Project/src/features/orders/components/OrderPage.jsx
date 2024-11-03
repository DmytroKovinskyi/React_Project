import { useEffect, useState } from "react";
import { OrderService } from "../services/orders.service";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orderService = new OrderService();

    const fetchOrders = async () => {
      try {
        const ordersData = await orderService.getOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <p>User ID: {order.userId}</p>
            <ul>
              {order.products.map((product) => (
                <li key={product.productId}>
                  Product ID: {product.productId}, Quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
