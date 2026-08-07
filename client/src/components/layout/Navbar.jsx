import { Menu } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-800 bg-black px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white transition-colors hover:bg-neutral-800 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl">
            Welcome
          </h2>
          <p className="hidden text-sm text-neutral-400 sm:block">
            Manage your restaurant efficiently.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium leading-tight text-white">
            {user?.name || "Admin"}
          </p>
          <p className="text-xs text-neutral-400">Administrator</p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>
      </div>
    </header>
  );
};

export default Navbar;