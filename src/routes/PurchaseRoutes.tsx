import { RouteObject } from "react-router-dom";
import Purchase from "../pages/Purchase";
import BillsHomes from "../features/purchase/bills/BillsHomes";
import NewBills from "../features/purchase/bills/NewBills";
import ViewBills from "../features/purchase/bills/ViewBill/viewDebitNote/ViewBills";
import DebitNote from "../features/purchase/debitNote/DebitNote";
import NewDebitNote from "../features/purchase/debitNote/NewDebitNote";
import ViewDebitNote from "../features/purchase/debitNote/viewDebitNote/ViewDebitNote";
import PaymentMade from "../features/purchase/paymentMade/PaymentMade";
import PaymentView from "../features/purchase/paymentMade/PaymentView/PaymentView";
import PurchaseOrder from "../features/purchase/purchaseOrder/PurchaseOrder";
import NewPurchaseOrder from "../features/purchase/purchaseOrder/addPurchaseOrder/NewPurchaseOrder";
import ViewPurchaseOrder from "../features/purchase/purchaseOrder/viewPurchaseOrder/ViewPurchaseOrder";
import AddPaymentMade from "../features/purchase/paymentMade/addPaymentMade/AddPaymentMade";

const PurchaseRoutes: RouteObject[] = [
  { path: "/purchase", element: <Purchase /> },
  { path: "/purchase/bills", element: <BillsHomes /> },
  { path: "/purchase/bills/new", element: <NewBills /> },
  { path: "/purchase/bills/view", element: <ViewBills /> },
  { path: "/purchase/debitnote", element: <DebitNote /> },
  { path: "/purchase/debit-note/new", element: <NewDebitNote /> },
  { path: "/purchase/viewdebitnote", element: <ViewDebitNote /> },
  { path: "/purchase/payment-made", element: <PaymentMade /> },
  { path: "/purchase/payment-made/view", element: <PaymentView /> },
  { path: "/purchase/purchase-order", element: <PurchaseOrder /> },
  { path: "/purchase/purchase-order/new", element: <NewPurchaseOrder /> },
  { path: "/purchase/viewpurchaseorder", element: <ViewPurchaseOrder /> },
  { path: "/purchase/payment-made/new-payment-made", element: <AddPaymentMade /> },
];

export default PurchaseRoutes;
