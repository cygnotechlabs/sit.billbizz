import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CheveronLeftIcon from "../../../assets/icons/CheveronLeftIcon";
import CehvronDown from "../../../assets/icons/CehvronDown";
import SearchBar from "../../../Components/SearchBar";
import NewCustomerModal from "../../Customer/CustomerHome/NewCustomerModal";
import DebitNumberPrfncModal from "../../purchase/debitNote/DebitNumberPrfncModal";
import Button from "../../../Components/Button";
import UserRound from "../../../assets/icons/user-round";
import Calender from "../../../assets/icons/Calender";
import UnpaidInvoiceTable from "./UnpaidInvoiceTable";
import Upload from "../../../assets/icons/Upload";

type Props = {};

const AddReceiptForm = ({}: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selected, setSelected] = useState<string | null>(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<string | null>(
    null
  );

  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="mx-5 my-4">
      <div className="flex gap-5">
        <Link to={"/sales/receipt"}>
          <div className="flex justify-center items-center h-11 w-11 bg-tertiary_main rounded-full">
            <CheveronLeftIcon />
          </div>
        </Link>
        <div className="flex justify-center items-center">
          <h4 className="font-bold text-xl text-textColor">Invoice Payment</h4>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 py-5">
        <div className="bg-secondary_main p-5 min-h-max rounded-xl relative col-span-8">
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <label className="block text-sm mb-1 text-labelColor">
                Customer Name
              </label>
              <div
                className="relative w-full"
                onClick={() => toggleDropdown("customer")}
              >
                <div className="items-center flex appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <p>Select a customer</p>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
              {openDropdownIndex === "customer" && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 bg-white shadow rounded-md mt-1 p-2 w-96 -left-4 space-y-1"
                >
                  <SearchBar
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    placeholder="Select Customer"
                  />
                  <div className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointer border border-slate-400 rounded-lg bg-lightPink">
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
                  <div className="hover:bg-gray-100 cursor-pointer border border-slate-400 rounded-lg py-3">
                    <NewCustomerModal page="purchase" />
                  </div>
                </div>
              )}
              <div className="text-darkRed text-sm flex mt-2 gap-1 font-semibold items-center ">
                <UserRound color="darkRed" />
                See customer details
              </div>
            </div>
            <div className="relative w-full">
              <label className="block text-sm mb-1 text-labelColor">
                Ammount Received
              </label>
              <input
                name=""
                id=""
                placeholder="Value"
                className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm mb-1 text-labelColor">
                Bank Changes (If any)
              </label>
              <input
                name=""
                id=""
                placeholder="Value"
                className="border-inputBorder w-full text-sm border rounded text-dropdownText p-2 h-9 mt-2"
              />
            </div>
            <div className="relative w-full">
              <label className="block text-sm mb-1 text-labelColor">
                Payment Date
              </label>
              <div className="relative w-full">
                <div className="absolute top-4 left-3">
                  {" "}
                  <Calender color={"gray"} height={18} width={18} />
                </div>
                <input
                  name=""
                  id=""
                  placeholder="31/07/2024"
                  className="border-inputBorder w-full text-sm border rounded text-dropdownText p-2 h-9 mt-2 pl-8"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 top-2 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1  text-labelColor">
                Payment Id
              </label>
              <div className="relative w-full ">
                <input
                  type="text"
                  placeholder="Value"
                  className="block mt-2 appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="relative w-full mt-4">
              <input
                name=""
                id=""
                placeholder="Value"
                disabled
                className="block mt-3 appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <DebitNumberPrfncModal />
            </div>
            <div className="w-full mt-4">
              <label className="block text-sm mb-1 text-labelColor">
                Payment Mode
              </label>
              <div className="relative w-full">
                <select className="block appearance-none mt-2 w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option value="" className="text-gray">
                    Cash
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>
            <div className="w-full mt-4">
              <label className="block text-sm mb-1 text-labelColor">
                Deposite to
              </label>
              <div className="relative w-full">
                <select className="block appearance-none mt-2 w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option value="" className="text-gray">
                    Petty Cash
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1  text-labelColor">
                Reference#
              </label>
              <div className="relative w-full ">
                <input
                  type="text"
                  placeholder="Value"
                  className="block mt-2 appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm my-1 text-labelColor">
                Tax Deducted?
              </label>
              <div className="flex gap-2 items-center py-3">
                <div className="grid place-items-center justify-center ms-5">
                  <input
                    id="noTax"
                    type="radio"
                    name="taxOption"
                    value="noTax"
                    className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                      selected === "noTax"
                        ? "border-8 border-neutral-400"
                        : "border-1 border-neutral-400"
                    }`}
                    checked={selected === "noTax"}
                    onChange={() => {
                      setSelected("noTax");
                    }}
                  />
                  <div
                    id="noTax"
                    className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                      selected === "noTax" ? "bg-neutral-100" : "bg-transparent"
                    }`}
                  />
                </div>
                <label
                  htmlFor="noTax"
                  className="text-slate-600 font-semibold text-xs"
                >
                  No Tax Deducted
                </label>
                <div className="flex gap-2 justify-center items-center">
                  <div className="grid place-items-center ms-5">
                    <input
                      id="tax"
                      type="radio"
                      name="taxOption"
                      value="tax"
                      className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                        selected === "tax"
                          ? "border-8 border-neutral-400"
                          : "border-1 border-neutral-400"
                      }`}
                      checked={selected === "tax"}
                      onChange={() => {
                        setSelected("tax");
                      }}
                    />
                    <div
                      id="tax"
                      className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                        selected === "tax" ? "bg-neutral-100" : "bg-transparent"
                      }`}
                    />
                  </div>
                  <label
                    htmlFor="tax"
                    className="text-slate-600 font-semibold text-xs"
                  >
                    Yes, TDS (Income Tax)
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-9">
            <p className="font-bold text-base">Add Item</p>
            <UnpaidInvoiceTable />
          </div>

          <br />
          <div className=" text-sm text-textColor">
            <label htmlFor="" className="">
              Add Note
              <input
                name=""
                id=""
                placeholder="Note"
                className="border-inputBorder w-full text-sm border rounded  p-2 h-[57px] mt-2 "
              />
            </label>
          </div>
          <div className="mt-4 text-sm text-textColor">
            <label className="block mb-1">Attachemnts</label>
            <div className="border-dashed border border-neutral-300 p-2 rounded flex-row items-center justify-center text-center">
                
                <div className="flex items-center justify-center text-xs font-semibold gap-1">  <Upload  /> <p>Upload File</p></div>
                 
                  <p className="text-[10px]">Maximum File Size: 1MB</p>
              
            </div>
          </div>
        </div>

        <div className=" min-h-max rounded-xl relative col-span-4 text-sm">
          <div className="bg-secondary_main p-5 min-h-max rounded-xl relative ">
            <div className="grid grid-cols-12 pb-4  text-dropdownText  space-y-3">
              <div className="col-span-10 mt-5">
                <p> Amount Received</p>
              </div>
              <div className="col-span-2">
                <p className="">0.00</p>
              </div>

              <div className="col-span-10 ">
                <p>Amount Used for Payments</p>
              </div>
              <div className="col-span-2 ">
                <p className="text-base">0.00</p>
              </div>

              <div className="col-span-10">
                <p> Amount Refunded</p>
              </div>
              <div className="col-span-2">
                <p className="text-base">0.00</p>
              </div>

              <div className="col-span-10">
                <p className=" text-base">Amount in Exess</p>
              </div>
              <div className="col-span-2 mt-1">
                <p className="text-base ">&#8377; 0.00</p>
              </div>
            </div>

           
          </div>
          
           <div className="flex gap-4 m-5 justify-end">
              {" "}
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
              <Button variant="primary" size="sm">
                Save & send
              </Button>{" "}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddReceiptForm;
