import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";
import { ProductService } from "../services/products.service";

export const ProductsContext = createContext();

export const useProductsContext = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productService = useMemo(() => new ProductService(), []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productService.getProducts();
        setProducts(productsData);
      } catch {
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
      setProducts((prev) => [...prev, addedProduct]);
    } catch {
      setError("Failed to add product");
    }
  }, [productService]);

  const editProduct = useCallback(async (productId, updatedProduct) => {
    try {
      const updated = await productService.updateProduct(productId, updatedProduct);
      setProducts((prev) =>
        prev.map((product) => (product.id === productId ? updated : product))
      );
    } catch {
      setError("Failed to update product");
    }
  }, [productService]);

  const deleteProduct = useCallback(async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch {
      setError("Failed to delete product");
    }
  }, [productService]);


  return (
    <ProductsContext.Provider value={{
      products,
      loading,
      error,
      addProduct,
      editProduct,
      deleteProduct,
    }}>
      {children}
    </ProductsContext.Provider>
  );
};