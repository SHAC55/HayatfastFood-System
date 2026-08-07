import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { X } from "lucide-react";

import useMenu from "../../hooks/useMenu";

const EditMenuModal = ({ open, onClose, selectedItem }) => {
    const { updateMenuItem } = useMenu();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (selectedItem) {
            reset({
                name: selectedItem.name,
                price: selectedItem.price,
                sku: selectedItem.sku,
            });
        }
    }, [selectedItem, reset]);

    const onSubmit = async (data) => {
        try {
            const response = await updateMenuItem(selectedItem._id, data);
            toast.success(response.message);
            onClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update menu item"
            );
        }
    };

    if (!open || !selectedItem) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-[2px] sm:items-center">
            <div className="w-full max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white p-6 sm:max-w-md sm:rounded-2xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight text-black">
                        Edit Menu Item
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black">
                            SKU
                        </label>
                        <input
                            {...register("sku")}
                            className="w-full rounded-xl border border-neutral-200 p-3.5 text-base outline-none focus:border-black"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-black">
                            Item Name
                        </label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full rounded-xl border border-neutral-200 p-3.5 text-base outline-none focus:border-black"
                        />
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name?.message}
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-black">
                            Price
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            {...register("price", {
                                required: "Price is required",
                                valueAsNumber: true,
                            })}
                            className="w-full rounded-xl border border-neutral-200 p-3.5 text-base outline-none focus:border-black"
                        />
                        <p className="mt-1 text-sm text-red-500">
                            {errors.price?.message}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-neutral-200 py-3 text-sm font-semibold text-black"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={isSubmitting}
                            className="rounded-xl bg-black py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
                        >
                            {isSubmitting ? "Updating…" : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMenuModal;