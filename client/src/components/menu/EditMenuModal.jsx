import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
            const response = await updateMenuItem(
                selectedItem._id,
                data
            );

            toast.success(response.message);

            onClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update menu item"
            );
        }
    };

    if (!open || !selectedItem) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-xl bg-white p-6">

                <h2 className="mb-6 text-2xl font-bold">
                    Edit Menu Item
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div>
                        <label className="mb-2 block">
                            SKU
                        </label>

                        <input
                            {...register("sku")}
                            className="w-full rounded-lg border p-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block">
                            Item Name
                        </label>

                        <input
                            {...register("name", {
                                required: "Name is required",
                            })}
                            className="w-full rounded-lg border p-3"
                        />

                        <p className="text-sm text-red-500">
                            {errors.name?.message}
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block">
                            Price
                        </label>

                        <input
                            type="number"
                            {...register("price", {
                                required: "Price is required",
                                valueAsNumber: true,
                            })}
                            className="w-full rounded-lg border p-3"
                        />

                        <p className="text-sm text-red-500">
                            {errors.price?.message}
                        </p>
                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-5 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={isSubmitting}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                        >
                            {isSubmitting
                                ? "Updating..."
                                : "Update"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default EditMenuModal;