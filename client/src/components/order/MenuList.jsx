import { Plus } from "lucide-react";

import useMenu from "../../hooks/useMenu";
import useOrder from "../../hooks/useOrder";

const MenuList = ({ search }) => {
    const { menuItems, loading } = useMenu();
    const { addItem } = useOrder();

    if (loading) {
        return (
            <div className="rounded-xl bg-white p-6 shadow-sm">
                Loading menu...
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

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">
                Menu
            </h2>

            <div className="space-y-3">
                {filteredMenu.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-center justify-between rounded-lg border p-4"
                    >
                        <div>
                            <h3 className="font-semibold">
                                {item.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {item.sku}
                            </p>
                        </div>

                        <div className="flex items-center gap-5">
                            <span className="font-semibold text-green-600">
                                ₹{item.price}
                            </span>

                            <button
                                onClick={() => addItem(item)}
                                className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuList;