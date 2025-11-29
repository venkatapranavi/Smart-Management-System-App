// services/userService.js
import api from "./Api";

export const registerUser = async (formData) => {
  const response = await api.post('/user/register', formData);
  console.log("Register API response:", response.data);
  return response.data;
};
  