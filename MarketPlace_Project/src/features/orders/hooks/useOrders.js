import { useState, useEffect } from "react";
import { OrderService } from "../services/orders.service";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const orderService = new OrderService();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await orderService.getOrders();
      setOrders(ordersData);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders.");
      setLoading(false);
    }
  };

  const createOrder = async (order) => {
    try {
      const newOrder = await orderService.createOrder(order);
      setOrders([...orders, newOrder]);
    } catch (err) {
      setError("Failed to create order.");
    }
  };

  const updateOrder = async (orderId, updatedOrder) => {
    try {
      const updated = await orderService.updateOrder(orderId, updatedOrder);
      setOrders(
        orders.map((order) => (order.id === orderId ? updated : order))
      );
    } catch (err) {
      setError("Failed to update order.");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await orderService.deleteOrder(orderId);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (err) {
      setError("Failed to delete order.");
    }
  };

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
  };
};
