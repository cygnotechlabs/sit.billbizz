import { Link } from "react-router-dom";
import CheveronLeftIcon from "../../../assets/icons/CheveronLeftIcon";
import Plus from "../../../assets/icons/Plus";
import { useEffect, useRef, useState } from "react";
import CehvronDown from "../../../assets/icons/CehvronDown";
import CircleHelp from "../../../assets/icons/CircleHelp";
import Button from "../../../Components/Button";
import SearchBar from "../../../Components/SearchBar";
import BrandModal from "../Brand/BrandModal";
import SettingsIcons from "../../../assets/icons/SettingsIcon";

type Props = {};

const AddItem = ({}: Props) => {
const [selected, setSelected] = useState<string | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isService, setIsService] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const openBrandModal = () => {
    setIsBrandModalOpen(true);
  };

  const closeBrandModal = () => {
    setIsBrandModalOpen(false);
  };


  

  return (
    <>
      <div className="bg-white mx-5 p-6 rounded-lg h-[80vh] overflow-scroll hide-scrollbar">
        <div className="flex gap-5">
          <Link to={"/inventory/Item"}>
            <div className="flex justify-center items-center h-11 w-11 bg-[#F3F3F3] rounded-full">
              <CheveronLeftIcon />
            </div>
          </Link>
          <div className="flex justify-center items-center">
            <h4 className="font-bold text-xl text-textColor ">New Invoice</h4>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 my-6">
          <div className="col-span-2 border border-inputBorder border-dashed rounded-lg  items-center justify-center flex text-center p-6 ">
            <div>
              <div className="bg-lightPink flex items-center justify-center h-24 w-44 rounded-lg">
                <div className="flex gap-4">
                  <div className="bg-darkRed rounded-full flex h-6 w-6 items-center justify-center">
                    <Plus color={"white"} classname="h-5 " />
                  </div>
                  <p>Add Image</p>
                </div>
              </div>
              <div>
                <p className="text-base font-extrabold text-textColor mt-2">
                  Upload Item Image
                </p>
                <p className="text-xs text-[#818894] mt-1">
                  Support : JPG, PNG
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-10">
            <div>
              <label className="block text-sm mb-1 text-labelColor" htmlFor="">
                Item Type
              </label>
              <div className="flex items-center space-x-4 text-textColor text-sm">
                <div className="flex gap-2 justify-center items-center ">
                  <div className="grid place-items-center mt-1">
                    <input
                      id="goods"
                      type="radio"
                      name=""
                      className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                        selected === "goods"
                          ? "border-8 border-[#97998E]"
                          : "border-1 border-[#97998E]"
                      }`}
                      onChange={() => {
                        setSelected("goods");
                        setIsService(false);
                      }}
                      checked={selected === "goods"}
                    />
                    <div
                      id="goods"
                      className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                        selected === "goods"
                          ? "bg-neutral-50"
                          : "bg-transparent"
                      }`}
                    />
                  </div>
                  <label htmlFor="goods" className="text-start font-medium">
                    Goods
                  </label>
                </div>
                <div className="flex gap-2  justify-center items-center">
                  <div className="grid place-items-center mt-1">
                    <input
                      id="service"
                      type="radio"
                      name=""
                      className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                        selected === "service"
                          ? "border-8 border-[#97998E]"
                          : "border-1 border-[#97998E]"
                      }`}
                      onChange={() => {
                        setSelected("service"), setIsService(true);
                      }}
                      checked={selected === "service"}
                    />
                    <div
                      id="service"
                      className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                        selected === "service"
                          ? "bg-neutral-50"
                          : "bg-transparent"
                      }`}
                    />
                  </div>
                  <label htmlFor="service" className="text-start font-medium">
                    Service
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-3 ">
              <div className="col-span-4">
                <label
                  className="text-slate-600 text-sm"
                  htmlFor="organizationAddress"
                >
                  Name
                  <input
                    className="pl-3 text-sm w-[100%]  rounded-md text-start mt-1.5 bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                    placeholder="Name"
                  />{" "}
                </label>
              </div>
              <div className="col-span-4">
                <label
                  className="text-slate-600 flex items-center gap-2"
                  htmlFor="organizationAddress"
                >
                  SKU
                  <CircleHelp />
                </label>
                <input
                  className="pl-3 text-sm w-[100%] mt-1.5 rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                  placeholder="Select or add a customer"
                  name=""
                />{" "}
              </div>
              <div className="relative col-span-4">
                <label
                  htmlFor="location"
                  className="text-slate-600 flex items-center gap-2"
                >
                  Unit <CircleHelp />
                </label>
                <div className="relative w-full mt-1.5">
                  <select
                    name="organizationCountry"
                    id="Location"
                    className="block appearance-none w-full   text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                  >
                    <option value="">Select unit</option>

                    <option></option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
            </div>

            {!isService && (
              <div className="flex items-center mt-4 gap-1 text-textColor">
                <input
                  type="checkbox"
                  className="accent-[#97998E] bg-white h-6 w-5 mx-1"
                  id="checkbox3"
                />
                <label
                  htmlFor=""
                  className="text-textColor text-sm font-semibold"
                >
                  Returnable Item
                </label>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4  mt-3">
              {isService ? (
                <div>
                  <label
                    className="text-slate-600 flex text-sm items-center gap-2"
                    htmlFor="organizationAddress"
                  >
                    SAC
                  </label>
                  <input
                    className="pl-3 text-sm w-[100%] mt-1.5 rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                    placeholder=" SAC"
                    name=""
                  />{" "}
                </div>
              ) : (
                <div>
                  <label
                    className="text-slate-600 flex text-sm items-center gap-2"
                    htmlFor="organizationAddress"
                  >
                    HSN Code
                  </label>
                  <input
                    className="pl-3 text-sm w-[100%] mt-1.5 rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                    placeholder="Enter HSN code"
                    name=""
                  />{" "}
                </div>
              )}
              <div className="relative ">
                <label
                  htmlFor=""
                  className="text-slate-600 text-sm flex items-center gap-2"
                >
                  Tax Preference
                </label>
                <div className="relative w-full mt-1.5">
                  <select className="block appearance-none w-full   text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed">
                    <option value="">Selcet Tax Preference</option>

                    <option></option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-textColor text-base font-semibold">
          Storage & Classification
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {!isService && (
            <>
              <label className="block text-sm   text-labelColor" htmlFor="">
                Dimensions
                <div className="flex gap-2">
                  <input
                    className=" text-sm w-[100%] rounded-md pl-3  text-start mt-1.5 bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                    placeholder="Length"
                  />{" "}
                  <input
                    className=" text-sm w-[100%] rounded-md pl-3 text-start mt-1.5 bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                    placeholder="Width"
                  />{" "}
                  <input
                    className=" text-sm w-[100%] rounded-md  pl-3 text-start mt-1.5 bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                    placeholder="Height"
                  />{" "}
                  <div className="relative w-64 mt-1.5">
                    <select
                      name="organizationCountry"
                      id="Location"
                      className="block appearance-none w-full   text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                    >
                      <option value="">CM</option>

                      <option></option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                </div>
              </label>

              <div>
                <label
                  className="text-slate-600 text-sm"
                  htmlFor="organizationAddress"
                >
                  Weight
                  <div className="flex">
                    <input
                      className="pl-3 text-sm w-[100%]  rounded-l-md text-start mt-1.5 bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                      placeholder="Weghit"
                    />{" "}
                    <div className="relative w-20 mt-1.5">
                      <select
                        name="organizationCountry"
                        id="Location"
                        className="block appearance-none w-full   text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-r-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                      >
                        <option value="">KG</option>

                        <option></option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <CehvronDown color="gray" />
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              <div className="relative ">
                <label
                  htmlFor=""
                  className="text-slate-600 text-sm flex items-center gap-2"
                >
                  Manufacturer
                </label>
                <div className="relative w-full mt-1.5">
                  <div
                    onClick={() => toggleDropdown("Manufacturer")}
                    className=" appearance-none w-full  items-center flex text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                  >
                    <p>Select or add Manufacturer</p>
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
                {openDropdownIndex === "Manufacturer" && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 bg-white  shadow  rounded-md mt-1 p-2  w-[50%] space-y-1"
                  >
                    <SearchBar
                      searchValue={searchValue}
                      onSearchChange={setSearchValue}
                      placeholder="Select Supplier"
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
                          <p className="font-bold text-sm">Soney Corporation</p>
                          <p className="text-xs text-gray-500">
                           Lorem ipusm
                          </p>
                        </div>
                        <div className="ms-auto text-2xl cursor-pointer relative -mt-2 pe-2 p-">
                          &times;
                        </div>
                      </div>
                    </div>
                    <div className="hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg py-4">
                      
                    </div>
                  </div>
                )}
              </div>

              <div className="relative ">
                <label
                  htmlFor="brand"
                  className="text-slate-600 text-sm flex items-center gap-2"
                >
                  Brand
                </label>
                <div className="relative w-full mt-1.5">
                <div
                    onClick={() => toggleDropdown("Brand")}
                    className=" appearance-none w-full  items-center flex text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                  >
                    <p>Select or add Brand</p>
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
                {openDropdownIndex === "Brand" && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 bg-white  shadow  rounded-md mt-1 p-2  w-[50%] space-y-1"
                  >
                    <SearchBar
                      searchValue={searchValue}
                      onSearchChange={setSearchValue}
                      placeholder="Select Supplier"
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
                          <p className="font-bold text-sm">Soney Corporation</p>
                          <p className="text-xs text-gray-500">
                           Lorem ipusm
                          </p>
                        </div>
                        <div className="ms-auto text-2xl cursor-pointer relative -mt-2 pe-2 p-">
                          &times;
                        </div>
                      </div>
                    </div>
                    <div   onClick={openBrandModal} 
                     className="hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg py-4 px-4 text-darkRed flex text-sm gap-2 font-bold">
                     <SettingsIcons color="darkRed" bold={2}/> <p className="mt-0.5">Manage Brand</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="relative ">
            <label
              htmlFor=""
              className="text-slate-600 text-sm flex items-center gap-2"
            >
              Category
            </label>
            <div className="relative w-full mt-1.5">
            <div
                    onClick={() => toggleDropdown("category")}
                    className=" appearance-none w-full  items-center flex text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                  >
                    <p>Select or add Manufacturer</p>
                  </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <CehvronDown color="gray" />
              </div>
            </div>
            {openDropdownIndex === "category" && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 bg-white  shadow  rounded-md mt-1 p-2  w-[50%] space-y-1"
                  >
                    <SearchBar
                      searchValue={searchValue}
                      onSearchChange={setSearchValue}
                      placeholder="Select Supplier"
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
                          <p className="font-bold text-sm">Soney Corporation</p>
                          <p className="text-xs text-gray-500">
                           Lorem ipusm
                          </p>
                        </div>
                        <div className="ms-auto text-2xl cursor-pointer relative -mt-2 pe-2 p-">
                          &times;
                        </div>
                      </div>
                    </div>
                    <div   onClick={openBrandModal} 
                     className="hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg py-4 px-4 text-darkRed flex text-sm gap-2 font-bold">
                     <SettingsIcons color="darkRed" bold={2}/> <p className="mt-0.5">Manage Category</p>
                    </div>
                  </div>
                )}
          </div>

          {!isService ? (
            <div className="relative ">
              <label
                htmlFor=""
                className="text-slate-600 text-sm flex items-center gap-2"
              >
                Rack
              </label>
              <div className="relative w-full mt-1.5">
                <select className="block appearance-none w-full   text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed">
                  <option value="">Select or add Rack</option>

                  <option></option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div>
            <label
              className="text-slate-600 flex text-sm items-center gap-2"
              htmlFor="organizationAddress"
            >
              UPC
            </label>
            <input
              className="pl-3 text-sm w-[100%] mt-1.5 rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
              placeholder="Enter UPC"
              name=""
            />{" "}
          </div>

          <div>
            <label
              className="text-slate-600 flex text-sm items-center gap-2"
              htmlFor="organizationAddress"
            >
              MPN
            </label>
            <input
              className="pl-3 text-sm w-[100%] mt-1.5 rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
              placeholder="Enter MPN"
              name=""
            />{" "}
          </div>
          <div>
            <label
              className="text-slate-600 flex text-sm items-center gap-2"
              htmlFor="organizationAddress"
            >
              EAN
            </label>
            <input
              className="pl-3 text-sm w-[100%] mt-1.5 rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
              placeholder="Enter EAN"
              name=""
            />{" "}
          </div>
          <div>
            <label
              className="text-slate-600 flex text-sm items-center gap-2"
              htmlFor="organizationAddress"
            >
              ISBN
            </label>
            <input
              className="pl-3 text-sm w-[100%] mt-1.5 rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
              placeholder="Enter ISBN"
              name=""
            />{" "}
          </div>
        </div>

        <p className="text-textColor text-base font-semibold mt-4">
          Sales Information
        </p>
        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="relative ">
            <label
              className="text-slate-600 flex text-sm  gap-2"
              htmlFor="organizationAddress"
            >
              Selling Price
            </label>
            <div className=" flex ">
              <div className="w-16 text-sm  mt-1.5 rounded-l-md text-start bg-white text-zinc-400  border border-inputBorder  h-[39px] items-center justify-center flex">
                INR
              </div>
              <input
                className="pl-3 text-sm w-[100%] mt-1.5 rounded-r-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                placeholder="Enter Price"
                name=""
              />{" "}
            </div>
          </div>
          <div className="relative ">
            <label htmlFor="" className="text-slate-600   text-sm  gap-2 ">
              Account
            </label>

            <div className="relative w-full ">
              <select className="block appearance-none w-full text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed">
                <option value="">Select Account</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <CehvronDown color="gray" />
              </div>
            </div>
          </div>

          <div>
            <label
              className="text-slate-600 flex text-sm  gap-2"
              htmlFor="organizationAddress"
            >
              Description
            </label>
            <input
              className="pl-3 text-sm w-[100%] mt-1.5 rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
              placeholder="Description"
              name=""
            />{" "}
          </div>
        </div>

        <p className="text-textColor text-base font-semibold mt-4">
          Purchase Information
        </p>

        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="relative ">
            <label
              className="text-slate-600 flex text-sm items-center gap-2"
              htmlFor="organizationAddress"
            >
              Cost Price
            </label>
            <div className=" flex ">
              <div className="w-16 text-sm  mt-1.5 rounded-l-md text-start bg-white text-zinc-400  border border-inputBorder  h-[39px] items-center justify-center flex">
                INR
              </div>
              <input
                className="pl-3 text-sm w-[100%] mt-1.5 rounded-r-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                placeholder="Enter Price"
                name=""
              />{" "}
            </div>
          </div>

          <div className="relative ">
            <label htmlFor="" className="text-slate-600   text-sm  gap-2 ">
              Account
            </label>

            <div className="relative w-full ">
              <select className="block appearance-none w-full text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed">
                <option value="">Select Account</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <CehvronDown color="gray" />
              </div>
            </div>
          </div>

          <div>
            <label
              className="text-slate-600 flex text-sm  gap-2"
              htmlFor="organizationAddress"
            >
              Description
            </label>
            <input
              className="pl-3 text-sm w-[100%] mt-1.5 rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
              placeholder="Description"
              name=""
            />{" "}
          </div>

          <div className="relative ">
            <label htmlFor="" className="text-slate-600   text-sm  gap-2 ">
              Preferred Vendor
            </label>

            <div className="relative w-full ">
              <select className="block appearance-none w-full mt-0.5 text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed">
                <option value="">Select Vendor</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <CehvronDown color="gray" />
              </div>
            </div>
          </div>

          <div className="relative ">
            <label htmlFor="" className="text-slate-600   text-sm  gap-2 ">
              State Tax Rate
            </label>

            <div className="relative w-full ">
              <select className="block appearance-none w-full mt-0.5 text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed">
                <option value="">Select State Tax Rate</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <CehvronDown color="gray" />
              </div>
            </div>
          </div>
        </div>
        <>
          <div className="flex items-center gap-1 text-textColor">
            <input
              type="checkbox"
              className="accent-[#97998E] bg-white h-6 w-5 mx-1"
              id="checkbox3"
            />
            <label
              htmlFor=""
              className="text-textColor text-base font-semibold"
            >
              Track Inventory for this item
            </label>
          </div>
          <p className="text-textColor text-sm mt-3">
            You cannot enable/disable inventory tracking once you've created
            transactions for this item
          </p>
        </>

        <div className="grid grid-cols-2 gap-4 my-3">
          <div className="relative ">
            <label htmlFor="" className="text-slate-600   text-sm  gap-2 ">
              Inventory Account
            </label>

            <div className="relative w-full ">
              <select className="block appearance-none w-full text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed">
                <option value="">Select account</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <CehvronDown color="gray" />
              </div>
            </div>
          </div>
          <div>
            <label className="text-slate-600 flex text-sm  gap-2" htmlFor="">
              Opening Balance
            </label>
            <input
              className="pl-3 text-sm w-[100%] mt-1.5 rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
              placeholder="Value"
              name=""
            />{" "}
          </div>

          <div>
            <label className="text-slate-600 flex text-sm  gap-2" htmlFor="">
              Opening Stock Rate Per Unit
            </label>
            <input
              className="pl-3 text-sm w-[100%] mt-1.5 rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
              placeholder="Value"
              name=""
            />{" "}
          </div>

          <div>
            <label className="text-slate-600 flex text-sm  gap-2" htmlFor="">
              Recorder Point
            </label>
            <input
              className="pl-3 text-sm w-[100%] mt-1.5 rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
              placeholder="Value"
              name=""
            />{" "}
          </div>
        </div>
      </div>{" "}
      <div className="justify-end m-5 flex gap-4">
        <Button variant="secondary" size="sm" className="text-sm">
          Cancel
        </Button>
        <Button variant="primary" size="sm" className="text-sm">
          Save
        </Button>
      </div>
      {isBrandModalOpen && (
        <BrandModal ref={modalRef} onClose={closeBrandModal} />
      )}
    </>
  );
};

export default AddItem;
