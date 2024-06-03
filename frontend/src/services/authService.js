
import axios from 'axios';

// Read the API URL from the environment variable
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api/users';

const register = (data) => {
  return axios.post(`${API_URL}/register`, data); // Correct endpoint for registration
};

const login = (data) => {
  return axios.post(`${API_URL}/login`, data); // Correct endpoint for login
};

const authService = {
  register,
  login,
};

export default authService;

