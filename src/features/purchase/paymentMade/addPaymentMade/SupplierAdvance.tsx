import CehvronDown from "../../../../assets/icons/CehvronDown";
import Button from "../../../../Components/Button";
import { useEffect, useRef, useState } from "react";
import SearchBar from "../../../../Components/SearchBar";
import UserRound from "../../../../assets/icons/user-round";
import SettingsIcons from "../../../../assets/icons/SettingsIcon";
import Upload from "../../../../assets/icons/Upload";

type Props = {};

const SupplierAdvance = ({ }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  // const [selected, setSelected] = useState<string | null>(null);
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
    <div className="px-8">
      <div className="grid grid-cols-12 gap-4 py-5 rounded-lg">
        <div className="col-span-8">
          <div className="bg-secondary_main p-5 min-h-max rounded-xl relative ">
            <p className="text-textColor text-xl font-bold"></p>
            <div className=" space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <label className="block text-sm mb-1 text-labelColor">
                    Select Supplier
                  </label>
                  <div
                    className="relative w-full"
                    onClick={() => toggleDropdown("supplier")}
                  >
                    <div className="items-center  appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 flex">
                      <p className="w-3/4">Select or add Supplier</p>
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                  {openDropdownIndex === "supplier" && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 bg-white  shadow  rounded-md mt-1 p-2 w-[46%] space-y-1"
                    >
                      <SearchBar
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        placeholder="Select Supplier"
                      />
                      <div className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg bg-[#FDF8F0]">
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
                    </div>
                  )}
                </div>

                <div className="">
                  <label className="block text-sm mb-1 text-labelColor">
                    Source of supply
                  </label>
                  <div
                    className="relative w-full"
                    onClick={() => toggleDropdown("supply")}
                  >
                    <div className="items-center  appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 flex">
                      <p className="w-3/4">Select or add Supplier</p>
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                  {openDropdownIndex === "supply" && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 bg-white  shadow  rounded-md mt-1 p-2 w-[46%] space-y-1"
                    >
                      <SearchBar
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        placeholder="Select Supplier"
                      />
                      <div className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg bg-[#FDF8F0]">
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
                    </div>
                  )}
                </div>
              </div>






              <div className="cols-12">
                <p className="font-bold inline-flex items-center text-sm" style={{ color: '#820000' }}>
                  <UserRound color="#820000" /> &nbsp;  See vendor details
                </p>
              </div>



              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-labelColor">
                Destination of supply
                </label>
                <div className="relative w-full">
                  <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" disabled hidden selected className="text-gray">
                      select destination
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>

                <div className="">
                  <label className="block text-sm mb-1 text-labelColor">
                    Payment #
                  </label>
                  <div className="relative w-full">
                  <input type="text" className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  placeholder="Value"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <SettingsIcons  size="sm" color="#818894" />
                  </div>
                </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
              <div className="relative">
            <label
              className="text-slate-600 flex text-sm items-center gap-2"
              htmlFor="costPrice"
            >
              Payment Made
            </label>
            <div className="flex">
              <div className="w-16 text-sm mt-1.5 rounded-l-md text-start bg-white text-zinc-400 border border-inputBorder h-9 items-center justify-center flex">
                { "INR"}
              </div>
              <input
                className="pl-3 text-sm w-[100%] mt-1.5 rounded-r-md text-start bg-white border border-inputBorder h-9 leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                placeholder="Enter Price"
                name="costPrice"
              />
            </div>
          </div>
                <div className="">
                  <label className="block text-sm mb-1 text-labelColor">
                  Description of supply
                  </label>
                  <input
                    placeholder="will be displayed on payment voucher"
                    type="text"
                    className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"
                  />
                </div>
              </div>

            </div>


            <div className="grid grid-cols-2 gap-4  mt-5">
              <div>
                <label className="block text-sm mb-1 text-labelColor">
                  TDS
                </label>
                <div className="relative w-full">
                  <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" className="text-gray">
                    Payment of contracts for other [2%]
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
                    <div>
                    <p className="text-sm text-textColor -mb-2">Reverse Charge</p>
              <div className="flex items-center mt-4 gap-1 text-textColor">
                <input
                  type="checkbox"
                  className="accent-[#97998E] bg-white h-6 w-5 mx-1"
                  id="checkbox3"
                  name="returnableItem"
                  />
                <label
                  htmlFor="checkbox3"
                  className="text-textColor text-xs"
                  >
                  This transaction is applicable for reverse charge
                </label>
              </div>
                  </div>


             
            </div>
            <div className="grid grid-cols-2 gap-4  mt-5">
            <div className="">
                  <label className="block text-sm mb-1 text-labelColor">
                    Payment Date
                  </label>
                  <input
                    placeholder="Value"
                    type="date"
                    className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"
                  />
                </div>
                <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Payment Mode
                </label>
                <div className="relative w-full">
                  <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" className="text-gray">
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>

            </div>
            <div className="grid grid-cols-2 gap-4  mt-5">
                <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Paid through
                </label>
                <div className="relative w-full">
                  <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" className="text-gray">
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
                  Deposite to
                </label>
                <div className="relative w-full">
                  <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" className="text-gray">
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>

            </div>
            <div className="grid grid-cols-2 gap-4  mt-5">
              <div>
                <label className="block text-sm mb-1 text-labelColor">
                 Reference#
                </label>
                <div className="relative w-full">
                  <input type="text" className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  placeholder="Value"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  </div>
                </div>
              </div>

            </div>
            <br />
            <div className="text-sm">
              <label htmlFor="" className="text-sm text-textColor">
                Notes
                <input
                  name=""
                  id=""
                  placeholder="Add a Note"
                  className="border-inputBorder w-full text-sm border rounded  p-2 h-[57px] mt-2 "
                />
              </label>
            </div>
          </div>
        </div>

        <div className="col-span-4">
        <div className="text-sm mt-3">
              <label className="block mb-2 text-textColor">
                Attachments
                <div className="mt-2 border-dashed border-2 bg-white border-neutral-300 p-4 rounded-lg flex flex-col gap-2 justify-center items-center">
                  <span className="text-center text-dropdownText font-semibold text-xs inline-flex items-center gap-2">
                    <Upload />
                    Upload File
                  </span>
                  <div className="text-center text-[10px] text-textColor">
                    Maximum File Size: 1 MB
                  </div>
                </div>
                <p className="text-xs mt-1 text-gray-600">
                </p>
                <input
                  type="file"
                  className="hidden"
                  value=""
                  name="documents"
                />
              </label>
            </div>
            <div className="flex gap-4 pt-3 justify-end">
              {" "}
              <Button variant="secondary" className="text-sm pl-5 pr-5" size="sm">
                Cancel
              </Button>
              <Button variant="primary"  className="text-sm pl-7 pr-7" size="sm">
                Save
              </Button>{" "}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierAdvance;