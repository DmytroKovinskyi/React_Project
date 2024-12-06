import React, { useState } from "react";
import "../../../components/layoutStyles/Common.css";
import "../../../components/layoutStyles/Buttons.css";
import "../styles/Forms.css";

const UpdateOrder = ({ order, onUpdate, onCancel }) => {
  const [updatedOrder, setUpdatedOrder] = useState(order);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(order.id, updatedOrder);
  };

  const updateProduct = (index, field, value) => {
    const updatedProducts = [...updatedOrder.products];
    updatedProducts[index][field] = value;
    setUpdatedOrder({ ...updatedOrder, products: updatedProducts });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Update Order</h3>
        <input
          type="number"
          value={updatedOrder.userId}
          onChange={(e) =>
            setUpdatedOrder({ ...updatedOrder, userId: Number(e.target.value) })
          }
        />
        {updatedOrder.products.map((product, index) => (
          <div key={index} className="product-input">
            <input
              type="number"
              placeholder="Product ID"
              value={product.productId}
              onChange={(e) =>
                updateProduct(index, "productId", Number(e.target.value))
              }
            />
            <input
              type="number"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) =>
                updateProduct(index, "quantity", Number(e.target.value))
              }
            />
          </div>
        ))}
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateOrder;
