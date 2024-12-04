import React, { useState } from "react";
import "../styles/Common.css";
import "../styles/Buttons.css";
import "../styles/Forms.css";

const CreateOrder = ({ onCreate, onCancel }) => {
  const [newOrder, setNewOrder] = useState({ userId: "", products: [] });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newOrder.userId || !newOrder.products.length) {
      alert("Please provide user ID and at least one product.");
      return;
    }
    onCreate(newOrder);
    setNewOrder({ userId: "", products: [] });
  };

  const addProduct = () => {
    setNewOrder({
      ...newOrder,
      products: [...newOrder.products, { productId: "", quantity: 1 }],
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Create New Order</h3>
        <input
          type="number"
          placeholder="User ID"
          value={newOrder.userId}
          onChange={(e) =>
            setNewOrder({ ...newOrder, userId: Number(e.target.value) })
          }
        />
        <button type="button" onClick={addProduct}>
          Add Product
        </button>
        {newOrder.products.map((product, index) => (
          <div key={index}>
            <input
              type="number"
              placeholder="Product ID"
              value={product.productId}
              onChange={(e) => {
                const updatedProducts = [...newOrder.products];
                updatedProducts[index].productId = Number(e.target.value);
                setNewOrder({ ...newOrder, products: updatedProducts });
              }}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) => {
                const updatedProducts = [...newOrder.products];
                updatedProducts[index].quantity = Number(e.target.value);
                setNewOrder({ ...newOrder, products: updatedProducts });
              }}
            />
          </div>
        ))}
        <button type="submit">Create Order</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
