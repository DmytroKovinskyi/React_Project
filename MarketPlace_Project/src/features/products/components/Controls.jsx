import React from "react";

const Controls = ({ searchQuery, onSearchChange, sortOrder, onSortOrderChange, onAddProduct }) => (
  <div className="controls">
    <button onClick={onAddProduct} className="add-button">Add Product</button>
    <button onClick={onSortOrderChange} className="sort-button">
      Sort by Price ({sortOrder})
    </button>
    <input
      type="text"
      placeholder="Search by product name..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-input"
    />
  </div>
);

export default React.memo(Controls);
