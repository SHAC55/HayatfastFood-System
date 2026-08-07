import Menu from "../models/menu.model.js";
import Order from "../models/order.model.js";
import ApiError from "../utils/ApiError.js";

export const createOrderService = async ({ customerName = "", items }) => {
  if (!items || items.length === 0) {
    throw new ApiError(400, "At least one item is required");
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const item of items) {
    const menuItem = await Menu.findById(item.menuItem);

    if (!menuItem) {
      throw new ApiError(404, `Menu item not found`);
    }

    const quantity = Number(item.quantity);

    if (quantity <= 0) {
      throw new ApiError(400, "Quantity must be greater than 0");
    }

    const total = menuItem.price * quantity;

    totalAmount += total;

    orderItems.push({
      menuItem: menuItem._id,
      sku: menuItem.sku,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
      total,
    });
  }

  // Generate Order ID
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");

  const weekDay = now
    .toLocaleDateString("en-US", {
      weekday: "short",
    })
    .toUpperCase();

  const prefix = `HF-${day}-${weekDay}`;

  const lastOrder = await Order.findOne({
    orderId: { $regex: `^${prefix}` },
  }).sort({ createdAt: -1 });

  let sequence = "01";

  if (lastOrder) {
    const lastSequence = Number(lastOrder.orderId.split("-").pop());

    sequence = String(lastSequence + 1).padStart(2, "0");
  }

  const orderId = `${prefix}-${sequence}`;

  const order = await Order.create({
    orderId,
    customerName,
    items: orderItems,
    totalAmount,
  });

  return order;
};

export const getAllOrdersService = async (query) => {
  const { page = 1, limit = 10, search = "", startDate, endDate } = query;

  const filter = {};

  // Search by Order ID or Customer Name
  if (search) {
    filter.$or = [
      { orderId: { $regex: search, $options: "i" } },
      { customerName: { $regex: search, $options: "i" } },
    ];
  }

  // Date Filter
  if (startDate || endDate) {
    filter.createdAt = {};

    if (startDate) {
      filter.createdAt.$gte = new Date(startDate);
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = end;
    }
  }

  const currentPage = Number(page);
  const perPage = Number(limit);

  const totalOrders = await Order.countDocuments(filter);

  const orders = await Order.find(filter)
    .populate("items.menuItem", "name sku")
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * perPage)
    .limit(perPage);

  return {
    orders,
    pagination: {
      totalOrders,
      currentPage,
      perPage,
      totalPages: Math.ceil(totalOrders / perPage),
    },
  };
};

export const getOrderByIdService = async (id) => {
    const order = await Order.findById(id).populate(
        "items.menuItem",
        "name sku"
    );

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    return order;
};
