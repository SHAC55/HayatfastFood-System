import { Minus, Plus, Trash2 } from "lucide-react";
import useOrder from "../../hooks/useOrder";

const OrderCart = () => {
    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
    } = useOrder();

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">
                Selected Items
            </h2>

            {cartItems.length === 0 ? (
                <p>No items selected.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.menuItem}
                            className="rounded-lg border p-4"
                        >
                            <div className="flex justify-between">

                                <div>
                                    <h3 className="font-semibold">
                                        {item.name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        ₹{item.price}
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        removeItem(item.menuItem)
                                    }
                                    className="text-red-600"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="mt-4 flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(item.menuItem)
                                        }
                                        className="rounded bg-gray-200 px-3 py-1"
                                    >
                                        <Minus size={16} />
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQuantity(item.menuItem)
                                        }
                                        className="rounded bg-gray-200 px-3 py-1"
                                    >
                                        <Plus size={16} />
                                    </button>

                                </div>

                                <span className="font-bold">
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