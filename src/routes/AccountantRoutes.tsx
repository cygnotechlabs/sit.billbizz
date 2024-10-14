import { RouteObject } from "react-router-dom";
import BankAccountView from "../features/accountant/Bank/BankAccountView";
import BankHome from "../features/accountant/Bank/BankHome";
import Cash from "../features/accountant/Cash/Cash";
import CashTableView from "../features/accountant/Cash/CashTableView";
import ChartOfAccountant from "../features/accountant/chartOfAccountant/ChartOfAccountant";
import ManualHome from "../features/accountant/manualJournel/ManualHome";
import ManualView from "../features/accountant/manualJournel/ManualView";
import NewJournal from "../features/accountant/manualJournel/newJournal/NewJournal";
import Accountant from "../pages/Accountant";
import AccountantInfo from "../features/accountant/accountantInfo/AccountantInfo";
import AccountantView from "../features/accountant/accountantView/AccountantView";
import DayBook from "../features/accountant/DayBook/DayBook";

const AccountantRoutes: RouteObject[] = [
  { path: "/accountant", element: <Accountant /> },
  { path: "/accountant/cash", element: <Cash /> },
  { path: "/accountant/cashView", element: <CashTableView /> },
  { path: "/accountant/manualjournal", element: <ManualHome /> },
  { path: "/accountant/manualjournal/view/:id", element: <ManualView /> },
  { path: "/accountant/newjournal", element: <NewJournal /> },
  { path: "/accountant/bank", element: <BankHome /> },
  { path: "/accountant/bank/account-view", element: <BankAccountView /> },
  { path: "/accountant/chart-OF-accountant", element: <ChartOfAccountant /> },
  { path: "/accountant/info", element: <AccountantInfo /> },
  { path: "/accountant/view/:id", element: <AccountantView /> },

{ path: "/accountant/daybook", element: <DayBook/> },
];

export default AccountantRoutes;
