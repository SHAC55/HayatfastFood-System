import { X } from "lucide-react";
import OrderCart from "./OrderCart";
import OrderSummary from "./OrderSummary";

const CartDrawer = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[88vh] overflow-y-auto rounded-t-2xl bg-white transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-black">Your Order</h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-5">
          <OrderCart />
          <OrderSummary />
        </div>
      </div>
    </>
  );
};

export default CartDrawer;