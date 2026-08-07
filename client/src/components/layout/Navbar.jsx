import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user } = useAuth();

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
            <div>
                <h2 className="text-xl font-semibold text-slate-800">
                    Welcome 👋
                </h2>

                <p className="text-sm text-slate-500">
                    Manage your restaurant efficiently.
                </p>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
                    {user?.name?.charAt(0).toUpperCase() || "A"}
                </div>

                <div>
                    <p className="font-medium text-slate-800">
                        {user?.name || "Admin"}
                    </p>

                    <p className="text-sm text-slate-500">
                        Administrator
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Navbar;