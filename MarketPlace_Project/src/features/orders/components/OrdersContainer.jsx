import React, { useState } from "react";
import { useOrders } from "../hooks/useOrders";
import CreateOrder from "./CreateOrder";
import UpdateOrder from "./UpdateOrder";
import DeleteOrder from "./DeleteOrder";
import "../styles/OrdersContainer.css";

const OrdersContainer = () => {
  const { orders, loading, error, createOrder, updateOrder, deleteOrder } =
    useOrders();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="orders-container">
      <button onClick={() => setShowCreateForm(true)}>Add New Order</button>

      {showCreateForm && (
        <div className="form-overlay">
          <CreateOrder
            onCreate={(order) => {
              createOrder(order);
              setShowCreateForm(false);
            }}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {editingOrder && (
        <div className="form-overlay">
          <UpdateOrder
            order={editingOrder}
            onUpdate={(orderId, updatedOrder) => {
              updateOrder(orderId, updatedOrder);
              setEditingOrder(null);
            }}
            onCancel={() => setEditingOrder(null)}
          />
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <h3>Order ID: {order.id}</h3>
          <p>User ID: {order.userId}</p>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setEditingOrder(order)}>Edit</button>
          <DeleteOrder orderId={order.id} onDelete={deleteOrder} />
        </div>
      ))}
    </div>
  );
};

export default OrdersContainer;
