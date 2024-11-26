import { useState } from "react";
import "../styles/EditProduct.css";

const EditProduct = ({ product, onSave, onClose }) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Title is required.";
    if (!description.trim()) errors.description = "Description is required.";
    if (!price || isNaN(price) || parseFloat(price) <= 0)
      errors.price = "Price must be a valid positive number.";
    if (!image.trim()) errors.image = "Image URL is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    onSave(product.id, { title, description, price: parseFloat(price), image });
    onClose();
  };

  return (
    <div className="edit-product-modal">
      <div className="edit-product-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <h3>Edit Product</h3>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <small className="error">{errors.title}</small>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <small className="error">{errors.description}</small>
            )}
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <small className="error">{errors.price}</small>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {errors.image && <small className="error">{errors.image}</small>}
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
