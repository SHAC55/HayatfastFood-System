import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Menu from "../pages/Menu";
import CreateOrder from "../pages/CreateOrder";
import SalesHistory from "../pages/SalesHistory";

import ProtectedRoute from "../routes/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="menu" element={<Menu />} />
        <Route path="create-order" element={<CreateOrder />} />
        <Route path="sales-history" element={<SalesHistory />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
