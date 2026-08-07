import { useEffect, useState } from "react";
import OrdersTable from "../components/orders/OrdersTable";
import useSales from "../hooks/useSales";
import ReceiptModal from "../components/receipt/ReceiptModal";

const SalesHistory = () => {
  const { getOrders } = useSales();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openReceipt, setOpenReceipt] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
          Sales History
        </h1>
        <p className="text-sm text-neutral-500 sm:text-base">
          View all previous orders.
        </p>
      </div>

      <OrdersTable
        setSelectedOrder={setSelectedOrder}
        setOpenReceipt={setOpenReceipt}
      />

      <ReceiptModal
        open={openReceipt}
        order={selectedOrder}
        onClose={() => setOpenReceipt(false)}
      />
    </div>
  );
};

export default SalesHistory;