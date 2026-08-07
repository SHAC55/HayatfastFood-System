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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-[2px] sm:items-center sm:p-4">
      <div className="flex max-h-[92vh] w-full flex-col rounded-t-2xl bg-white sm:max-w-md sm:rounded-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 p-4">
          <h2 className="text-lg font-bold tracking-tight text-black">
            Receipt Preview
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        {/* Printable Receipt */}
        <div className="overflow-y-auto">
          <div
            ref={receiptRef}
            className="mx-auto w-full max-w-[320px] bg-white p-6 font-mono text-sm text-black"
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold">HAYAT FOOD</h1>
              <p>Fast Food & Restaurant</p>
              <p>Near ABC Road, Mumbai</p>
              <p>+91 9876543210</p>
            </div>

            <hr className="my-4 border-dashed border-neutral-300" />

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Order</span>
                <span>{order.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Date</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer</span>
                <span>{order.customerName || "-"}</span>
              </div>
            </div>

            <hr className="my-4 border-dashed border-neutral-300" />

            <div>
              <div className="mb-2 flex justify-between font-bold">
                <span>Item</span>
                <span>Total</span>
              </div>

              {order.items.map((item, index) => (
                <div key={index} className="mb-2 flex justify-between">
                  <div>
                    <p>{item.name}</p>
                    <small>
                      ₹{item.price} × {item.quantity}
                    </small>
                  </div>
                  <span>₹{item.total}</span>
                </div>
              ))}
            </div>

            <hr className="my-4 border-dashed border-neutral-300" />

            <div className="flex justify-between text-lg font-bold">
              <span>TOTAL</span>
              <span>₹{order.totalAmount}</span>
            </div>

            <hr className="my-4 border-dashed border-neutral-300" />

            <div className="text-center">
              <p>Thank You!</p>
              <p>Visit Again</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-neutral-200 p-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-neutral-200 py-3 text-sm font-semibold text-black"
          >
            Close
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            <Printer size={16} />
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
