import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Printer, X } from "lucide-react";

const ReceiptModal = ({ open, order, onClose }) => {
    const receiptRef = useRef();

    const handlePrint = useReactToPrint({
        contentRef: receiptRef,
        documentTitle: order?.orderId,
    });

    if (!open || !order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b p-4">

                    <h2 className="text-xl font-bold">
                        Receipt Preview
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded p-2 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Printable Receipt */}

                <div
                    ref={receiptRef}
                    className="mx-auto w-[320px] bg-white p-6 font-mono text-sm"
                >

                    <div className="text-center">

                        <h1 className="text-2xl font-bold">
                            HAYAT FOOD
                        </h1>

                        <p>Fast Food & Restaurant</p>

                        <p>Near ABC Road, Mumbai</p>

                        <p>+91 9876543210</p>

                    </div>

                    <hr className="my-4 border-dashed" />

                    <div className="space-y-1">

                        <div className="flex justify-between">
                            <span>Order</span>
                            <span>{order.orderId}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Date</span>
                            <span>
                                {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Time</span>
                            <span>
                                {new Date(order.createdAt).toLocaleTimeString()}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Customer</span>
                            <span>{order.customerName || "-"}</span>
                        </div>

                    </div>

                    <hr className="my-4 border-dashed" />

                    <div>

                        <div className="mb-2 flex justify-between font-bold">
                            <span>Item</span>
                            <span>Total</span>
                        </div>

                        {order.items.map((item, index) => (

                            <div
                                key={index}
                                className="mb-2 flex justify-between"
                            >

                                <div>

                                    <p>{item.name}</p>

                                    <small>
                                        ₹{item.price} × {item.quantity}
                                    </small>

                                </div>

                                <span>
                                    ₹{item.total}
                                </span>

                            </div>

                        ))}

                    </div>

                    <hr className="my-4 border-dashed" />

                    <div className="flex justify-between text-lg font-bold">

                        <span>TOTAL</span>

                        <span>
                            ₹{order.totalAmount}
                        </span>

                    </div>

                    <hr className="my-4 border-dashed" />

                    <div className="text-center">

                        <p>Thank You!</p>

                        <p>Visit Again</p>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t p-4">

                    <button
                        onClick={onClose}
                        className="rounded-lg border px-4 py-2"
                    >
                        Close
                    </button>

                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                        <Printer size={18} />
                        Print
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ReceiptModal;