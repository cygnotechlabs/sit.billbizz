import { Link } from "react-router-dom";
import CheveronLeftIcon from "../../../../assets/icons/CheveronLeftIcon";
import CehvronDown from "../../../../assets/icons/CehvronDown";
import NeworderTable from "./NeworderTable";
import Button from "../../../../Components/Button";
import PlusCircle from "../../../../assets/icons/PlusCircle";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchBar from "../../../../Components/SearchBar";
import PrinterIcon from "../../../../assets/icons/PrinterIcon";
import AddSupplierModal from "../../../Supplier/SupplierHome/AddSupplierModal";
import Calender from "../../../../assets/icons/Calender";
import Upload from "../../../../assets/icons/Upload";
import ViewDetails from "./ViewDetails";
import NewCustomerModal from "../../../Customer/CustomerHome/NewCustomerModal";
import { PurchaseOrder } from "./PurchaseOrderBody";
import { endponits } from "../../../../Services/apiEndpoints";
import useApi from "../../../../Hooks/useApi";

type Props = {};

const NewPurchaseOrder = ({}: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selected, setSelected] = useState<string | null>("organization");
  const [discountType, setDiscoutType] = useState<string>("");
  const [supplierData, setSupplierData] = useState<[]>([]);
  const [customerData, setCustomerData] = useState<[]>([]);
  const [paymentTerms, setPaymentTerms] = useState<[]>([]);

  const { request: AllSuppliers } = useApi("get", 5009);
  const { request: AllCustomer } = useApi("get", 5002);
  const { request: allPyamentTerms } = useApi("get", 5004);


  const [openDropdownIndex, setOpenDropdownIndex] = useState<string | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [purchaseOrderState, setPurchaseOrderState] = useState<PurchaseOrder>({
    organizationId: "",
    supplierId: "",
    taxMode: "",
    sourceOfSupply: "",
    destinationOfSupply: "",
    customerId: "",
    reference: "",
    purchaseOrder: "",
    shipmentPreference: "",
    purchaseOrderDate: "",
    expectedShipmentDate: "",
    paymentTerms: "",
    paymentMode: "",
    discountType: "",
    taxType: "",
    itemTable: [
      {
        itemId: "",
        itemQuantity: "",
        itemSellingPrice: "",
        itemDiscount: "",
        itemDiscountType: "",
        itemAmount: "",
        itemSgst: "",
        itemCgst: "",
        itemIgst: "",
        itemVat: "",
      },
    ],
    otherExpense: "",
    otherExpenseReason: "",
    freight: "",
    vehicleNo: "",
    addNotes: "",
    termsAndConditions: "",
    attachFiles: "",
    subTotal: "",
    totalItem: "",
    sgst: "",
    cgst: "",
    igst: "",
    vat: "",
    transactionDiscount: "",
    totalTaxAmount: "",
    roundOff: "",
    grandTotal: "",
    status: "",
  });

  const toggleDropdown = (key: string | null) => {
    setOpenDropdownIndex(key === openDropdownIndex ? null : key);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdownIndex(null);
    }
  };

  useEffect(() => {
    if (openDropdownIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownIndex]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPurchaseOrderState((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchData = async (
    url: string,
    setData: React.Dispatch<React.SetStateAction<any>>,
    fetchFunction: (url: string) => Promise<any>
  ) => {
    try {
      const { response, error } = await fetchFunction(url);
      if (!error && response) {
        console.log(response.data);
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const supplierUrl = `${endponits.GET_ALL_SUPPLIER}`;
    const customerUrl = `${endponits.GET_ALL_CUSTOMER}`;
    const paymentTermsUrl =`${endponits.GET_PAYMENT_TERMS}`

    fetchData(supplierUrl, setSupplierData, AllSuppliers);
    fetchData(customerUrl, setCustomerData, AllCustomer);
    fetchData(paymentTermsUrl,setPaymentTerms, allPyamentTerms)
  }, []);

  console.log(purchaseOrderState);
  console.log(customerData);
  

  return (
    <div className="px-8">
      <div className="flex gap-5">
        <Link to={"/purchase/purchase-order"}>
          <div className="flex justify-center items-center h-11 w-11 bg-tertiary_main rounded-full">
            <CheveronLeftIcon />
          </div>
        </Link>
        <div className="flex justify-center items-center">
          <h4 className="font-bold text-xl text-textColor ">
            New Purchase Order
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 py-5 rounded-lg">
        <div className="col-span-8">
          <div className="bg-secondary_main p-5 min-h-max rounded-xl relative ">
            <p className="text-textColor text-xl font-bold">
              Enter Purchase details
            </p>
            <div className=" mt-5 space-y-">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <label className="block text-sm mb-1 text-labelColor">
                    Supplier Name
                  </label>
                  <div
                    className="relative w-full"
                    onClick={() => toggleDropdown("supplier")}
                  >
                    <div className="items-center flex appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <p>Select Supplier</p>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                  {openDropdownIndex === "supplier" && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 bg-white  shadow  rounded-md mt-1 p-2 -m-9 w-[40%] space-y-1"
                    >
                      <SearchBar
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        placeholder="Select Supplier"
                      />
                      {supplierData.length > 0 &&
                        supplierData.map((supplier: any) => (
                          <div className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg bg-lightPink">
                            <div className="col-span-2 flex items-center justify-center">
                              <img
                                src="https://i.postimg.cc/MHdYrGVP/Ellipse-43.png"
                                alt=""
                              />
                            </div>
                            <div className="col-span-10 flex">
                              <div
                                onClick={() => {
                                  setPurchaseOrderState((prevState) => ({
                                    ...prevState,
                                    supplierId: supplier._id,
                                  }));
                                  setOpenDropdownIndex(null); 
                                }}
                              >
                                <p className="font-bold text-sm">
                                  {supplier.supplierDisplayName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Phone: {supplier.mobile}
                                </p>
                              </div>
                              <div className="ms-auto text-2xl cursor-pointer relative -mt-2 pe-2">
                                &times;
                              </div>
                            </div>
                          </div>
                        ))}
                      <div className="hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg py-4">
                        <AddSupplierModal page="purchase" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 my-3">
                <div className="col-span-5 ">
                  <label
                    className="block text-sm mb-1 text-labelColor"
                    htmlFor=""
                  >
                    Delivery Address
                  </label>
                  <div className="flex items-center space-x-4 text-textColor text-sm">
                    <div className="flex gap-2 justify-center items-center ">
                      <div className="grid place-items-center mt-1">
                        <input
                          id="customer"
                          type="radio"
                          name="deliveryAddress"
                          className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                            selected === "customer"
                              ? "border-8 border-neutral-400"
                              : "border-1 border-neutral-400"
                          }`}
                          onChange={() => setSelected("customer")}
                          checked={selected === "customer"}
                        />
                        <div
                          id="customer"
                          className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                            selected === "customer"
                              ? "bg-neutral-100"
                              : "bg-transparent"
                          }`}
                        />
                      </div>
                      <label
                        htmlFor="customer"
                        className="text-start font-medium"
                      >
                        Customer
                      </label>
                    </div>
                    <div className="flex gap-2  justify-center items-center">
                      <div className="grid place-items-center mt-1">
                        <input
                          id="organization"
                          type="radio"
                          name="deliveryAddress"
                          className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                            selected === "organization"
                              ? "border-8 border-neutral-400"
                              : "border-1 border-neutral-400"
                          }`}
                          onChange={() => setSelected("organization")}
                          checked={selected === "organization"}
                        />
                        <div
                          id="organization"
                          className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                            selected === "organization"
                              ? "bg-neutral-100"
                              : "bg-transparent"
                          }`}
                        />
                      </div>
                      <label
                        htmlFor="organization"
                        className="text-start font-medium"
                      >
                        Organization
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {selected === "customer" && (
                <div className="grid grid-cols-12 gap-4 pb-2">
                  <div className="col-span-5  ">
                    <label className="text-sm mb-1 text-labelColor">
                      Customer Name
                    </label>
                    <div
                      className="relative w-full"
                      onClick={() => toggleDropdown("customer")}
                    >
                      <div className="items-center flex appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <p>Select Customer</p>
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <CehvronDown color="gray" />
                      </div>
                    </div>
                    {openDropdownIndex === "customer" && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-10 bg-white  shadow  rounded-md mt-1 p-2 -m-9 w-[40%] space-y-1"
                      >
                        <SearchBar
                          searchValue={searchValue}
                          onSearchChange={setSearchValue}
                          placeholder="Select customer"
                        />
                        <div className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg bg-lightPink">
                          <div className="col-span-2 flex items-center justify-center">
                            <img
                              src="https://i.postimg.cc/MHdYrGVP/Ellipse-43.png"
                              alt=""
                            />
                          </div>
                          <div className="col-span-10 flex">
                            <div>
                              <p className="font-bold text-sm">Smart world</p>
                              <p className="text-xs text-gray-500">
                                Phone: 9643287899
                              </p>
                            </div>
                            <div className="ms-auto text-2xl cursor-pointer relative -mt-2 pe-2">
                              &times;
                            </div>
                          </div>
                        </div>
                        <div className="hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg py-4">
                          <NewCustomerModal page="purchase" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-7">
                    <label className="block text-sm mb-1 text-labelColor">
                      Reference#
                    </label>
                    <input
                      value={purchaseOrderState.reference}
                      name="reference"
                      onChange={handleChange}
                      placeholder="reference"
                      type="text"
                      className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full">
                <label className="text-sm mb-1 text-labelColor">
                  Purchase order#
                </label>
                <div className="relative w-full">
                  <select
                    onChange={handleChange}
                    name="purchaseOrder"
                    value={purchaseOrderState.purchaseOrder}
                    className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="PO-0001" className="text-gray">
                      PO-0001
                    </option>
                    <option value="PO-0001" className="text-gray">
                      PO-0001
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>

              {selected === "customer" ? (
                <div>
                  <label className="block text-sm mb-1 text-labelColor">
                    Payment Mode
                  </label>
                  <div className="relative w-full">
                    <select
                      value={purchaseOrderState.paymentMode}
                      name="paymentMode"
                      onChange={handleChange}
                      className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="" className="text-gray">
                        Select Payment Mode
                      </option>
                      <option value="COD" className="text-gray">
                        COD
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm mb-1 text-labelColor">
                    Reference#
                  </label>
                  <input
                    value={purchaseOrderState.reference}
                    name="reference"
                    onChange={handleChange}
                    placeholder="reference"
                    type="text"
                    className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4  mt-3">
              <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Shipment Preference
                </label>
                <div className="relative w-full">
                  <select
                    value={purchaseOrderState.shipmentPreference}
                    name="shipmentPreference"
                    onChange={handleChange}
                    className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="" className="text-gray">
                      Select Shipment Preference
                    </option>
                    <option value="Cash" className="text-gray">
                      Cash
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Purchase Order Date
                </label>
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 flex items-center px-2 text-gray-700">
                    <Calender color={"gray"} height={20} width={20} />
                  </div>
                  <select
                    value={purchaseOrderState.purchaseOrderDate}
                    name="purchaseOrderDate"
                    onChange={handleChange}
                    className="block appearance-none w-full h-9 ps-7 text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="" className="text-gray">
                      18/09/2024
                    </option>
                    <option value="18/09/2024" className="text-gray">
                      18/09/2024
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Expected Shipment Date
                </label>
                <div className="relative w-full">
                  <select
                    value={purchaseOrderState.expectedShipmentDate}
                    name="expectedShipmentDate"
                    onChange={handleChange}
                    className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="" className="text-gray">
                      15/02/2024
                    </option>
                    <option value=" 15/02/2024" className="text-gray">
                      15/02/2024
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Payment Terms
                </label>
                <div className="relative w-full">
                  <select
                    value={purchaseOrderState.paymentTerms}
                    onChange={handleChange}
                    name="paymentTerms"
                    className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="" className="text-gray">
                      Select Payment Terms
                    </option>
                   { paymentTerms.length>0 && paymentTerms.map((item:any) => <option value=" Due on Receipt" className="text-gray">
                     {item.name}
                    </option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b w-[20%] flex items-center justify-center text-textColor gap-3 my-5 py-2 border-[#EAECF0] text-sm">
              <p>{discountType === "" ? "Discount Type" : discountType}</p>{" "}
              <div
                className="border border-neutral-300 flex rounded-lg text-xs p-1"
                onClick={() => toggleDropdown("discountType")}
              >
                <CehvronDown color="currentColor" width={15} height={15} />
              </div>
              {openDropdownIndex === "discountType" && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 bg-white  shadow  rounded-md  p-2 mt-36 w-[28%] space-y-1  "
                >
                  <div
                    className=" p-2 hover:bg-red-50 cursor-pointe  rounded-lg py-3"
                    onClick={() => {
                      setDiscoutType("Time Line");
                      setOpenDropdownIndex(null);
                    }}
                  >
                    Time Line
                  </div>
                  <div
                    className=" p-2 hover:bg-red-50 cursor-pointe   rounded-lg  pt-3"
                    onClick={() => {
                      setDiscoutType("Transaction Line");
                      setOpenDropdownIndex(null);
                    }}
                  >
                    Transaction Line
                  </div>
                  <div className="h-[.5px] bg-neutral-300"></div>
                </div>
              )}
            </div>
            <p className="font-bold mt-3">Add Item</p>
            <NeworderTable />
            <button className="mt-1">
              <p className="text-darkRed my-3 text-sm flex gap-2 items-center">
                <PlusCircle color="darkRed" />
                <b> Add Item</b>
              </p>
            </button>{" "}
            <br />
            <ViewDetails />
          </div>
        </div>

        <div className="col-span-4">
          <div className="bg-secondary_main p-5 text-sm rounded-xl space-y-4 text-textColor">
            <div className="text-sm">
              <label htmlFor="" className="">
                Add Note
                <input
                  value={purchaseOrderState.addNotes}
                  onChange={handleChange}
                  name="addNotes"
                  id=""
                  placeholder="Note"
                  className="border-inputBorder w-full text-sm border rounded  p-2 h-[57px] mt-2 "
                />
              </label>
            </div>
            <div className="text-sm mt-3">
              <label htmlFor="termsAndConditions" className="">
                Terms & Conditions
                <input
                  value={purchaseOrderState.termsAndConditions}
                  onChange={handleChange}
                  name="termsAndConditions"
                  id="termsAndConditions"
                  placeholder="Add Terms & Conditions of your business"
                  className="border-inputBorder w-full text-sm border rounded p-2 h-[57px] mt-2"
                />
              </label>
            </div>
            <div className="mt-4">
              <label className="block mb-1">
                Documents
                <div className="border-dashed border border-neutral-300 p-2 rounded  gap-2 text-center h-[68px] mt-2">
                  <div className="flex gap-1 justify-center">
                    <Upload />
                    <span>Upload File</span>
                  </div>
                  <p className="text-xs mt-1 text-gray-600">
                    Maximum File Size : 1MB
                  </p>
                </div>
                <input type="file" className="hidden" name="documents" />
              </label>
            </div>

            <div className="grid grid-cols-12 pb-4  text-dropdownText border-b-2 border-slate-200">
              <div className="col-span-9 mt-5">
                <p>Discount</p>
              </div>
              <div className="col-span-3 mt-5">
                <p className="text-xl ">Rs 0.00</p>
              </div>
              <div className="col-span-9 mt-5">
                <p>Untaxed Amount</p>
              </div>
              <div className="col-span-3 mt-5">
                <p className="text-xl font-bold">RS 0.00</p>
              </div>

              <div className="col-span-9 mt-1">
                <p>SGST</p>
              </div>
              <div className="col-span-3 mt-1">
                <p className="text-base">RS 0.00</p>
              </div>

              <div className="col-span-9">
                <p> CGST</p>
              </div>
              <div className="col-span-3">
                <p className="text-base">RS 0.00</p>
              </div>

              <div className="col-span-9 mt-1">
                <p className="font-bold text-base text-black">Total</p>
              </div>
              <div className="col-span-3 mt-1">
                <p className="text-base font-bold">RS 0.00</p>
              </div>
            </div>

            <div className="flex gap-4 pt-3 justify-end">
              {" "}
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
              <Button variant="secondary" size="sm">
                <PrinterIcon height={18} width={18} color="currentColor" />
                Print
              </Button>
              <Button variant="primary" size="sm">
                Save & Send
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPurchaseOrder;
