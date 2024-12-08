import { useState, useCallback, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import usePagination from "../hooks/usePagination";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import Controls from "./Controls";
import Pagination from "../../../components/layout/Pagination";
import "../styles/Container.css";

const ProductPageContainer = () => {
  const { products, loading, error, addProduct, editProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filtered.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [products, searchQuery, sortOrder]);

  const { paginatedItems: currentProducts, totalPages, currentPage, paginate } = usePagination(
    filteredAndSortedProducts,
    5
  );

  const handleAddProduct = useCallback(
    (newProduct) => {
      addProduct(newProduct);
      setIsAddingProduct(false);
    },
    [addProduct]
  );

  const handleEditProduct = useCallback(
    (productId, updatedProduct) => {
      editProduct(productId, updatedProduct);
      setEditingProduct(null);
    },
    [editProduct]
  );

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-page">
      <h2 className="page-title">Products</h2>
      <Controls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onSortOrderChange={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        onAddProduct={() => setIsAddingProduct(true)}
      />
      <ProductList
        products={currentProducts}
        onEdit={setEditingProduct}
        onDelete={deleteProduct}
      />
      <Pagination
        totalPages={totalPages}
        paginate={paginate}
        currentPage={currentPage}
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
