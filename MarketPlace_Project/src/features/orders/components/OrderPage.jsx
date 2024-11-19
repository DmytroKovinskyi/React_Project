import { useState } from "react";
import "../styles/OrderPage.css"; // Для кращого вигляду стилі можна підключити

const OrderPage = () => {
  const [orders] = useState([
    {
      id: 1,
      userId: 101,
      products: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ],
    },
    {
      id: 2,
      userId: 102,
      products: [
        { productId: 3, quantity: 4 },
        { productId: 4, quantity: 1 },
      ],
    },
    {
      id: 3,
      userId: 103,
      products: [
        { productId: 2, quantity: 2 },
        { productId: 5, quantity: 3 },
      ],
    },
  ]);

  const [users] = useState([
    { id: 101, name: "John Doe" },
    { id: 102, name: "Jane Smith" },
    { id: 103, name: "Alice Johnson" },
  ]);

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <div className="order-page">
      <h2>Orders</h2>
      <div className="orders-container">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order ID: {order.id}</h3>
            <p>User: {getUserName(order.userId)}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
