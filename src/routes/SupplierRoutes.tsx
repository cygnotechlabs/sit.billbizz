import { RouteObject } from "react-router-dom";
import SupplierHome from "../features/Supplier/SupplierHome/SupplierHome";
import SeeSupplierDetails from "../features/Supplier/SupplierHome/ViewSupplier/SeeSupplierDetails";
import Supplier from "../pages/Supplier";
import SupplierInfo from "../features/Supplier/SupplierInfo";

const SupplierRoutes: RouteObject[] = [
  { path: "/supplier", element: <Supplier /> },
  { path: "/supplier/home", element: <SupplierHome /> },
  { path: "/supplier/view/:id", element: <SeeSupplierDetails /> },
  { path:'/supplier/info', element:<SupplierInfo/>}
];

export default SupplierRoutes;
