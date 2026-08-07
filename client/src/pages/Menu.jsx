import { useState } from "react";

import MenuTable from "../components/menu/MenuTable";
import AddMenuModal from "../components/menu/AddMenuModal";
import EditMenuModal from "../components/menu/EditMenuModal";

const Menu = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Menu Management
                    </h1>

                    <p className="text-gray-500">
                        Add, update and delete menu items.
                    </p>
                </div>

                <button
                    onClick={() => setOpenAddModal(true)}
                    className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                >
                    + Add Item
                </button>
            </div>

            <MenuTable
                setSelectedItem={setSelectedItem}
                setOpenEditModal={setOpenEditModal}
            />

            <AddMenuModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
            />

            <EditMenuModal
                open={openEditModal}
                onClose={() => {
                    setOpenEditModal(false);
                    setSelectedItem(null);
                }}
                selectedItem={selectedItem}
            />
        </div>
    );
};

export default Menu;