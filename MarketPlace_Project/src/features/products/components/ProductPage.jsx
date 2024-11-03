import { useEffect, useState } from "react";
import { ProductService } from "../services/products.service";

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
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
