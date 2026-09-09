import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getTestimonials = async () => {
    const response = await api.get(
        ENDPOINTS.testimonials
    );

    return response.data;
};

export const createTestimonial = async (data) => {
    const response = await api.post(
        ENDPOINTS.testimonials,
        data
    );

    return response.data;
};

export const updateTestimonial = async (id, data) => {
    const response = await api.put(
        `${ENDPOINTS.testimonials}/${id}`,
        data
    );

    return response.data;
};

export const deleteTestimonial = async (id) => {
    const response = await api.delete(
        `${ENDPOINTS.testimonials}/${id}`
    );

    return response.data;
};