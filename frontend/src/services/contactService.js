import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getContacts = async () => {
    const response = await api.get(
        ENDPOINTS.contacts.base
    );

    return response.data;
};

export const getContact = async (id) => {
    const response = await api.get(
        `${ENDPOINTS.contacts.base}/${id}`
    );

    return response.data;
};

export const createContact = async (data) => {
    const response = await api.post(
        ENDPOINTS.contacts.base,
        data
    );

    return response.data;
};

export const updateContact = async (id, data) => {
    const response = await api.put(
        `${ENDPOINTS.contacts.base}/${id}`,
        data
    );

    return response.data;
};

export const deleteContact = async (id) => {
    const response = await api.delete(
        `${ENDPOINTS.contacts.base}/${id}`
    );

    return response.data;
};

export const markContactAsRead = async (id) => {
    const response = await api.patch(
        ENDPOINTS.contacts.read(id)
    );

    return response.data;
};