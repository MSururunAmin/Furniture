import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getBlogs = async () => {
  const response = await api.get(ENDPOINTS.blogs);
  return response.data;
};

export const getBlog = async (id) => {
  const response = await api.get(`${ENDPOINTS.blogs}/${id}`);

  return response.data;
};

export const createBlog = async (data) => {
  const response = await api.post(ENDPOINTS.blogs, data);

  return response.data;
};

export const updateBlog = async (id, data) => {
  const response = await api.put(`${ENDPOINTS.blogs}/${id}`, data);

  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`${ENDPOINTS.blogs}/${id}`);

  return response.data;
};
