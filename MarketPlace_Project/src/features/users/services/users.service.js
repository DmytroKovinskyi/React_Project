import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

export class UserService {
  async getUsers() {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  }
}