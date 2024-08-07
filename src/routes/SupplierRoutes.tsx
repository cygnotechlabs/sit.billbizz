import { RouteObject } from "react-router-dom";
import SupplierHome from "../features/Supplier/SupplierHome/SupplierHome";
import SeeSupplierDetails from "../features/Supplier/SupplierHome/ViewSupplier/SeeSupplierDetails";
import Supplier from "../pages/Supplier";

const SupplierRoutes: RouteObject[] = [
  { path: "/supplier", element: <Supplier /> },
  { path: "/supplier/home", element: <SupplierHome /> },
  { path: "/supplier/view", element: <SeeSupplierDetails /> },
];

export default SupplierRoutes;
