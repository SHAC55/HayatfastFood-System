import { createContext, useEffect, useState } from "react";
import * as menuService from "../services/menu.service";

export const MenuContext = createContext();

const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get All Menu Items
    const fetchMenu = async () => {
        try {
            setLoading(true);

            const response = await menuService.getMenu();

            setMenuItems(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Add Menu Item
    const addMenuItem = async (data) => {
        const response = await menuService.createMenu(data);

        setMenuItems((prev) => [...prev, response.data.data]);

        return response.data;
    };

    // Update Menu Item
    const updateMenuItem = async (id, data) => {
        const response = await menuService.updateMenu(id, data);

        setMenuItems((prev) =>
            prev.map((item) =>
                item._id === id ? response.data.data : item
            )
        );

        return response.data;
    };

    // Delete Menu Item
    const deleteMenuItem = async (id) => {
        await menuService.deleteMenu(id);

        setMenuItems((prev) =>
            prev.filter((item) => item._id !== id)
        );
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <MenuContext.Provider
            value={{
                menuItems,
                loading,

                fetchMenu,

                addMenuItem,

                updateMenuItem,

                deleteMenuItem,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export default MenuProvider;