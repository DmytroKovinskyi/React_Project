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
                  src={product.image || "placeholder.png"}
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
                <button onClick={() => onEdit(product)}>Edit</button>
                <button onClick={() => onDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default ProductList;
  