import { Navigate, useRoutes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './features/login/Login';
import Otp from './features/login/Otp';
import Layout from './layout/Layout';
import SettingsLayout from './layout/SettingsLayout';
import Chatboat from './pages/Chatboat/Chatboat';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/Error';
import LandingHome from './pages/LandingPage/LandingHome';
import AccountantRoutes from './routes/AccountantRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import ExpenseRoutes from './routes/ExpenseRoutes';
import InventoryRoutes from './routes/InventoryRoutes';
import PurchaseRoutes from './routes/PurchaseRoutes';
import SalesRoutes from './routes/SalesRoutes';
import SettingsRoutes from './routes/SettingsRoutes';
import StaffRoutes from './routes/StaffRoutes';
import SupplierRoutes from './routes/SupplierRoutes';

function App() {
  const { isAuthenticated } = useAuth();

  const routes = [
    {
      path: '/',
      element: isAuthenticated ? <Layout children /> : <Navigate to="/login" replace />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
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
      path: '/settings',
      element: isAuthenticated ? <SettingsLayout children /> : <Navigate to="/login" replace />,
      children: [{ path: '', element: <Navigate to="/login" replace /> }, ...SettingsRoutes],
    },
    {
      path: '/landing',
      element: isAuthenticated ? <LandingHome /> : <Navigate to="/login" replace />,
    },
    {
      path: '/chatboat',
      element: isAuthenticated ? <Chatboat /> : <Navigate to="/login" replace />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/otp',
      element: <Otp />,
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ];

  const element = useRoutes(routes);
  return <>{element}</>;
}

export default App;
