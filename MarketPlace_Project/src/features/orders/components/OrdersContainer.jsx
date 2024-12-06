import React from "react";
import { useOrders } from "../hooks/useOrders";
import { useOrderForms } from "../hooks/useOrderForms";
import CreateOrder from "./CreateOrder";
import UpdateOrder from "./UpdateOrder";
import DeleteOrder from "./DeleteOrder";
import "../../../components/layoutStyles/Common.css";
import "../../../components/layoutStyles/Buttons.css";
import "../styles/Forms.css";
import "../styles/Table.css";
import "../styles/OrdersContainer.css";

const OrdersContainer = () => {
  const { orders, loading, error, createOrder, updateOrder, deleteOrder } = useOrders();
  const {
    showCreateForm,
    editingOrder,
    openCreateForm,
    closeCreateForm,
    openEditForm,
    closeEditForm,
  } = useOrderForms();

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="orders-container">
      <button onClick={openCreateForm}>Add New Order</button>

      {showCreateForm && (
        <div className="form-overlay">
          <CreateOrder
            onCreate={(order) => {
              createOrder(order);
              closeCreateForm();
            }}
            onCancel={closeCreateForm}
          />
        </div>
      )}

      {editingOrder && (
        <div className="form-overlay">
          <UpdateOrder
            order={editingOrder}
            onUpdate={(orderId, updatedOrder) => {
              updateOrder(orderId, updatedOrder);
              closeEditForm();
            }}
            onCancel={closeEditForm}
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
          <button className="button-edit" onClick={() => openEditForm(order)}>Edit</button>
          <DeleteOrder orderId={order.id} onDelete={deleteOrder} />
        </div>
      ))}
    </div>
  );
};

export default OrdersContainer;
