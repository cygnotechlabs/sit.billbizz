import { Route, Routes } from "react-router-dom";
import "./App.css";
import Root from "./Root";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import CustomerHome from "./features/Customer/CustomerHome/CustomerHome";
import SeeCustomerDetails from "./features/Customer/CustomerHome/SeeCustomerDetails";
import SupplierHome from "./features/Supplier/SupplierHome/SupplierHome";
import BankAccountView from "./features/accountant/Bank/BankAccountView";
import BankHome from "./features/accountant/Bank/BankHome";
import Cash from "./features/accountant/Cash/Cash";
import CashTableView from "./features/accountant/Cash/CashTableView";
import ChartOfAccountant from "./features/accountant/chartOfAccountant/ChartOfAccountant";
import Table from "./features/accountant/chartOfAccountant/Table";
import ManualHome from "./features/accountant/manualJournel/ManualHome";
import ManualView from "./features/accountant/manualJournel/ManualView";
import NewJournal from "./features/accountant/manualJournel/newJournal/NewJournal";
import ItemHome from "./features/inventory/Item/ItemHome";
import UnitHome from "./features/inventory/Unit/UnitHome";
import Unitconversion from "./features/inventory/Unit/Unitconversion";
import DebitNote from "./features/purchase/debitNote/DebitNote";
import NewDebitNote from "./features/purchase/debitNote/NewDebitNote";
import ViewDebitNote from "./features/purchase/debitNote/viewDebitNote/ViewDebitNote";
import PaymentMade from "./features/purchase/paymentMade/PaymentMade";
import PaymentView from "./features/purchase/paymentMade/PaymentView/PaymentView";
import PurchaseOrder from "./features/purchase/purchaseOrder/PurchaseOrder";
import NewPurchaseOrder from "./features/purchase/purchaseOrder/addPurchaseOrder/NewPurchaseOrder";
import ViewPurchaseOrder from "./features/purchase/purchaseOrder/viewPurchaseOrder/ViewPurchaseOrder";
import CreditNote from "./features/sales/creditNote/CreditNote";
import NewCreditNote from "./features/sales/creditNote/NewCreditNote";
import ViewCreditNote from "./features/sales/creditNote/viewCreditNote/ViewCreditNote";
import InvoiceHome from "./features/sales/invoice/InvoiceHome";
import NewInvoice from "./features/sales/invoice/NewInvoice";
import QuoteHome from "./features/sales/quote/QuoteHome";
import SalesOrder from "./features/sales/salesOrder/SalesOrder";
import ViewSalesOrder from "./features/sales/salesOrder/viewSalesQuote/ViewSalesQuote";
import Accountant from "./pages/Accountant";
import Customer from "./pages/Customer";
import Expense from "./pages/Expense";
import ExpenseHome from "./features/expense/ExpenseHome/ExpenseHome";
import ExpenseView from "./features/expense/ExpenseHome/ExpenseView";
import BillsHomes from "./features/purchase/bills/BillsHomes";
import NewBills from "./features/purchase/bills/NewBills";
import ViewBills from "./features/purchase/bills/ViewBill/viewDebitNote/ViewBills";
import Staffs from "./pages/Staffs";
import StaffHome from "./features/staffs/StaffHome";
import StaffsOverview from "./features/staffs/staffsView/StaffsOverview";
import ReceiptHome from "./features/sales/Receipt/ReceiptHome";
import ReceiptView from "./features/sales/Receipt/ReceiptView";
import ViewInvoice from "./features/sales/invoice/ViewInvoice";
import AddReceiptForm from "./features/sales/Receipt/AddReceiptForm";
import Organization from "./pages/Organization";
import Purchase from "./pages/Purchase";
import Supplier from "./pages/Supplier";
import ViewSalesQuote from "./features/sales/quote/viewSalesQuote/ViewSalesQuote";
import NewSalesOrder from "./features/sales/salesOrder/NewSalesOrder";
import NewSalesQuote from "./features/sales/quote/NewSalesQuote";
import SeeSupplierDetails from "./features/Supplier/SupplierHome/ViewSupplier/SeeSupplierDetails";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/accountant" element={<Accountant />} />
          <Route path="/organization" element={<Organization />}></Route>
          <Route path="/accountant/cash" element={<Cash />}></Route>
          <Route path="/accountant/cashView" element={<CashTableView />}></Route>
          <Route
            path="/accountant/manualjournal"
            element={<ManualHome />}
          ></Route>
          <Route
            path="/accountant/manualjournal/view"
            element={<ManualView />}
          ></Route>
          <Route path="/accountant/newjournal" element={<NewJournal />}></Route>
          <Route path="/accountant/bank" element={<BankHome />}></Route>

          <Route path="/accountant/bank/account-view" element={<BankAccountView/>}></Route>

          <Route path="/inventory/unit" element={<UnitHome />}></Route>
          <Route
            path="/inventory/unit/unit-conversion"
            element={<Unitconversion />}
          ></Route>
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/supplier/home" element={<SupplierHome />}></Route>
          <Route path="/supplier/view" element={<SeeSupplierDetails />}></Route>
          <Route path="/customer" element={<Customer />}></Route>
          <Route path="/customer/home" element={<CustomerHome />}></Route>
          <Route path="/customer/view" element={<SeeCustomerDetails />} />
          <Route path="/purchase/debitnote" element={<DebitNote />}></Route>
          <Route
            path="/purchase/viewdebitnote"
            element={<ViewDebitNote />}
          ></Route>
          <Route
            path="/purchase/debit-note/new"
            element={<NewDebitNote />}
          ></Route>
          <Route
            path="/purchase/bills"
            element={<BillsHomes />}
          ></Route>
          <Route
            path="/purchase/bills/new"
            element={<NewBills />}
          ></Route>
          <Route
            path="/purchase/bills/view"
            element={<ViewBills />}
          ></Route>
          <Route path="/supplier/home" element={<Table />}></Route>
          <Route path="/customer" element={<Customer />}></Route>
          <Route path="/customer/home" element={<CustomerHome />}></Route>
          <Route path="/inventory/Item" element={<ItemHome />}></Route>
          <Route
            path="/accountant/chart-OF-accountant"
            element={<ChartOfAccountant />}
          ></Route>
          <Route
            path="/inventory/unit/unit-conversion"
            element={<Unitconversion />}
          ></Route>

          <Route path="/purchase" element={<Purchase />} />
          <Route path="/purchase/viewpurchaseorder" element={<ViewPurchaseOrder />} />
          <Route path="/purchase/purchase-order" element={<PurchaseOrder />} />
          <Route
            path="/purchase/purchase-order/new"
            element={<NewPurchaseOrder />}
          ></Route>
          <Route
            path="/purchase/payment-made"
            element={<PaymentMade />}
          ></Route>
          <Route
            path="/purchase/payment-made/view"
            element={<PaymentView />}
          ></Route>
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/purchase/purchase-order" element={<PurchaseOrder />} />
          <Route
            path="/purchase/payment-made"
            element={<PaymentMade />}
          ></Route>
          <Route
            path="/purchase/payment-made/view"
            element={<PaymentView />}
          ></Route>

          {/* Sales */}
          <Route path="/sales/salesorder" element={<SalesOrder />} />
          <Route
            path="/sales/viewsalesorder"
            element={<ViewSalesOrder />}
          ></Route>
          <Route path="/sales/salesorder/new" element={<NewSalesOrder />} />
          <Route path="/sales/invoice" element={<InvoiceHome />}></Route>
          <Route path="/sales/quote" element={<QuoteHome />} />\
          <Route path="/sales/quote/view" element={<ViewSalesQuote/>}/>
          <Route path="/sales/quote/new" element={<NewSalesQuote/>}/>
          <Route path="/sales/invoice/view" element={<ViewInvoice />} />
          <Route path="/sales/invoice/new" element={<NewInvoice />} />
          <Route path="/sales/invoice/view" element={<ViewInvoice/>}></Route>
          <Route
            path="/sales/credit-note/new"
            element={<NewCreditNote />}
          ></Route>
          <Route path="/sales/credit-note" element={<CreditNote />} />
          <Route path="/sales/credit-note/view" element={<ViewCreditNote />} />
          <Route path="/sales/receipt" element={<ReceiptHome/>}/>
          <Route path="/sales/receipt/view" element={<ReceiptView/>}></Route>
          <Route path="/slaes/receipt/new" element={<AddReceiptForm/>}></Route>

          {/* Expense */}
          <Route path="/expense" element={<Expense/>}></Route>
          <Route path="/expense/home" element={<ExpenseHome/>}></Route>
          <Route path="/expense/view" element={<ExpenseView/>}></Route>

          {/* staffs */}
          <Route path="/staffs" element={<Staffs/>}></Route>
          <Route path="/staffs/home" element={<StaffHome/>}></Route>
          <Route path="/staffs/view" element={<StaffsOverview/>}></Route>

        </Route>
      </Routes>
    </>
  );
}

export default App;
