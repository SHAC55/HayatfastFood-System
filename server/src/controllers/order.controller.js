import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createOrderService,getAllOrdersService,getOrderByIdService } from "../services/order.service.js";

export const createOrder = asyncHandler(async (req, res) => {

    const order = await createOrderService(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            order,
            "Order created successfully"
        )
    );
});

export const getAllOrders = asyncHandler(async (req, res) => {
    const result = await getAllOrdersService(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Orders fetched successfully"
        )
    );
});

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await getOrderByIdService(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order fetched successfully"
        )
    );
});