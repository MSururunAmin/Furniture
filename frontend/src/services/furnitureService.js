import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getFurnitures = async () => {
  const response = await api.get(ENDPOINTS.furnitures.base);

  return response.data;
};

export const getFurniture = async (id) => {
  const response = await api.get(`${ENDPOINTS.furnitures.base}/${id}`);

  return response.data;
};

export const createFurniture = async (data) => {
  const response = await api.post(ENDPOINTS.furnitures.base, data);

  return response.data;
};

export const updateFurniture = async (id, data) => {
  const response = await api.put(`${ENDPOINTS.furnitures.base}/${id}`, data);

  return response.data;
};

export const deleteFurniture = async (id) => {
  const response = await api.delete(`${ENDPOINTS.furnitures.base}/${id}`);

  return response.data;
};

export const uploadFurnitureImages = async (id, formData) => {
  const response = await api.post(ENDPOINTS.furnitures.images(id), formData);

  return response.data;
};

export const getFurnitureImages = async (id) => {
  const response = await api.get(ENDPOINTS.furnitures.images(id));

  return response.data;
};

export const deleteFurnitureImage = async (imageId) => {
  const response = await api.delete(`/furniture-images/${imageId}`);

  return response.data;
};
