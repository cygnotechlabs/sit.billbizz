import { useRoutes } from "react-router-dom";
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


function App() {
  const routes = [
    {
      path: "/",
      element: <Layout children />,
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
      path: "/",
      element: <SettingsLayout children />,
      children: [{ path: "" }, ...SettingsRoutes],
    },
    {
      path: "/landing",
      element: <LandingHome/>,
    },
    {
      path: "/chatboat",
      element: <Chatboat/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/otp",
      element: <Otp/>,
    },
  ];

  const element = useRoutes(routes);
  return <>{element}</>;
}

export default App;
