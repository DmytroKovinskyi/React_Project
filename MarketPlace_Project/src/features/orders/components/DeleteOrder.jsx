import React from "react";
import "../styles/DeleteOrder.css";

const DeleteOrder = ({ orderId, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      onDelete(orderId);
    }
  };

  return (
    <button className="delete-button" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteOrder;
