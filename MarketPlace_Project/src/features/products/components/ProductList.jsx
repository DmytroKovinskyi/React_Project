import React from "react";
import "../styles/ProductList.css";

const ProductList = ({ products, onEdit, onDelete }) => (
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
          <td>{product.id}</td>
          <td>
            <img
              src={product.image || "/placeholder.png"}
              alt={product.title}
              className="product-image"
            />
          </td>
          <td>{product.title}</td>
          <td>{product.description}</td>
          <td>${product.price.toFixed(2)}</td>
          <td>
            <button onClick={() => onEdit(product)}>Edit</button>
            <button onClick={() => onDelete(product.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default React.memo(ProductList);
