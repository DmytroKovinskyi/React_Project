import { useState } from "react"; 
import "../styles/AddProduct.css";
import "../../../components/layoutStyles/Common.css";

const AddProduct = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("/placeholder.png");
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Title is required.";
    if (!description.trim()) errors.description = "Description is required.";
    if (!price || isNaN(price) || parseFloat(price) <= 0)
      errors.price = "Price must be a valid positive number.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    onAdd({ 
      title, 
      description, 
      price: parseFloat(price), 
      image: image.trim() || "/placeholder.png"
    });
    setTitle("");
    setDescription("");
    setPrice("");
    setImage("/placeholder.png");
    setErrors({});
    onClose();
  };

  return (
    <div className="add-product-modal">
      <div className="add-product-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <h3>Add Product</h3>
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
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
