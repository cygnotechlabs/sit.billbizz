import { RouteObject } from "react-router-dom";
import Settings from "../pages/Settings";
import CreateOrganizationForm from "../features/settings/CreateOrganizationFrom";
// import Taxes from "../features/settings/taxes/Taxes";
// import Users from "../features/settings/users/Users";
// import Preferences from "../features/settings/preferences/Preferences";
// import Sales from "../features/settings/sales/Sales";
// import Purchases from "../features/settings/purchases/Purchases";
// import Items from "../features/settings/items/Items";
// import OnlinePayments from "../features/settings/onlinePayments/OnlinePayments";
// import Customization from "../features/settings/customization/Customization";
// import Reminder from "../features/settings/reminder/Reminder";

const SettingsRoutes: RouteObject[] = [
  { path: "/settings", element: <Settings /> },
  { path: "/settings/organization", element: <CreateOrganizationForm /> },
  //   { path: "/settings/taxes", element: <Taxes /> },
  //   { path: "/settings/users", element: <Users /> },
  //   { path: "/settings/preferences", element: <Preferences /> },
  //   { path: "/settings/sales", element: <Sales /> },
  //   { path: "/settings/purchases", element: <Purchases /> },
  //   { path: "/settings/items", element: <Items /> },
  //   { path: "/settings/online-payments", element: <OnlinePayments /> },
  //   { path: "/settings/customization", element: <Customization /> },
  //   { path: "/settings/reminder", element: <Reminder /> },
];

export default SettingsRoutes;
