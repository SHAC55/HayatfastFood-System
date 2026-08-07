import toast from "react-hot-toast";
import useMenu from "../../hooks/useMenu";

const MenuTable = ({
    setSelectedItem,
    setOpenEditModal,
}) => {
    const {
        menuItems,
        loading,
        deleteMenuItem,
    } = useMenu();

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
                error.response?.data?.message ||
                    "Failed to delete item"
            );
        }
    };

    if (loading) {
        return (
            <div className="rounded-xl bg-white p-6 shadow-sm">
                Loading...
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <table className="min-w-full">
                <thead className="bg-slate-100">
                    <tr>
                        <th className="px-6 py-4 text-left">
                            SKU
                        </th>

                        <th className="px-6 py-4 text-left">
                            Item
                        </th>

                        <th className="px-6 py-4 text-left">
                            Price
                        </th>

                        <th className="px-6 py-4 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {menuItems.length === 0 ? (
                        <tr>
                            <td
                                colSpan={4}
                                className="py-8 text-center"
                            >
                                No menu items found.
                            </td>
                        </tr>
                    ) : (
                        menuItems.map((item) => (
                            <tr
                                key={item._id}
                                className="border-t"
                            >
                                <td className="px-6 py-4">
                                    {item.sku}
                                </td>

                                <td className="px-6 py-4 font-medium">
                                    {item.name}
                                </td>

                                <td className="px-6 py-4">
                                    ₹{item.price}
                                </td>

                                <td className="space-x-2 px-6 py-4 text-center">
                                    <button
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setOpenEditModal(true);
                                        }}
                                        className="rounded bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(item._id)
                                        }
                                        className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MenuTable;