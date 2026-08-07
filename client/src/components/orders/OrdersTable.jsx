import { Receipt } from "lucide-react";
import useSales from "../../hooks/useSales";

const OrdersTable = ({ setSelectedOrder, setOpenReceipt }) => {
  const { orders, loading } = useSales();

  if (loading) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <p className="text-neutral-500">Loading…</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-10 text-center">
        <p className="text-neutral-500">No orders found.</p>
      </div>
    );
  }

  const openOrder = (order) => {
    setSelectedOrder(order);
    setOpenReceipt(true);
  };

  return (
    <>
      {/* Mobile: card list */}
      <div className="space-y-3 sm:hidden">
        {orders.map((order) => (
          <button
            key={order._id}
            onClick={() => openOrder(order)}
            className="flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 text-left active:scale-[0.98]"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold text-black">
                {order.orderId}
              </p>
              <p className="text-sm text-neutral-500">
                {order.customerName || "Walk-in customer"}
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span className="font-bold text-black">₹{order.totalAmount}</span>
              <Receipt size={18} className="text-neutral-400" />
            </div>
          </button>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-xl border border-neutral-200 bg-white sm:block">
        <table className="min-w-full">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-neutral-200 hover:bg-neutral-50"
              >
                <td className="px-6 py-4">
                  <button
                    onClick={() => openOrder(order)}
                    className="font-semibold text-black underline decoration-neutral-300 underline-offset-2 hover:decoration-black"
                  >
                    {order.orderId}
                  </button>
                </td>
                <td className="px-6 py-4 text-neutral-600">
                  {order.customerName || "-"}
                </td>
                <td className="px-6 py-4 font-medium text-black">
                  ₹{order.totalAmount}
                </td>
                <td className="px-6 py-4 text-neutral-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrdersTable;
