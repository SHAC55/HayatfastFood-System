import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import useMenu from "../../hooks/useMenu";

const MenuTable = ({ search, setSelectedItem, setOpenEditModal }) => {
    const { menuItems, loading, deleteMenuItem } = useMenu();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this item?"
        );
        if (!confirmDelete) return;

        try {
            await deleteMenuItem(id);
            toast.success("Menu item deleted successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete item"
            );
        }
    };

    if (loading) {
        return (
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
                <p className="text-neutral-500">Loading…</p>
            </div>
        );
    }

    const filteredItems = menuItems.filter((item) => {
        const value = search.toLowerCase();
        return (
            item.name.toLowerCase().includes(value) ||
            item.sku.toLowerCase().includes(value)
        );
    });

    if (filteredItems.length === 0) {
        return (
            <div className="rounded-xl border border-neutral-200 bg-white p-10 text-center">
                <p className="text-neutral-500">
                    {search ? "No items match your search." : "No menu items found."}
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Mobile: card list */}
            <div className="space-y-3 sm:hidden">
                {filteredItems.map((item) => (
                    <div
                        key={item._id}
                        className="rounded-xl border border-neutral-200 bg-white p-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h3 className="truncate font-semibold text-black">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-neutral-500">{item.sku}</p>
                            </div>
                            <span className="shrink-0 font-bold text-black">
                                ₹{item.price}
                            </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <button
                                onClick={() => {
                                    setSelectedItem(item);
                                    setOpenEditModal(true);
                                }}
                                className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 py-2.5 text-sm font-medium text-black active:scale-95"
                            >
                                <Pencil size={15} />
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(item._id)}
                                className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 py-2.5 text-sm font-medium text-black active:scale-95"
                            >
                                <Trash2 size={15} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden overflow-hidden rounded-xl border border-neutral-200 bg-white sm:block">
                <table className="min-w-full">
                    <thead className="border-b border-neutral-200 bg-neutral-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                SKU
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                Item
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                Price
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredItems.map((item) => (
                            <tr
                                key={item._id}
                                className="border-t border-neutral-200 hover:bg-neutral-50"
                            >
                                <td className="px-6 py-4 text-neutral-600">{item.sku}</td>
                                <td className="px-6 py-4 font-medium text-black">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 font-medium text-black">
                                    ₹{item.price}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedItem(item);
                                                setOpenEditModal(true);
                                            }}
                                            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MenuTable;