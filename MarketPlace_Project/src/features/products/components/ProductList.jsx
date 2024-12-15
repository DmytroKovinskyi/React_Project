import React from "react";
import PropTypes from "prop-types";
import "../styles/ProductList.css";

const ProductList = ({ products, onEdit, onDelete }) => {
  const handleEdit = (product) => () => onEdit(product);
  const handleDelete = (id) => () => onDelete(id);

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
              <button onClick={handleEdit(product)} className="btn btn-edit">
                Edit
              </button>
              <button onClick={handleDelete(product.id)} className="btn btn-delete">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default React.memo(ProductList);
