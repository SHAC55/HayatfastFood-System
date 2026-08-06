import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  addMenuItemService,
  getAllMenuItemsService,
  updateMenuItemService,
  deleteMenuItemService,
} from "../services/menu.service.js";

export const addMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await addMenuItemService(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, menuItem, "Menu item added successfully"));
});

export const getAllMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await getAllMenuItemsService();

  return res
    .status(200)
    .json(new ApiResponse(200, menuItems, "Menu items fetched successfully"));
});

export const updateMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await updateMenuItemService(req.params.id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, menuItem, "Menu item updated successfully"));
});

export const deleteMenuItem = asyncHandler(async (req, res) => {
  await deleteMenuItemService(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Menu item deleted successfully"));
});
