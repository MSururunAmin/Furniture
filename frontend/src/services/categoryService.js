import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getCategories = async () => {
  const response = await api.get(ENDPOINTS.categories.base);
  return response.data;
};

export const createCategory = async (data) => {
  const response = await api.post(ENDPOINTS.categories.base, data);
  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await api.put(`${ENDPOINTS.categories.base}/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`${ENDPOINTS.categories.base}/${id}`);
  return response.data;
};
