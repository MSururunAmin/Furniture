import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getPortfolios = async () => {
  const response = await api.get(ENDPOINTS.portfolios.base);
  return response.data;
};

export const getPortfolio = async (id) => {
  const response = await api.get(`${ENDPOINTS.portfolios.base}/${id}`);

  return response.data;
};

export const getPortfolioImages = async (id) => {
  const response = await api.get(ENDPOINTS.portfolios.images(id));

  return response.data;
};

export const createPortfolio = async (data) => {
  const response = await api.post(ENDPOINTS.portfolios.base, data);
  return response.data;
};

export const updatePortfolio = async (id, data) => {
  const response = await api.put(`${ENDPOINTS.portfolios.base}/${id}`, data);
  return response.data;
};

export const deletePortfolio = async (id) => {
  const response = await api.delete(`${ENDPOINTS.portfolios.base}/${id}`);
  return response.data;
};

export const uploadPortfolioImages = async (id, formData) => {
  const response = await api.post(ENDPOINTS.portfolios.images(id), formData);
  return response.data;
};
