import api from "../apis/configs/axiosConfig";

class AuthService {
  // logging in the user
  async login(credentials) {
    try {
      const response = await api.get("/auth/login", credentials);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // logging out the user
  logout() {
    localStorage.removeItem("tokens");
  }
}

export default new AuthService();
