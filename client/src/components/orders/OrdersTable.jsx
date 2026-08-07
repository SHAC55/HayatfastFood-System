import useSales from "../../hooks/useSales";

const OrdersTable = ({
    setSelectedOrder,
    setOpenReceipt,
}) => {
    const { orders, loading } = useSales();

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
                            Order ID
                        </th>

                        <th className="px-6 py-4 text-left">
                            Customer
                        </th>

                        <th className="px-6 py-4 text-left">
                            Total
                        </th>

                        <th className="px-6 py-4 text-left">
                            Date
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td
                                colSpan={4}
                                className="py-10 text-center"
                            >
                                No Orders Found
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr
                                key={order._id}
                                className="border-t"
                            >
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setOpenReceipt(true);
                                        }}
                                        className="font-semibold text-blue-600 hover:underline"
                                    >
                                        {order.orderId}
                                    </button>
                                </td>

                                <td className="px-6 py-4">
                                    {order.customerName || "-"}
                                </td>

                                <td className="px-6 py-4">
                                    ₹{order.totalAmount}
                                </td>

                                <td className="px-6 py-4">
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;