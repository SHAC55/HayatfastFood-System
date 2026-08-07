import { useState } from "react";
import toast from "react-hot-toast";

import useOrder from "../../hooks/useOrder";
import ReceiptModal from "../receipt/ReceiptModal";

const OrderSummary = () => {
  const { customerName, setCustomerName, totalAmount, cartItems, placeOrder } =
    useOrder();

  const [receiptOpen, setReceiptOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAddSale = async () => {
    if (cartItems.length === 0) return toast.error("Please add items.");
    try {
      setSubmitting(true);
      await placeOrder();
      toast.success("Sale added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create order");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddAndPrint = async () => {
    if (cartItems.length === 0) return toast.error("Please add items.");
    try {
      setSubmitting(true);
      const createdOrder = await placeOrder();
      setOrder(createdOrder);
      setReceiptOpen(true);
      toast.success("Sale added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6">
        <h2 className="mb-4 text-lg font-bold tracking-tight text-black sm:text-xl">
          Order Summary
        </h2>

        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer name (optional)"
          className="mb-5 w-full rounded-xl border border-neutral-200 p-3.5 text-base outline-none transition-colors focus:border-black"
        />

        <div className="mb-5 flex items-center justify-between border-t border-neutral-200 pt-4 text-lg font-bold text-black">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleAddSale}
            disabled={submitting}
            className="rounded-xl border border-black bg-white py-3.5 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white disabled:opacity-50"
          >
            Add Sale
          </button>

          <button
            onClick={handleAddAndPrint}
            disabled={submitting}
            className="rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
          >
            Add & Print
          </button>
        </div>
      </div>

      <ReceiptModal
        open={receiptOpen}
        order={order}
        onClose={() => setReceiptOpen(false)}
      />
    </>
  );
};

export default OrderSummary;