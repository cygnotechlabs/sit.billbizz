import { RouteObject } from "react-router-dom";
import Settings from "../pages/Settings";
import CreateOrganizationForm from "../features/settings/organisation/CreateOrganizationFrom";
import InvoiceSettings from "../features/settings/organisation/InvoiceSettings";
import Taxes from "../features/settings/taxes/Taxes";
import GSTComponent from "../features/settings/taxes/gst/GSTComponent";
import VATComponent from "../features/settings/taxes/vat/VATComponent";
import Shipments from "../features/settings/sales/shipments/Shipments";
import DeliveryChallans from "../features/settings/sales/deliveryChallans/DeliveryChallans";
import Items from "../features/settings/items/Items";


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
  { path: "/settings/organization/profile", element: <CreateOrganizationForm /> },
  { path: "/settings/organization/invoice", element: <InvoiceSettings/> },
  { path: "/settings/taxes", element: <Taxes /> },
  { path: "/settings/taxes/GST", element: <GSTComponent /> },
  { path: "/settings/taxes/VAT", element: <VATComponent /> },
  { path: "/settings/sales/shipments", element: <Shipments /> },
  { path: "/settings/sales/deliverychallans", element: <DeliveryChallans /> },
  { path: "/settings/items/item",element:<Items/>}
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
