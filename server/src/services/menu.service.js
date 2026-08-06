import Menu from "../models/menu.model.js";
import ApiError from "../utils/ApiError.js";

export const addMenuItemService = async ({ sku: customSku, name, price }) => {
    if (!name || price === undefined) {
        throw new ApiError(400, "Name and price are required");
    }

    let sku;

    // If admin provides a custom SKU
    if (customSku && customSku.trim() !== "") {
        sku = customSku.toUpperCase().trim();

        const existingSku = await Menu.findOne({ sku });

        if (existingSku) {
            throw new ApiError(409, "SKU already exists");
        }
    } else {
        // Auto-generate SKU
        const prefix = name
            .replace(/\s+/g, "")
            .substring(0, 3)
            .toUpperCase();

        const lastItem = await Menu.findOne({
            sku: { $regex: `^${prefix}` },
        }).sort({ sku: -1 });

        sku = `${prefix}001`;

        if (lastItem) {
            const lastNumber = Number(lastItem.sku.slice(3));
            sku = `${prefix}${String(lastNumber + 1).padStart(3, "0")}`;
        }
    }

    const menuItem = await Menu.create({
        sku,
        name,
        price,
    });

    return menuItem;
};

export const getAllMenuItemsService = async () => {
  const menuItems = await Menu.find().sort({ createdAt: -1 });

  return menuItems;
};

export const updateMenuItemService = async (id, { sku, name, price }) => {
    const menuItem = await Menu.findById(id);

    if (!menuItem) {
        throw new ApiError(404, "Menu item not found");
    }

    // If SKU is changed, check uniqueness
    if (sku && sku !== menuItem.sku) {
        const existingSku = await Menu.findOne({
            sku: sku.toUpperCase().trim(),
        });

        if (existingSku) {
            throw new ApiError(409, "SKU already exists");
        }

        menuItem.sku = sku.toUpperCase().trim();
    }

    if (name) menuItem.name = name;

    if (price !== undefined) menuItem.price = price;

    await menuItem.save();

    return menuItem;
};

export const deleteMenuItemService = async (id) => {
    const menuItem = await Menu.findById(id);

    if (!menuItem) {
        throw new ApiError(404, "Menu item not found");
    }

    await Menu.findByIdAndDelete(id);

    return menuItem;
};