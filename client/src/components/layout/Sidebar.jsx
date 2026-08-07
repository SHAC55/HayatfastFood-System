import {
    ShoppingCart,
    UtensilsCrossed,
    ReceiptText,
    LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
    const { logout } = useAuth();

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <aside className="flex w-64 flex-col bg-slate-900 text-white">
            {/* Logo */}
            <div className="border-b border-slate-800 px-6 py-5">
                <h1 className="text-2xl font-bold text-blue-500">
                    Hayat Food
                </h1>
                <p className="text-sm text-slate-400">POS System</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-4">
                <NavLink
                    to="/create-order"
                    className={navLinkClass}
                >
                    <ShoppingCart size={20} />
                    <span>Generate Order</span>
                </NavLink>

                <NavLink
                    to="/menu"
                    className={navLinkClass}
                >
                    <UtensilsCrossed size={20} />
                    <span>Menu</span>
                </NavLink>

                <NavLink
                    to="/sales-history"
                    className={navLinkClass}
                >
                    <ReceiptText size={20} />
                    <span>Sales History</span>
                </NavLink>
            </nav>

            {/* Logout */}
            <div className="border-t border-slate-800 p-4">
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;