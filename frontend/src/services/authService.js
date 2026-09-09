import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const login = async (credentials) => {
    const response = await api.post(
        ENDPOINTS.auth.login,
        credentials
    );

    return response.data;
};

export const logout = async () => {
    const response = await api.post(ENDPOINTS.auth.logout);

    return response.data;
};

export const getMe = async () => {
    const response = await api.get(ENDPOINTS.auth.me);

    return response.data;
};