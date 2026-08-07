import { useState } from "react";

import SearchBar from "../components/order/SearchBar";
import MenuList from "../components/order/MenuList";
import OrderCart from "../components/order/OrderCart";
import OrderSummary from "../components/order/OrderSummary";

const CreateOrder = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-6">
            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <MenuList search={search} />

                <div className="space-y-6">
                    <OrderCart />
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
};

export default CreateOrder;