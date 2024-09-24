import { useRoutes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Layout from "./layout/Layout";
import SettingsLayout from "./layout/SettingsLayout";
import Dashboard from "./pages/Dashboard";
import AccountantRoutes from "./routes/AccountantRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import ExpenseRoutes from "./routes/ExpenseRoutes";
import InventoryRoutes from "./routes/InventoryRoutes";
import PurchaseRoutes from "./routes/PurchaseRoutes";
import SalesRoutes from "./routes/SalesRoutes";
import SettingsRoutes from "./routes/SettingsRoutes";
import StaffRoutes from "./routes/StaffRoutes";
import SupplierRoutes from "./routes/SupplierRoutes";
import LandingHome from "./pages/LandingPage/LandingHome";
import Login from "./features/login/Login";
import Otp from "./features/login/Otp";
import Chatboat from "./pages/Chatboat/Chatboat";

// Simulated auth check (can be replaced by real auth logic)
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate a check for authentication (e.g., token check)
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return { isAuthenticated };
};

function App() {
  const { isAuthenticated } = useAuth();

  const routes = [
    {
      path: "/",
      element: isAuthenticated ? <Layout children={undefined} /> : <Navigate to="/login" />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        ...AccountantRoutes,
        ...CustomerRoutes,
        ...InventoryRoutes,
        ...PurchaseRoutes,
        ...SalesRoutes,
        ...ExpenseRoutes,
        ...StaffRoutes,
        ...SupplierRoutes,
      ],
    },
    {
      path: "/settings",
      element: isAuthenticated ? <SettingsLayout children={undefined} /> : <Navigate to="/login" />,
      children: [{ path: "", element: <Dashboard /> }, ...SettingsRoutes],
    },
    {
      path: "/landing",
      element: <LandingHome />,
    },
    {
      path: "/chatboat",
      element: <Chatboat />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/otp",
      element: <Otp />,
    },
  ];

  const element = useRoutes(routes);
  return <>{element}</>;
}

export default App;
