import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    loginService,
    registerService,
    getMeService,
    forgotPasswordService,
} from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
    const user = await registerService(req.body);

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                user,
                "Admin registered successfully"
            )
        );
});

export const login = asyncHandler(async (req, res) => {
    const { token, user } = await loginService(req.body);

    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
    };

    return res
        .status(200)
        .cookie("accessToken", token, cookieOptions)
        .json(
            new ApiResponse(
                200,
                { user },
                "Login successful"
            )
        );
});

export const logout = asyncHandler(async (req, res) => {
    return res
        .clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        })
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Logout successful"
            )
        );
});

export const forgotPassword = asyncHandler(async (req, res) => {
    await forgotPasswordService(req.body.email);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Password reset link sent successfully"
            )
        );
});

export const getMe = asyncHandler(async (req, res) => {
    const user = await getMeService(req.user._id);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "User fetched successfully"
            )
        );
});