import api from "../api/axios";

export const getMenu = () => api.get("/menu");

export const createMenu = (data) => api.post("/menu", data);

export const updateMenu = (id, data) =>
    api.put(`/menu/${id}`, data);

export const deleteMenu = (id) =>
    api.delete(`/menu/${id}`);