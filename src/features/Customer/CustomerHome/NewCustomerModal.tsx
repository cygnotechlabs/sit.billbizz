import { useState } from "react";
import Button from "../../../Components/Button";
import CehvronDown from "../../../assets/icons/CehvronDown";
import Upload from "../../../assets/icons/Upload";
import Modal from "../../../Components/model/Modal";
import PlusCircle from "../../../assets/icons/PlusCircle";
import CirclePlus from "../../../assets/icons/circleplus";
import Globe from "../../../assets/icons/Globe";

type Props = { page: string };

const NewCustomerModal = ({ page }: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("otherDetails");
  const [rows, setRows] = useState([
    { salutation: "", firstName: "", lastName: "", email: "", mobile: "" },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { salutation: "", firstName: "", lastName: "", email: "", mobile: "" },
    ]);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getTabClassName = (tabName: any) => {
    return activeTab === tabName
      ? " cursor-pointer font-bold text-darkRed"
      : " cursor-pointer font-bold";
  };

  const getBorderClassName = (tabName: any) => {
    return activeTab === tabName ? "border-darkRed" : "border-neutral-300";
  };

  return (
    <div>
      {(page && page == "purchase") || page == "sales" ? (
        <div
          className="w-full flex col-span-10  px-4  justify-between"
          onClick={openModal}
        >
          <div className="flex items-center  space-x-1">
            <CirclePlus color="darkRed" size="18" />

            <p className="text-[#820000] text-sm">
              <b>Add new Customer</b>
            </p>
          </div>
          <div className=" col-span-2 text-end text-2xl cursor-pointer relative ">
            &times;
          </div>
        </div>
      ) : (
        <Button onClick={openModal} variant="primary" size="sm">
          <PlusCircle color="white" />{" "}
          <p className="text-sm font-medium">Add Customer</p>
        </Button>
      )}

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className=""
        style={{ width: "80%" }}
      >
        <>
          <div className="p-5 mt-3">
            <div className="mb-5 flex p-2 rounded-xl bg-CreamBg relative overflow-hidden items-center">
              <div className="relative ">
                <h3 className="text-lg font-bold text-textColor">
                  Add New Customer
                </h3>
              </div>
              <div
                className="ms-auto text-3xl cursor-pointer relative z-10"
                onClick={closeModal}
              >
                &times;
              </div>
            </div>
            <form
              className="text-slate-600 text-sm overflow-scroll hide-scrollbar space-y-5 p-2"
              style={{ height: "480px" }}
            >
              <div>
                <label
                  className="block text-sm mb-1 text-labelColor"
                  htmlFor=""
                >
                  Customer Type
                </label>
                <div className="flex items-center space-x-4 text-textColor text-sm">
                  <div className="flex gap-2 justify-center items-center ">
                    <div className="grid place-items-center mt-1">
                      <input
                        id="business"
                        type="radio"
                        name=""
                        className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                          selected === "business"
                            ? "border-8 border-neutral-400"
                            : "border-1 border-neutral-400"
                        }`}
                        onChange={() => setSelected("business")}
                        checked={selected === "business"}
                      />
                      <div
                        id="business"
                        className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                          selected === "business"
                            ? "bg-neutral-100"
                            : "bg-transparent"
                        }`}
                      />
                    </div>
                    <label
                      htmlFor="business"
                      className="text-start font-medium"
                    >
                      Business
                    </label>
                  </div>
                  <div className="flex gap-2  justify-center items-center">
                    <div className="grid place-items-center mt-1">
                      <input
                        id="indvidual"
                        type="radio"
                        name=""
                        className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                          selected === "indvidual"
                            ? "border-8 border-neutral-400"
                            : "border-1 border-neutral-400"
                        }`}
                        onChange={() => setSelected("indvidual")}
                        checked={selected === "indvidual"}
                      />
                      <div
                        id="indvidual"
                        className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                          selected === "indvidual"
                            ? "bg-neutral-100"
                            : "bg-transparent"
                        }`}
                      />
                    </div>
                    <label
                      htmlFor="indvidual"
                      className="text-start font-medium"
                    >
                      Indvidual
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-2">
                  <label htmlFor="">Salutation</label>
                  <div className="relative w-full">
                    <select className="block appearance-none w-full h-9 mt-1 text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option value="" className="text-gray">
                        Value
                      </option>
                      <option value="" className="text-gray">
                        {" "}
                        Mr
                      </option>
                      <option value="" className="text-gray">
                        {" "}
                        Mrs
                      </option>
                      <option value="" className="text-gray">
                        {" "}
                        Ms
                      </option>
                      <option value="" className="text-gray">
                        {" "}
                        Dr
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 col-span-10 gap-4 ">
                  <div>
                    <label htmlFor="" className="text-slate-600">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                      placeholder="Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="" className="text-slate-600">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                      placeholder="Value"
                    />
                  </div>

                  <div>
                    <label htmlFor="">Company Name </label>
                    <input
                      type="text"
                      className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                      placeholder="Value"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="">Customer Email</label>
                  <input
                    type="text"
                    className="pl-2 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Value"
                  />
                </div>
                <div>
                  <label htmlFor="">Work Phone</label>
                  <input
                    type="text"
                    className="pl-2 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Value"
                  />
                </div>
                <div>
                  <label htmlFor="">Mobile</label>
                  <input
                    type="text"
                    className="pl-2 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Value"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="w-full">
                  <label
                    htmlFor="date-of-birth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of birth
                  </label>
                  <div className="relative pl-2 text-sm w-full mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2">
                    {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
          <Calender color="currentColor" height={18} width={18} />
        </div> */}
                    <input
                      id="date-of-birth"
                      placeholder="Select Date"
                      type="date"
                      className="w-full h-full pl-2 pr-8 text-sm bg-white border-none focus:outline-none focus:ring-0 text-gray"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="">Card Number</label>
                  <input
                    type="text"
                    className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="XXX"
                  />
                </div>
              </div>

              <div className="flex mt-5 px-5">
                <div className="w-[20%] bg-gray-100 p-4">
                  <ul className="h-full   space-y-0 border-gray-300 text-slate-700">
                    <li
                      className={`${getTabClassName(
                        "otherDetails"
                      )} border-r-4 ${getBorderClassName("otherDetails")} p-2 `}
                      onClick={() => setActiveTab("otherDetails")}
                    >
                      Other Details
                    </li>
                    <li
                      className={`${getTabClassName(
                        "taxes"
                      )} border-r-4 ${getBorderClassName("taxes")} p-2`}
                      onClick={() => setActiveTab("taxes")}
                    >
                      Taxes
                    </li>
                    <li
                      className={`${getTabClassName(
                        "address"
                      )} border-r-4 ${getBorderClassName("address")} p-2`}
                      onClick={() => setActiveTab("address")}
                    >
                      Address
                    </li>
                    <li
                      className={`${getTabClassName(
                        "contactPersons"
                      )} border-r-4 ${getBorderClassName(
                        "contactPersons"
                      )} p-2`}
                      onClick={() => setActiveTab("contactPersons")}
                    >
                      Contact Persons
                    </li>
                    <li
                      className={`${getTabClassName(
                        "remarks"
                      )} border-r-4 ${getBorderClassName("remarks")} p-2`}
                      onClick={() => setActiveTab("remarks")}
                    >
                      Remarks
                    </li>
                    {/* <li
                      className={`${getTabClassName(
                        "customFields2"
                      )} border-r-4 ${getBorderClassName("customFields2")} p-2`}
                      //   onClick={() => setActiveTab('customFields2')}
                    >
                      Custom fields
                    </li> */}
                  </ul>
                </div>
                <div className=" w-full p-2 ps-16">
                  {activeTab === "otherDetails" && (
                    <div className="space-y-4  p-4 ">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1">PAN</label>
                          <input
                            type="text"
                            className=" text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                            placeholder="Value"
                          />
                        </div>
                        <div>
                          <div className="">
                            <label htmlFor="" className="block mb-1">
                              Currency
                            </label>
                            <div className="relative w-full">
                              <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value="" className="text-gray">
                                  {" "}
                                  INR - Indian Rupee
                                </option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <CehvronDown color="gray" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block mb-1">Opening Balance</label>
                          <input
                            type="text"
                            className=" text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-p p-2"
                            placeholder="INR"
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Payment Terms</label>
                          <input
                            type="text"
                            className=" text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                            placeholder="Due on Receipt"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block mb-1">Documents</label>
                        <div className="border-dashed border border-neutral-300 p-2 rounded flex gap-2">
                          <Upload />
                          <span>Upload File</span>
                        </div>
                        <p className="text-xs mt-1 text-gray-600">
                          You Can Upload a Maximum of 10 Files, 10 MB each
                        </p>
                      </div>

                      <div>
                        <label className="block mb-1">Derpartment</label>
                        <input
                          type="text"
                          className=" text-sm w-[49%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                          placeholder="Value"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Designation</label>

                        <input
                          type="text"
                          className=" text-sm w-[49%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                          placeholder="Value"
                        />
                      </div>

                      <div className="">
                        <label htmlFor="" className="block mb-1">
                          Website
                        </label>
                        <div className="relative w-full">
                          <div className="pointer-events-none absolute inset-y-0  flex items-center px-2 text-gray-700 w-[50%]">
                            <Globe />
                          </div>
                          <input
                            type="text"
                            className=" text-sm w-[49%] ps-9 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                            placeholder="Value"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "taxes" && (
                    <div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative w-full">
                          <label htmlFor="" className="block mb-1">
                            GST Treatement
                          </label>
                          <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option value="" className="text-gray">
                              {" "}
                              Select GST Treatment
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-6 text-gray-700">
                            <CehvronDown color="gray" />
                          </div>
                        </div>
                        <div className="relative w-full">
                          <label htmlFor="" className="block mb-1">
                            Source of supply
                          </label>
                          <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option value="" className="text-gray">
                              {" "}
                              Value
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-6 text-gray-700">
                            <CehvronDown color="gray" />
                          </div>
                        </div>
                        <div>
                          <label className="block mb-1">GST Treatment</label>
                          <input
                            type="text"
                            className=" text-sm w-full  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                            placeholder="GSTIN/UIN"
                          />
                        </div>
                        <div></div>
                        <div>
                          <label className="block mb-1">MSME Registred?</label>
                          <div className="flex items-center gap-3">
                           
                             <input type="checkbox" className="accent-[#97998E] bg-white h-6 w-5 mx-1" id="checkbox3"/>
                            <label htmlFor="">
                              The Vendor is MSME Registred
                            </label>
                          </div>
                        </div>
                        <div></div>
                        <div className="relative w-full">
                          <label htmlFor="" className="block mb-1">
                            MSME/Udyam Registration Type
                          </label>
                          <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option value="" className="text-gray">
                              {" "}
                              Select a Registration Type
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-6 text-gray-700">
                            <CehvronDown color="gray" />
                          </div>
                        </div>
                        <div className="relative w-full">
                          <label htmlFor="" className="block mb-1">
                            MSME/Udyam Registration Number
                          </label>
                          <input
                            type="text"
                            className=" text-sm  ps-2 rounded-md text-start bg-white border border-slate-300  h-9 p-2 w-full"
                            placeholder="Enter the Registration Numebr"
                          />{" "}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "address" && (
                    <>
                      {/* billing address */}
                      <div className="space-y-3 p-5  text-sm">
                        <p>
                          <b>Billing Address</b>
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-1">Attention</label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                            />
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              Country/Region
                            </label>
                            <select className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option value="" className="text-gray">
                                {" "}
                                Select
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block mb-1">Attention</label>
                          <textarea
                            rows={2}
                            className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  p-2"
                            placeholder="Value"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-1">City</label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                            />
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              State
                            </label>
                            <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option value="" className="text-gray">
                                {" "}
                                Select
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block mb-1">Pincode</label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                            />
                          </div>
                          <div>
                            <label className="block mb-1">Phone</label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                            />
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              Fax Number
                            </label>
                            <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option value="" className="text-gray">
                                {" "}
                                Select
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* shipping address */}
                      <div className="space-y-3 p-5  text-sm">
                        <p>
                          <b>Shippping Address</b>
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-1">Attention</label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-10 p-2"
                              placeholder="Value"
                            />
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              Country/Region
                            </label>
                            <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option value="" className="text-gray">
                                {" "}
                                Select
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block mb-1">Attention</label>
                          <textarea
                            rows={2}
                            className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  p-2"
                            placeholder="Value"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-1">City</label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                            />
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              State
                            </label>
                            <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option value="" className="text-gray">
                                {" "}
                                Select
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block mb-1">Pincode</label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                            />
                          </div>
                          <div>
                            <label className="block mb-1">Phone</label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                            />
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              Fax Number
                            </label>
                            <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option value="" className="text-gray">
                                {" "}
                                Select
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {activeTab === "contactPersons" && (
                    <>
                      <div className="rounded-lg border-2 border-tableBorder mt-5">
                        <table className="min-w-full bg-white rounded-lg relative mb-4 border-dropdownText ">
                          <thead className="text-[12px] text-center text-dropdownText">
                            <tr className="bg-lightPink ">
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                Salutation
                              </th>
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                FirstName
                              </th>
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                LastName
                              </th>
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                Email Address
                              </th>
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                Mobile
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-dropdownText text-center text-[13px] ">
                            {rows.map((_, index) => (
                              <tr className="relative text-center" key={index}>
                                <td className="py-2.5 px- border-y border-tableBorder justify-center mt-4 gap-2 items-center flex-1">
                                  <div className="relative w-full">
                                    <select className="block relative appearance-none w-full h-9 focus:border-none text-zinc-400 bg-white text-sm text-center border-none rounded-md leading-tight">
                                      <option value="" className="text-gray">
                                        {" "}
                                        Select
                                      </option>
                                      <option value="Mr" className="text-gray">
                                        {" "}
                                        Mr
                                      </option>
                                      <option value="Mrs" className="text-gray">
                                        {" "}
                                        Mrs
                                      </option>
                                      <option
                                        value="Miss"
                                        className="text-gray"
                                      >
                                        {" "}
                                        Miss
                                      </option>
                                      <option value="Dr" className="text-gray">
                                        {" "}
                                        Dr
                                      </option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 -right-8 flex items-center px-2 text-gray-700">
                                      <CehvronDown color="gray" />
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2.5 px-4 border-y border-tableBorder">
                                  <input
                                    type="text"
                                    className="text-sm w-[100%] text-center rounded-md bg-white h-9 p-2"
                                    placeholder="Value"
                                  />
                                </td>
                                <td className="py-2.5 px-4 border-y border-tableBorder flex-1">
                                  <input
                                    type="text"
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                    placeholder="Value"
                                  />
                                </td>
                                <td className="py-2.5 px-4 border-y border-tableBorder relative">
                                  <input
                                    type="text"
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                    placeholder="Value"
                                  />
                                </td>
                                <td className="py-2.5 px-4 border-y border-tableBorder relative">
                                  <input
                                    type="text"
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                    placeholder="Value"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div
                        className="flex gap-2 text-darkRed font-bold items-center my-4 cursor-pointer"
                        onClick={addRow}
                      >
                        <PlusCircle color={"darkRed"} />
                        Add Contact Person
                      </div>
                    </>
                  )}
                  {activeTab === "remarks" && (
                    <div>
                      <div>
                        <label className="block mb-1">Remarks</label>
                        <textarea
                          rows={3}
                          className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300   p-2"
                          placeholder="Value"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-end gap-2 mb-3 m-5">
            <Button variant="primary" size="sm">
              Save
            </Button>
            <Button onClick={closeModal} variant="secondary" size="sm">
              Cancel
            </Button>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default NewCustomerModal;
