import { useEffect, useState } from "react";
import { ProductService } from "../services/products.service";
import "../styles/ProductPage.css"; // Підключаємо файл стилів

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productService = new ProductService();

    const fetchProducts = async () => {
      try {
        const productsData = await productService.getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-page">
      <h2 className="page-title">Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;
