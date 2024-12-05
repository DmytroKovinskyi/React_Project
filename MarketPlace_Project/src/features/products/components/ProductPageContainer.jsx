import { useState, useEffect } from 'react'
import { ProductService } from '../services/products.service'
import ProductList from './ProductList'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import Pagination from './Pagination'
import '../styles/Container.css'

const ProductPageContainer = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  const productService = new ProductService()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productService.getProducts()
        setProducts(productsData)
      } catch (err) {
        setError('Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddProduct = async (newProduct) => {
    try {
      const addedProduct = await productService.addProduct(newProduct)
      setProducts([...products, addedProduct])
      setIsAddingProduct(false)
    } catch {
      setError('Failed to add product')
    }
  }

  const handleEditProduct = async (productId, updatedProduct) => {
    try {
      const updated = await productService.updateProduct(
        productId,
        updatedProduct
      )
      setProducts(products.map((p) => (p.id === productId ? updated : p)))
      setEditingProduct(null)
    } catch {
      setError('Failed to update product')
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId)
      setProducts(products.filter((p) => p.id !== productId))
    } catch {
      setError('Failed to delete product')
    }
  }
  const handleSortByPrice = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price
      }
      return b.price - a.price
    })
    setProducts(sortedProducts)
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const totalPages = Math.ceil(products.length / itemsPerPage)

  if (loading) return <div>Loading products...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="product-page">
      <h2 className="page-title">Products</h2>

      <div className="controls">
        <button onClick={() => setIsAddingProduct(true)} className="add-button">
          Add Product
        </button>
        <button onClick={handleSortByPrice} className="sort-button">
          Sort by Price ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      <ProductList
        products={currentProducts}
        onEdit={setEditingProduct}
        onDelete={handleDeleteProduct}
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
  )
}

export default ProductPageContainer
