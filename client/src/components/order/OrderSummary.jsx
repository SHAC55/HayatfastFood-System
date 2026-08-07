import { useState } from "react";
import toast from "react-hot-toast";

import useOrder from "../../hooks/useOrder";
import ReceiptModal from "../receipt/ReceiptModal";

const OrderSummary = () => {
    const {
        customerName,
        setCustomerName,
        totalAmount,
        cartItems,
        placeOrder,
    } = useOrder();

    const [receiptOpen, setReceiptOpen] = useState(false);
    const [order, setOrder] = useState(null);

    // Add Sale Only
    const handleAddSale = async () => {
        if (cartItems.length === 0) {
            return toast.error("Please add items.");
        }

        try {
            await placeOrder();

            toast.success("Sale Added Successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to create order"
            );
        }
    };

    // Add Sale & Print Receipt
    const handleAddAndPrint = async () => {
        if (cartItems.length === 0) {
            return toast.error("Please add items.");
        }

        try {
            const createdOrder = await placeOrder();

            setOrder(createdOrder);

            setReceiptOpen(true);

            toast.success("Sale Added Successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to create order"
            );
        }
    };

    return (
        <>
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                    Order Summary
                </h2>

                <input
                    value={customerName}
                    onChange={(e) =>
                        setCustomerName(e.target.value)
                    }
                    placeholder="Customer Name (Optional)"
                    className="mb-5 w-full rounded-lg border p-3"
                />

                <div className="mb-6 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={handleAddSale}
                        className="rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                    >
                        Add Sale
                    </button>

                    <button
                        onClick={handleAddAndPrint}
                        className="rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
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