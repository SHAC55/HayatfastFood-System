import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

import AuthProvider from "./context/AuthContext";
import OrderProvider from "./context/OrderContext.jsx";
import MenuProvider from "./context/MenuContext.jsx";
import SalesProvider from "./context/SalesContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <MenuProvider>
        <OrderProvider>
          <SalesProvider>
            <Toaster position="top-right" />
            <App />
          </SalesProvider>
        </OrderProvider>
      </MenuProvider>
    </AuthProvider>
  </BrowserRouter>,
);
