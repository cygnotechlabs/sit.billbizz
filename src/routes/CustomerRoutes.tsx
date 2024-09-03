
import { RouteObject } from "react-router-dom";
import Customer from "../pages/Customer";
import CustomerHome from "../features/Customer/CustomerHome/CustomerHome";
import SeeCustomerDetails from "../features/Customer/CustomerHome/SeeCustomerDetails";

const CustomerRoutes: RouteObject[] = [
  { path: "/customer", element: <Customer /> },
  { path: "/customer/home", element: <CustomerHome /> },
  { path: "/customer/view/:id", element: <SeeCustomerDetails /> },
];

export default CustomerRoutes;
