import { Plus, Minus } from "lucide-react";

import useMenu from "../../hooks/useMenu";
import useOrder from "../../hooks/useOrder";

const MenuList = ({ search }) => {
  const { menuItems, loading } = useMenu();
  const { cartItems, addItem, increaseQuantity, decreaseQuantity } = useOrder();

  if (loading) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <p className="text-neutral-500">Loading menu…</p>
      </div>
    );
  }

  const filteredMenu = menuItems.filter((item) => {
    const value = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(value) ||
      item.sku.toLowerCase().includes(value)
    );
  });

  const getQuantity = (id) =>
    cartItems.find((c) => c.menuItem === id)?.quantity || 0;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6">
      <h2 className="mb-4 text-lg font-bold tracking-tight text-black sm:text-xl">
        Menu
      </h2>

      {filteredMenu.length === 0 ? (
        <p className="py-8 text-center text-sm text-neutral-500">
          No items match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filteredMenu.map((item) => {
            const qty = getQuantity(item._id);

            return (
              <div
                key={item._id}
                className="flex items-center justify-between rounded-xl border border-neutral-200 p-4"
              >
                <div className="min-w-0 pr-3">
                  <h3 className="truncate font-semibold text-black">
                    {item.name}
                  </h3>
                  <p className="text-sm text-neutral-500">{item.sku}</p>
                  <p className="mt-1 font-semibold text-black">₹{item.price}</p>
                </div>

                {qty === 0 ? (
                  <button
                    onClick={() => addItem(item)}
                    aria-label={`Add ${item.name}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform active:scale-95"
                  >
                    <Plus size={20} />
                  </button>
                ) : (
                  <div className="flex shrink-0 items-center gap-2 rounded-full border border-neutral-200 p-1">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      aria-label={`Decrease ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-black transition-transform active:scale-95"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-4 text-center text-sm font-bold text-black">
                      {qty}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      aria-label={`Increase ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform active:scale-95"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuList;