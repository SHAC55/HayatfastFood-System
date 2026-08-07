import { createContext, useEffect, useState } from "react";
import * as authService from "../services/auth.service";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (credentials) => {
        const response = await authService.login(credentials);

        setUser(response.data.data.user);
        setIsAuthenticated(true);

        return response.data;
    };

    const logout = async () => {
        await authService.logout();

        setUser(null);
        setIsAuthenticated(false);
    };

    const getMe = async () => {
        try {
            const response = await authService.getMe();

            setUser(response.data.data);
            setIsAuthenticated(true);
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                login,
                logout,
                getMe,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;