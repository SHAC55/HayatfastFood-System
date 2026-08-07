import { useState } from "react";
import SearchBar from "../components/order/SearchBar";
import MenuList from "../components/order/MenuList";
import OrderCart from "../components/order/OrderCart";
import OrderSummary from "../components/order/OrderSummary";
import CartDrawer from "../components/order/CartDrawer";
import useOrder from "../hooks/useOrder";

const CreateOrder = () => {
  const [search, setSearch] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, totalAmount } = useOrder();

  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="pb-24 lg:pb-0">
      <div className="space-y-6">
        <SearchBar search={search} setSearch={setSearch} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          <MenuList search={search} />

          {/* Cart is always visible on desktop, hidden on mobile (drawer instead) */}
          <div className="hidden space-y-6 lg:block">
            <OrderCart />
            <OrderSummary />
          </div>
        </div>
      </div>

      {/* Mobile sticky cart bar — only shows once something is added */}
      {itemCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between bg-black px-5 py-4 text-white shadow-[0_-4px_16px_rgba(0,0,0,0.15)] lg:hidden"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
              {itemCount}
            </span>
            View Cart
          </span>
          <span className="text-base font-bold">₹{totalAmount}</span>
        </button>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default CreateOrder;