import { useState, useEffect, useCallback, useMemo } from "react";
import { ProductService } from "../services/products.service";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productService = useMemo(() => new ProductService(), []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productService.getProducts();
        setProducts(productsData);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productService]);

  const addProduct = useCallback(async (newProduct) => {
    try {
      const addedProduct = await productService.addProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
    } catch {
      setError("Failed to add product");
    }
  }, [productService]);

  const editProduct = useCallback(async (productId, updatedProduct) => {
    try {
      const updated = await productService.updateProduct(productId, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === productId ? updated : p))
      );
    } catch {
      setError("Failed to update product");
    }
  }, [productService]);

  const deleteProduct = useCallback(async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
    } catch {
      setError("Failed to delete product");
    }
  }, [productService]);

  return {
    products,
    loading,
    error,
    addProduct,
    editProduct,
    deleteProduct,
  };
};

export default useProducts;
