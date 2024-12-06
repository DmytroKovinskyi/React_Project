import React from "react";

const Controls = ({ searchQuery, onSearchChange, onAddProduct, sortOrder, onSortOrderChange }) => (
  <div className="controls">
    <button onClick={onAddProduct}>Add Product</button>
    <button onClick={onSortOrderChange}>
      Sort by Price ({sortOrder})
    </button>
    <input
      type="text"
      placeholder="Search by product name..."
      value={searchQuery}
      onChange={onSearchChange}
    />
  </div>
);

export default React.memo(Controls);
