import { createContext, useState } from "react";
import * as orderService from "../services/order.service";

export const SalesContext = createContext();

const SalesProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);

    const getOrders = async (params = {}) => {
        try {
            setLoading(true);

            const response = await orderService.getOrders(params);
            console.log(response.data.data.orders);
            setOrders(response.data.data.orders);
            setPagination(response.data.data.pagination);

            return response.data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SalesContext.Provider
            value={{
                orders,
                pagination,
                loading,
                getOrders,
            }}
        >
            {children}
        </SalesContext.Provider>
    );
};

export default SalesProvider;