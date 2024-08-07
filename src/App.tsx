import { useRoutes } from "react-router-dom";
import "./App.css";
import Root from "./Root";
import Dashboard from "./pages/Dashboard";
import AccountantRoutes from "./routes/AccountantRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import ExpenseRoutes from "./routes/ExpenseRoutes";
import InventoryRoutes from "./routes/InventoryRoutes";
import PurchaseRoutes from "./routes/PurchaseRoutes";
import SalesRoutes from "./routes/SalesRoutes";
import StaffRoutes from "./routes/StaffRoutes";
import SupplierRoutes from "./routes/SupplierRoutes";
import SettingsRoutes from "./routes/SettingsRoutes";

function App() {
  const routes = [
    {
      path: "/",
      element: <Root />,
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
        ...SettingsRoutes,
      ],
    },
  ];

  const element = useRoutes(routes);
  return <>{element}</>;
}

export default App;
