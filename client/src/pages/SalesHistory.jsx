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
        <h1 className="text-3xl font-bold">Sales History</h1>

        <p className="text-gray-500">View all previous orders.</p>
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
