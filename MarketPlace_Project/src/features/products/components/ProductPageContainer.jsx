import { useState, useEffect } from "react";
import { ProductService } from "../services/products.service";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const ProductPageContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const productService = new ProductService();

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
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const addedProduct = await productService.addProduct(newProduct);
      setProducts([...products, addedProduct]);
      setIsAddingProduct(false);
    } catch {
      setError("Failed to add product");
    }
  };

  const handleEditProduct = async (productId, updatedProduct) => {
    try {
      const updated = await productService.updateProduct(productId, updatedProduct);
      setProducts(products.map((p) => (p.id === productId ? updated : p)));
      setEditingProduct(null);
    } catch {
      setError("Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
    } catch {
      setError("Failed to delete product");
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-page">
      <h2 className="page-title">Products</h2>
      <button onClick={() => setIsAddingProduct(true)} className="add-button">
        Add Product
      </button>
      <ProductList
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDeleteProduct}
      />
      {isAddingProduct && (
        <AddProduct
          onAdd={handleAddProduct}
          onClose={() => setIsAddingProduct(false)}
        />
      )}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onSave={handleEditProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductPageContainer;
