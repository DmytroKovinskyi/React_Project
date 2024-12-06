import React from "react";
import "../styles/ProductList.css";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id || "N/A"}</td>
            <td>
              <img
                src={product.image || product.imageUrl || "/placeholder.png"}
                alt={product.title || "No Title"}
                className="product-image"
              />
            </td>
            <td>{product.title || "No Title"}</td>
            <td>{product.description || "No Description"}</td>
            <td>
              {product.price !== undefined && !isNaN(product.price)
                ? `$${product.price.toFixed(2)}`
                : "N/A"}
            </td>
            <td>
              <button className="editButton" onClick={() => onEdit(product)}>
                Edit
              </button>
              <button
                className="deleteButton"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(ProductList);
