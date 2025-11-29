// services/api.js
import axios from 'axios';

const BASE_URL = 'https://smart-appointment-management-app.onrender.com/api'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (email, password) => {
  const response = await api.post('/login', {
    email,
    password,
  });
  return response.data;
};

export default api;
