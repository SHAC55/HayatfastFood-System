import {
  ShoppingCart,
  UtensilsCrossed,
  ReceiptText,
  LogOut,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const navItems = [
  { to: "/create-order", label: "Generate Order", icon: ShoppingCart },
  { to: "/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/sales-history", label: "Sales History", icon: ReceiptText },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-150 ${
      isActive
        ? "bg-black text-white"
        : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
    }`;

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 -translate-x-full flex-col bg-white transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-64 lg:translate-x-0 lg:border-r lg:border-neutral-200 ${
          isOpen ? "translate-x-0" : ""
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div>
            <div className="flex items-baseline gap-1.5">
              <h1 className="text-xl font-bold tracking-tight text-black">
                Hayat
              </h1>
              <span className="text-xl font-light tracking-tight text-neutral-400">
                Food
              </span>
            </div>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
              POS System
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="h-px bg-neutral-200" />

        <nav className="flex-1 space-y-1 px-4 py-6">
          <p className="px-3.5 pb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
            Menu
          </p>

          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={navLinkClass}
            >
              <Icon
                size={18}
                className="shrink-0 transition-transform duration-150 group-hover:scale-110"
              />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-neutral-200 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-neutral-500 transition-colors duration-150 hover:bg-black hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
