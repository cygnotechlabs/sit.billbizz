import { RouteObject } from "react-router-dom";
import StaffHome from "../features/staffs/StaffHome";
import StaffsOverview from "../features/staffs/staffsView/StaffsOverview";
import Staffs from "../pages/Staffs";

const StaffRoutes: RouteObject[] = [
  { path: "/staffs", element: <Staffs /> },
  { path: "/staffs/home", element: <StaffHome /> },
  { path: "/staffs/view", element: <StaffsOverview /> },
];

export default StaffRoutes;
