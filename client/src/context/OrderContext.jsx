import { createContext, useMemo, useState } from "react";
import * as orderService from "../services/order.service";

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState("");

  // Add Item
  const addItem = (menuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.menuItem === menuItem._id);

      if (existing) {
        return prev.map((item) =>
          item.menuItem === menuItem._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          menuItem: menuItem._id,
          sku: menuItem.sku,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        },
      ];
    });
  };

  // Increase Quantity
  const increaseQuantity = (menuItemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.menuItem === menuItemId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (menuItemId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.menuItem === menuItemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Remove Item
  const removeItem = (menuItemId) => {
    setCartItems((prev) => prev.filter((item) => item.menuItem !== menuItemId));
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
    setCustomerName("");
  };

  // Total Amount
  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  // Place Order
  const placeOrder = async () => {
    const payload = {
      customerName,
      items: cartItems.map((item) => ({
        menuItem: item.menuItem,
        quantity: item.quantity,
      })),
    };

    const response = await orderService.createOrder(payload);

    setCartItems([]);
    setCustomerName("");

    return response.data.data; // return created order
  };

  return (
    <OrderContext.Provider
      value={{
        cartItems,
        customerName,
        setCustomerName,

        addItem,
        removeItem,

        increaseQuantity,
        decreaseQuantity,

        clearCart,

        totalAmount,

        placeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
