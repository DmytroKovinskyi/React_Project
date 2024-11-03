import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

export class OrderService {
  async getOrders() {
    const response = await axios.get(`${API_BASE_URL}/carts`);
    return response.data;
  }
}
