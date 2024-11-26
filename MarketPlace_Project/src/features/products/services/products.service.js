import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

export class ProductService {
  async getProducts() {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  }

  async addProduct(product) {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    return response.data;
  }

  async updateProduct(productId, updatedProduct) {
    const response = await axios.put(`${API_BASE_URL}/products/${productId}`, updatedProduct);
    return response.data;
  }

  async deleteProduct(productId) {
    await axios.delete(`${API_BASE_URL}/products/${productId}`);
  }
}
