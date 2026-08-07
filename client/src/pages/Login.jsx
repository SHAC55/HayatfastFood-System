import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import useAuth from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await login(data);
            toast.success(response.message);
            navigate("/create-order");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10 sm:bg-neutral-50">
            <div className="w-full max-w-sm">
                {/* Brand */}
                <div className="mb-8 text-center">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black">
                        <span className="text-lg font-bold text-white">H</span>
                    </div>

                    <div className="flex items-baseline justify-center gap-1.5">
                        <h1 className="text-2xl font-bold tracking-tight text-black">
                            Hayat
                        </h1>
                        <span className="text-2xl font-light tracking-tight text-neutral-400">
                            Food
                        </span>
                    </div>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                        POS System
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 sm:shadow-sm">
                    <h2 className="mb-6 text-lg font-semibold text-black">
                        Log in to continue
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-black">
                                Email
                            </label>

                            <input
                                type="email"
                                inputMode="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-neutral-200 px-4 py-3.5 text-base text-black outline-none transition-colors focus:border-black"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />

                            {errors.email && (
                                <p className="mt-1.5 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-black">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Enter password"
                                    className="w-full rounded-xl border border-neutral-200 px-4 py-3.5 pr-12 text-base text-black outline-none transition-colors focus:border-black"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={
                                        showPassword ? "Hide password" : "Show password"
                                    }
                                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-black"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="mt-1.5 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            disabled={isSubmitting}
                            className="w-full rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
                        >
                            {isSubmitting ? "Logging in…" : "Log In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;