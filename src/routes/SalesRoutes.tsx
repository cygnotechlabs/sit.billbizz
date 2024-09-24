import { RouteObject } from "react-router-dom";
import CreditNote from "../features/sales/creditNote/CreditNote";
import NewCreditNote from "../features/sales/creditNote/NewCreditNote";
import ViewCreditNote from "../features/sales/creditNote/viewCreditNote/ViewCreditNote";
import InvoiceHome from "../features/sales/invoice/InvoiceHome";
import NewInvoice from "../features/sales/invoice/NewInvoice";
import ViewInvoice from "../features/sales/invoice/ViewInvoice";
import NewSalesQuote from "../features/sales/quote/NewSalesQuote";
import QuoteHome from "../features/sales/quote/QuoteHome";
import ViewSalesQuote from "../features/sales/quote/viewSalesQuote/ViewSalesQuote";
import AddReceiptForm from "../features/sales/Receipt/AddReceiptForm";
import ReceiptHome from "../features/sales/Receipt/ReceiptHome";
import ReceiptView from "../features/sales/Receipt/ReceiptView";
import NewSalesOrder from "../features/sales/salesOrder/NewSalesOrder";
import SalesOrder from "../features/sales/salesOrder/SalesOrder";
import ViewSalesOrder from "../features/sales/salesOrder/viewSalesQuote/ViewSalesQuote";
import SalesInfo from "../features/sales/SalesInfo";

const SalesRoutes: RouteObject[] = [
  { path: "/sales/salesorder", element: <SalesOrder /> },
  { path: "/sales/viewsalesorder", element: <ViewSalesOrder /> },
  { path: "/sales/salesorder/new", element: <NewSalesOrder /> },
  { path: "/sales/invoice", element: <InvoiceHome /> },
  { path: "/sales/invoice/new", element: <NewInvoice /> },
  { path: "/sales/invoice/view", element: <ViewInvoice /> },
  { path: "/sales/quote", element: <QuoteHome /> },
  { path: "/sales/quote/view", element: <ViewSalesQuote /> },
  { path: "/sales/quote/new", element: <NewSalesQuote /> },
  { path: "/sales/credit-note", element: <CreditNote /> },
  { path: "/sales/credit-note/new", element: <NewCreditNote /> },
  { path: "/sales/credit-note/view", element: <ViewCreditNote /> },
  { path: "/sales/receipt", element: <ReceiptHome /> },
  { path: "/sales/receipt/view", element: <ReceiptView /> },
  { path: "/sales/receipt/new", element: <AddReceiptForm /> },
  { path: "slaes/info", element: <SalesInfo /> },
];

export default SalesRoutes;
