import { Search } from "lucide-react";

const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="relative">
            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
            />

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search menu by name or SKU..."
                className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 shadow-sm outline-none focus:border-blue-500"
            />
        </div>
    );
};

export default SearchBar;