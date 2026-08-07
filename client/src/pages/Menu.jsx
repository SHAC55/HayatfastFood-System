import { useState } from "react";
import { Search } from "lucide-react";

import MenuTable from "../components/menu/MenuTable";
import AddMenuModal from "../components/menu/AddMenuModal";
import EditMenuModal from "../components/menu/EditMenuModal";

const Menu = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Menu Management
          </h1>
          <p className="text-sm text-neutral-500 sm:text-base">
            Add, update and delete menu items.
          </p>
        </div>

        <button
          onClick={() => setOpenAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 sm:w-auto"
        >
          + Add Item
        </button>
      </div>

      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          size={20}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search menu by name or SKU..."
          className="w-full rounded-xl border border-neutral-200 bg-white py-3.5 pl-12 pr-4 text-base outline-none transition-colors focus:border-black"
        />
      </div>

      <MenuTable
        search={search}
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