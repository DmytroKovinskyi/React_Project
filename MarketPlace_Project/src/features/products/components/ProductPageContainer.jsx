import { useContext, useMemo, useState, useCallback } from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import Controls from "./Controls";
import Pagination from "../../../components/layout/Pagination";
import "../styles/Container.css";

const ProductPageContainer = () => {
  const { products, addProduct, editProduct, deleteProduct, loading, error } =
    useContext(ProductsContext);

  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filtered.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [products, searchQuery, sortOrder]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(start, start + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

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

  const handleSortOrderChange = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-page">
      <h2 className="page-title">Products</h2>
      <Controls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onSortOrderChange={handleSortOrderChange}
        onAddProduct={() => setIsAddingProduct(true)}
      />
      <ProductList
        products={paginatedProducts}
        onEdit={setEditingProduct}
        onDelete={deleteProduct}
      />
      <Pagination
        totalPages={totalPages}
        paginate={handlePageChange}
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