import { Minus, Plus, Trash2 } from "lucide-react";
import useOrder from "../../hooks/useOrder";

const OrderCart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } =
    useOrder();

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6">
      <h2 className="mb-4 text-lg font-bold tracking-tight text-black sm:text-xl">
        Selected Items
      </h2>

      {cartItems.length === 0 ? (
        <p className="py-6 text-center text-sm text-neutral-500">
          No items selected.
        </p>
      ) : (
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.menuItem}
              className="rounded-xl border border-neutral-200 p-4"
            >
              <div className="flex justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-black">
                    {item.name}
                  </h3>
                  <p className="text-sm text-neutral-500">₹{item.price}</p>
                </div>

                <button
                  onClick={() => removeItem(item.menuItem)}
                  aria-label={`Remove ${item.name}`}
                  className="shrink-0 text-neutral-400 hover:text-black"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 p-1">
                  <button
                    onClick={() => decreaseQuantity(item.menuItem)}
                    aria-label="Decrease quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-black active:scale-95"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="w-4 text-center text-sm font-bold text-black">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.menuItem)}
                    aria-label="Increase quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white active:scale-95"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <span className="font-bold text-black">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderCart;