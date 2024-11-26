import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

export class OrderService {
  async getOrders() {
    const response = await axios.get(`${API_BASE_URL}/carts`);
    return response.data;
  }

  async createOrder(order) {
    const response = await axios.post(`${API_BASE_URL}/carts`, order);
    return response.data;
  }

  async updateOrder(orderId, order) {
    const response = await axios.put(`${API_BASE_URL}/carts/${orderId}`, order);
    return response.data;
  }

  async deleteOrder(orderId) {
    const response = await axios.delete(`${API_BASE_URL}/carts/${orderId}`);
    return response.data;
  }
}
