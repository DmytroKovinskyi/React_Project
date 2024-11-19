import { useState, useEffect } from "react";
import { OrderService } from "../services/orders.service";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderService = new OrderService();
      try {
        const ordersData = await orderService.getOrders();
        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};
