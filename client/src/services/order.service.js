import api from "../api/axios";

// Existing
export const createOrder = (data) =>
    api.post("/orders", data);

// NEW
export const getOrders = (params) =>
    api.get("/orders", {
        params,
    });