import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getBlogs = async () => {
  const response = await api.get(ENDPOINTS.blogs.base);
  return response.data;
};

export const getBlog = async (id) => {
  const response = await api.get(`${ENDPOINTS.blogs.base}/${id}`);

  return response.data;
};

export const createBlog = async (data) => {
  const response = await api.post(ENDPOINTS.blogs.base, data);

  return response.data;
};

export const updateBlog = async (id, data) => {
  if (data instanceof FormData) {
    data.append("_method", "PUT");
    const response = await api.post(`${ENDPOINTS.blogs.base}/${id}`, data);
    return response.data;
  }

  const response = await api.put(`${ENDPOINTS.blogs.base}/${id}`, data);

  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`${ENDPOINTS.blogs.base}/${id}`);

  return response.data;
};
