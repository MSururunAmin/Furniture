import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getCategories = async () => {
  const response = await api.get(ENDPOINTS.categories.base);
  return response.data;
};
