import { Link } from "react-router-dom";
import CheveronLeftIcon from "../../../assets/icons/CheveronLeftIcon";
import { useEffect, useRef, useState } from "react";
import CehvronDown from "../../../assets/icons/CehvronDown";
import SearchBar from "../../../Components/SearchBar";
import Button from "../../../Components/Button";
import PrinterIcon from "../../../assets/icons/PrinterIcon";
import AddSupplierModal from "../../Supplier/SupplierHome/AddSupplierModal";
import NeworderTable from "../purchaseOrder/addPurchaseOrder/NeworderTable";
import Upload from "../../../assets/icons/Upload";
import ScanEye from "../../../assets/icons/ScanEye";

type Props = {};

const NewBills = ({}: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [discountType, setDiscoutType] = useState<string>("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState<string | null>(
    null
  );

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const toggleView = () => {
    setIsExpanded(!isExpanded);
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
    <div className="mx-5 my-4 text-sm">
      <div className="flex gap-5">
        <Link to={"/purchase/bills"}>
          <div className="flex justify-center items-center h-11 w-11 bg-tertiary_main rounded-full">
            <CheveronLeftIcon />
          </div>
        </Link>
        <div className="flex justify-center items-center">
          <h4 className="font-bold text-xl text-textColor ">Bills</h4>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 py-5">
        <div className="bg-secondary_main p-5 min-h-max rounded-xl relative col-span-8">
          <div className="grid grid-cols-2 gap-4 mt-5 space-y-1">
            <div className="relative">
              <label className="block text-sm mb-1 text-labelColor">
                Supplier Name
              </label>
              <div
                className="relative w-full"
                onClick={() => toggleDropdown("supplier")}
              >
                <div className="flex items-center appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <p>Select Supplier</p>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
              {openDropdownIndex === "supplier" && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 bg-white shadow rounded-md mt-1 p-2 w-full space-y-1"
                >
                  <SearchBar
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    placeholder="Select Supplier"
                  />
                  <div className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cuRsor-pointer border border-slate-400 rounded-lg bg-lightPink">
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
                      <div className="ms-auto text-2xl cuRsor-pointer relative -mt-2 pe-2">
                        &times;
                      </div>
                    </div>
                  </div>
                  <div className="hover:bg-gray-100 cuRsor-pointer border border-slate-400 rounded-lg py-3">
                    <AddSupplierModal page="purchase" />
                  </div>
                </div>
              )}
            </div>

            <div className="relative w-full">
              <label htmlFor="" className="">
                Bill
                <input
                  name=""
                  id=""
                  placeholder="Enter Bill Number"
                  className=" block  appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                />
              </label>
            </div>

            <div className=" w-full">
              <label htmlFor="" className="">
                Bill Date
                <input
                  name=""
                  id=""
                  type="date"
                  placeholder="Value"
                  className="border-inputBorder w-full text-sm border rounded text-dropdownText  p-2 h-9 mt-2 "
                />
              </label>
            </div>
            <div>
           <div>
           <label htmlFor="" className="">
                Due Date
                <input
                  name=""
                  id=""
                  type="date"
                  placeholder="Value"
                  className="border-inputBorder w-full text-sm border rounded text-dropdownText  p-2 h-9 mt-2 "
                />
              </label>
           </div>
            </div>

            <div className=" w-full">
              <label htmlFor="" className="">
                Order Number
                <input
                  name=""
                  id=""
                  placeholder="Enter Order Number"
                  className="border-inputBorder w-full text-sm border rounded text-dropdownText  p-2 h-9 mt-2 "
                />
              </label>
            </div>

            <div>
              <label className="block text-sm mb-1 text-labelColor">
                Payment Terms
              </label>
              <div className="relative w-full">
                <select className="block appearance-none mt-2 w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option value="" className="text-gray">
                  Payment Terms
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>

            <div className=" w-full">


              <label htmlFor="" className="">
                Payment Mode </label>
                <div className="relative w-full">
                <select className="block appearance-none mt-2 w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option value="" className="text-gray">
                  
                  Enter Payment Mode
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
            
              </div>
             
            </div>

            <div>
              <label className="block text-sm mb-1 text-labelColor">
                Paid Amount
      
             
                <input
                  name=""
                  id=""
                  placeholder="Enter Paid Amount"
                  className="border-inputBorder w-full text-sm border rounded text-dropdownText  p-2 h-9 mt-2 "
                />
              </label>
            </div>
            <div className=" w-full">


<label htmlFor="" className="">
  Balance 
  


  <input
    name=""
    id=""
    placeholder=""
    className="border-inputBorder w-full text-sm border rounded text-dropdownText  p-2 h-9 mt-2 "
  />
</label>
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
          <div className="mt-9">
            <p className="font-bold text-base">Add Item</p>
            <NeworderTable />
          </div>
      
       
         
          <div>
          
  <button className="mt-0" onClick={toggleView}>
    <p className="text-black my-3 text-sm flex gap-1 items-center">
      <ScanEye/>
      <b>{isExpanded ? 'View less' : 'View more'}</b>
    </p>
  </button>

  {isExpanded && (
   <div>
   {/* Your form elements go here */}
   <form>
  <div className="grid grid-cols-12 gap-4 py-5">
    <div className="bg-secondary_main p-0 min-h-max rounded-xl relative col-span-12">
      <div className="grid grid-cols-2 gap-5 mt-0">
        <div className="relative col-span-1">
          <div className="w-full">
            <label htmlFor="" className="">
              Other expenses
              <input
                name=""
                id=""
                placeholder="Other expense"
                className="border-inputBorder w-full text-sm border rounded text-dropdownText p-2 h-9 mt-2"
              />
            </label>
          </div>
        </div>
        <div className="relative col-span-1">
          <div className="w-full">
            <label className="block text-sm mb-1 text-labelColor">
              Other Expense Reason
              <input
                name=""
                id=""
                placeholder="other expense reason"
                className="border-inputBorder w-full text-sm border rounded text-dropdownText p-2 h-9 mt-2"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-0">
        <div className="relative col-span-1">
          <div className="w-full">
            <label htmlFor="" className="">
              Vehicle Number
              <input
                name=""
                id=""
                placeholder="Enter vehicle number"
                className="border-inputBorder w-full text-sm border rounded text-dropdownText p-2 h-9 mt-2"
              />
            </label>
          </div>
        </div>
        <div className="relative col-span-1">
          <div className="w-full">
            <label className="block text-sm mb-1 text-labelColor">
              Freight Amount
              <input
                name=""
                id=""
                placeholder="Enter freight Amount"
                className="border-inputBorder w-full text-sm border rounded text-dropdownText p-2 h-9 mt-2"
              />
            </label>
          </div>
        </div>
        <div className="relative col-span-1">
          <div className="w-full">
            <label className="block text-sm mb-1 text-labelColor">
              Round off Amount 
              <input
                name=""
                id=""
                placeholder="Enter round off amount"
                className="border-inputBorder w-full text-sm border rounded text-dropdownText p-2 h-9 mt-2"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>



 </div>

  )}
</div>

      
          <br />
       
        </div>
        <div className="col-span-4">
        <div className="bg-secondary_main p-5 min-h-max rounded-xl relative  mt-0">

        <div className="mt-5">
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
          <div className="mt-4">
            <label htmlFor="" className="">
              Terms & Conditions
              <input
                name=""
                id=""
                placeholder="Add Terms & Conditions of your business"
                className="border-inputBorder w-full text-sm border rounded p-2 h-[57px] mt-2"
              />
            </label>
          </div>
          <div className="text-sm mt-3">
  <label className="block mb-3">
    Attach files to the Debit Notes 
    <div className="border-inputBorder border-gray-800 w-full border-dashed border p-2 rounded flex flex-col gap-2 justify-center items-center bg-white mb-4 mt-2">
      <span className="text-center inline-flex items-center gap-2">
        <Upload /> 
        Upload File 
      </span>
      <div className="text-center">
        Maximum File Size: 1 MB
      </div>
    </div>
    <p className="text-xs mt-1 text-gray-600"></p>
    <input
      type="file"
      className="hidden"
      value=""
      name="documents"
      // onChange={(e)=>handleFileChange(e)}
    />
  </label>
</div>

          <div className="grid grid-cols-12 pb-4  text-dropdownText border-b-2 border-slate-200">

  

            <div className="col-span-9 mt-5">
                <p>Other expense</p>
              </div>
              <div className="col-span-3 mt-5">
                <p className="text-xl">Rs 0.00</p>
              </div>
              <div className="col-span-9 mt-1">
                <p>Freight</p>
              </div>
              <div className="col-span-3 mt-1">
                <p className="text-xl">Rs 0.00</p>
              </div>
              <div className="col-span-9 mt-1">
                <p>Sub Total</p>
              </div>

              <div className="col-span-3 mt-1">
                <p className="text-xl">Rs 0.00</p>
              </div>
              <div className="col-span-9 mt-1">
                <p>Total item</p>
              </div>

              <div className="col-span-3 mt-1">
                <p className="text-xl">0</p>
              </div>
              <div className="col-span-9 mt-1">
  <p>
    Bill Discount Apply 
    <br />
    after <span className="red-text">tax</span>
  </p>
</div>

              <div className="col-span-3 mt-1">
                <p className="text-xl">Rs 0.00</p>
              </div>


              <div className="col-span-9 mt-1">
                <p>SGST</p>
              </div>
              <div className="col-span-3 mt-1">
                <p className="text-xl">Rs 0.00</p>
              </div>

              <div className="col-span-9">
                <p> CGST</p>
              </div>
              <div className="col-span-3">
                <p className="text-xl">Rs 0.00</p>
              </div>

              <div className="col-span-9">
                <p> Total Taxed Amount</p>
              </div>
              <div className="col-span-3">
                <p className="text-xl">Rs 0.00</p>
              </div>
              <div className="col-span-9">
                <p> Round off</p>
              </div>
              <div className="col-span-3">
                <p className="text-xl">Rs 0.00</p>
              </div>
              <div className="col-span-9 mt-1">
                <p className="font-bold text-base text-black">Total</p>
              </div>
              <div className="col-span-3 mt-1">
                <p className="text-xl font-bold">Rs 0.00</p>
              </div>
            </div>

            <div className="flex gap-4 m-5 justify-end">
              {" "}
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
              <Button variant="secondary" size="sm">
                <PrinterIcon height={18} width={18} color="currentColor" />
                Print
              </Button>
              <Button variant="primary" size="sm">
                Save & send
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default NewBills;
