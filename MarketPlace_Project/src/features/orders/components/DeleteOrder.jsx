import React from "react";
import "../../../components/layoutStyles/Common.css";
import "../../../components/layoutStyles/Buttons.css";
import "../styles/Forms.css";

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
