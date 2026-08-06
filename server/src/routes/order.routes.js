import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createOrder, getAllOrders,getOrderById } from "../controllers/order.controller.js";

const router = Router();

router.post("/", authMiddleware, createOrder);

router.get("/", authMiddleware, getAllOrders);

router.get("/:id", authMiddleware, getOrderById);

export default router;