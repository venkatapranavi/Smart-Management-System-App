import api from "./Api";

export const registerDoctor = async (doctorData) => {
  try {
    const response = await api.post('/doctor/register', doctorData);
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || 'Doctor registration failed';
    throw new Error(message);
  }
};

export const getDoctorById = async (id) => {
  try {
    const response = await api.get(`/doctor/profile/${id}`);
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to fetch doctor';
    throw new Error(message);
  }
};
