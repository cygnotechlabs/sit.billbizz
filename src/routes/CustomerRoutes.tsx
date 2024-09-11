
import { RouteObject } from "react-router-dom";
import Customer from "../pages/Customer";
import CustomerHome from "../features/Customer/CustomerHome/CustomerHome";
import SeeCustomerDetails from "../features/Customer/CustomerHome/SeeCustomerDetails";
import SeeCustomerInfo from "../features/Customer/SeeCustomerInfo";


const CustomerRoutes: RouteObject[] = [
  { path: "/customer", element: <Customer /> },
  { path: "/customer/home", element: <CustomerHome /> },
  { path: "/customer/view/:id", element: <SeeCustomerDetails /> },
  {path:"/customer/info",element:<SeeCustomerInfo/>},
];

export default CustomerRoutes;
