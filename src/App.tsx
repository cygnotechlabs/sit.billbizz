import "./App.css";
import { Routes, Route } from "react-router-dom";
import Root from "./Root";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Organization from "./pages/Organization";
import Accountant from "./pages/Accountant";
import ManualHome from "./features/accountant/manualJournel/ManualHome";
import NewJournal from "./features/accountant/manualJournel/NewJournal";
import Cash from "./features/accountant/Cash/Cash";
import BankHome from "./features/accountant/Bank/BankHome";
import UnitHome from "./features/inventory/Unit/UnitHome";
import Unitconversion from "./features/inventory/Unit/Unitconversion";
import Supplier from "./pages/Supplier";
import Table from "./features/supplier/Home/Table";
import Customer from "./pages/Customer";
import SeeCustomerDetails from "./features/Customer/CustomerDetails/SeeCustomerDetails";
import Item from "./features/inventory/Item/item";
<<<<<<< HEAD
import NewPurchaseOrder from "./features/purchase/NewPurchaseOrder";



=======
import ChartOfAccountant from "./features/accountant/chartOfAccountant/ChartOfAccountant";
>>>>>>> 12d1561bb3f48d91535c4e4234a9bef1f0912e01

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/accountant" element={<Accountant />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/organization" element={<Organization />}></Route>
          <Route path="/cash" element={<Cash />}></Route>
          <Route path="/manualjournal" element={<ManualHome />}></Route>
          <Route path="/newjournal" element={<NewJournal />}></Route>
          <Route path="/bank" element={<BankHome />}></Route>
          <Route path="/inventory/unit" element={<UnitHome />}></Route>
          <Route
            path="/inventory/unit/unit-conversion"
            element={<Unitconversion />}
          ></Route>
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/supplier/table" element={<Table />}></Route>
          <Route path="/customer" element={<Customer />}></Route>
          <Route
            path="/customer/seecustomerdetails"
            element={<SeeCustomerDetails />}
          ></Route>
          <Route path="/inventory/Item" element={<Item />}></Route>
          <Route
            path="/accountant/chart-OF-accountant"
            element={<ChartOfAccountant />}
          ></Route>
          <Route
            path="/inventory/unit/unit-conversion"
            element={<Unitconversion />}
          ></Route>
          <Route path="purchase/purchase-order/new" element={<NewPurchaseOrder/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
