import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

export class ProductService {
  async getProducts() {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  }
}
