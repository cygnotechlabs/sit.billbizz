import { useState } from "react";
import Button from "../../../Components/Button";
import CehvronDown from "../../../assets/icons/CehvronDown";
import Upload from "../../../assets/icons/Upload";
import Modal from "../../../Components/model/Modal";
import PlusCircle from "../../../assets/icons/PlusCircle";
import CirclePlus from "../../../assets/icons/circleplus";
import Globe from "../../../assets/icons/Globe";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";

type Props = { page: string };
type CustomerData = {
  organizationId: string;
  customerType: string;
  salutation: string;
  firstName: string;
  lastName: string;
  companyName: string;
  customerEmail: string;
  workPhone: string;
  mobile: string;
  dob: string;
  cardNumber: string;
  pan: string;
  currency: string;
  openingBalance: string;
  paymentTerms: string;
  documents: string;
  department: string;
  designation: string;
  websiteURL: string;
  gstTreatment: string;
  gstin_uin: string;
  msmeType: string;
  msmeNumber: string;
  placeOfSupply: string;
  billingAttention: string;
  billingCountry: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingPinCode: string;
  billingPhone: string;
  billingFaxNumber: string;
  shippingAttention: string;
  shippingCountry: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPinCode: string;
  shippingPhone: string;
  shippingFaxNumber: string;
  contactPerson: {
    salutation: string;
    firstName: string;
    lastName: string;
    companyName: string;
    customerEmail: string;
    workPhone: string;
    mobile: string;
  }[];
  remark: string;
};

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
  const initialCustomerData = {
    organizationId: "",
    customerType: "",
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    customerEmail: "",
    workPhone: "",
    mobile: "",
    dob: "",
    cardNumber: "",
    pan: "",
    currency: "",
    openingBalance: "",
    paymentTerms: "",
    documents: "",
    department: "",
    designation: "",
    websiteURL: "",
    gstTreatment: "",
    gstin_uin: "",
    msmeType: "",
    msmeNumber: "",
    placeOfSupply: "",
    billingAttention: "",
    billingCountry: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingPinCode: "",
    billingPhone: "",
    billingFaxNumber: "",
    shippingAttention: "",
    shippingCountry: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingPinCode: "",
    shippingPhone: "",
    shippingFaxNumber: "",
    contactPerson: [
      {
        salutation: "",
        firstName: "",
        lastName: "",
        companyName: "",
        customerEmail: "",
        workPhone: "",
        mobile: "",
      },
    ],
    remark: "",
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getTabClassName = (tabName: string) => {
    return activeTab === tabName
      ? "cursor-pointer font-bold text-darkRed"
      : "cursor-pointer font-bold";
  };

  const getBorderClassName = (tabName: string) => {
    return activeTab === tabName ? "border-darkRed" : "border-neutral-300";
  };

  const [isMsmeRegistered, setIsMsmeRegistered] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsMsmeRegistered(event.target.checked);
  };

  const [customerdata, setCustomerData] =
    useState<CustomerData>(initialCustomerData);

  console.log(customerdata);
  // data from input fields
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setCustomerData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // data from checkboxes
  const handleRadioChange = (type: string) => {
    setSelected(type);
    setCustomerData((prevFormData) => ({
      ...prevFormData,
      customerType: type,
    }));
  };
  //data from table
  const handleRowChange = (
    index: number,
    field: keyof (typeof rows)[number],
    value: string
  ) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    const updatedContactPerson = updatedRows.map((row) => ({
      salutation: row.salutation,
      firstName: row.firstName,
      lastName: row.lastName,
      companyName: "",
      customerEmail: row.email,
      workPhone: "",
      mobile: row.mobile,
    }));

    setCustomerData((prevFormData) => ({
      ...prevFormData,
      contactPerson: updatedContactPerson,
    }));
  };

  //api call
  const { request: CreateCustomer } = useApi("post", 5002);
  const handleSubmit = async () => {
    try {
      const url = `${endponits.ADD_CUSTOMER}`;
      const body = customerdata;
      const { response, error } = await CreateCustomer(url, body);
      if (response && !error) {
        alert("Customer created successfully:");
        setCustomerData(initialCustomerData);
        setModalOpen(false);
      } else if (error) {
        console.error(
          "Error creating customer:",
          error.response?.data?.message || error.message
        );
      }
    } catch (error) {
      console.error("Unexpected error:");
    }
  };

  return (
    <div>
      {page && (page === "purchase" || page === "sales") ? (
        <div
          className="w-full flex col-span-10  px-4  justify-between"
          onClick={() => setModalOpen(true)}
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
        <Button onClick={() => setModalOpen(true)} variant="primary" size="sm">
          <PlusCircle color="white" />{" "}
          <p className="text-sm font-medium">Add Customer</p>
        </Button>
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
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
                onClick={() => setModalOpen(false)}
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
                    <div
                      className="grid place-items-center mt-1"
                      onChange={() => handleRadioChange("business")}
                    >
                      <input
                        id="business"
                        type="radio"
                        name="customerType"
                        className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                          selected === "business"
                            ? "border-8 border-neutral-400"
                            : "border-1 border-neutral-400"
                        }`}
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
                    <div
                      className="grid place-items-center mt-1"
                      onChange={() => handleRadioChange("individual")}
                    >
                      <input
                        id="individual"
                        type="radio"
                        name="customerType"
                        className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                          selected === "individual"
                            ? "border-8 border-neutral-400"
                            : "border-1 border-neutral-400"
                        }`}
                        checked={selected === "individual"}
                      />
                      <div
                        id="individual"
                        className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                          selected === "individual"
                            ? "bg-neutral-100"
                            : "bg-transparent"
                        }`}
                      />
                    </div>
                    <label
                      htmlFor="individual"
                      className="text-start font-medium"
                    >
                      Individual
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-2">
                  <label htmlFor="salutation">Salutation</label>
                  <div className="relative w-full">
                    <select
                      name="salutation"
                      className="block appearance-none w-full h-9 mt-1 text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      value={customerdata.salutation}
                      onChange={handleChange}
                    >
                      <option value="">Value</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 col-span-10 gap-4 ">
                  <div>
                    <label htmlFor="firstName" className="text-slate-600">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                      placeholder="Name"
                      value={customerdata.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="text-slate-600">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                      placeholder="Value"
                      value={customerdata.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="companyName">Company Name </label>
                  <input
                    type="text"
                    name="companyName"
                    className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Enter Company Name"
                    value={customerdata.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="companyName">Customer Display Name </label>
                  <input
                    type="text"
                    name="customerDispalyName"
                    className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Enter Display Name"
                    // value={customerdata.customerDisplayName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="">Customer Email</label>
                  <input
                    type="text"
                    name="customerEmail"
                    className="pl-2 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Enter Email"
                    value={customerdata.customerEmail}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="">Card Number</label>
                  <input
                    type="text"
                    className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="XXX"
                    name="cardNumber"
                    value={customerdata.cardNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="">Work Phone</label>
                  <input
                    type="text"
                    name="workPhone"
                    className="pl-2 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Value"
                    value={customerdata.workPhone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    className="pl-2 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Value"
                    value={customerdata.mobile}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* <div className="w-full">
                  <label
                    htmlFor="date-of-birth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of birth
                  </label>
                  <div className="relative pl-2 text-sm w-full mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
          <Calender color="currentColor" height={18} width={18} />
        </div>
                    <input
                      id="date-of-birth"
                      placeholder="Select Date"
                      type="date"
                      name="dob"
                      value={customerdata.dob}
                      onChange={handleChange}
                      className="w-full h-full pl-2 pr-8 text-sm bg-white border-none focus:outline-none focus:ring-0 text-gray"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                </div> */}
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
                            placeholder="Enter Pan Number"
                            name="pan"
                            value={customerdata.pan}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <div className="">
                            <label htmlFor="" className="block mb-1">
                              Currency
                            </label>
                            <div className="relative w-full">
                              <select
                                className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder 
                                 text-sm pl-2 pr-8 rounded-md leading-tight 
                                 focus:outline-none focus:bg-white focus:border-gray-500"
                                name="currency"
                                value={customerdata.currency}
                                onChange={handleChange}
                              >
                                <option value="" className="text-gray">
                                  Select Currency
                                </option>
                                <option value="INR" className="text-gray">
                                  INR - Indian Rupee
                                </option>
                                <option value="USD" className="text-gray">
                                  USD - US Dollar
                                </option>
                                <option value="CAD" className="text-gray">
                                  CAD - Canadian Dollar
                                </option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <CehvronDown color="gray" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative w-full">
                          <label htmlFor="" className="block mb-1">
                            Payment Terms
                          </label>
                          <select
                            className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder 
                                 text-sm pl-2 pr-8 rounded-md leading-tight 
                                 focus:outline-none focus:bg-white focus:border-gray-500"
                            name="currency"
                            value={customerdata.paymentTerms}
                            onChange={handleChange}
                          >
                            <option value="" className="text-gray">
                              Select Payment Terms
                            </option>
                            <option
                              value="Payment On Due"
                              className="text-gray"
                            >
                              Paymeny On due
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0  mt-6 right-0 flex items-center px-2 text-gray-700">
                            <CehvronDown color="gray" />
                          </div>
                        </div>
                        <div className="relative w-full">
                          <label htmlFor="" className="block mb-1">
                            Place of Supply
                          </label>
                          <select
                            className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder 
                                 text-sm pl-2 pr-8 rounded-md leading-tight 
                                 focus:outline-none focus:bg-white focus:border-gray-500"
                            name="currency"
                            value={customerdata.placeOfSupply}
                            onChange={handleChange}
                          >
                            <option value="" className="text-gray">
                              Select Place of Supply
                            </option>
                            <option
                              value="Payment On Due"
                              className="text-gray"
                            >
                              Paymeny On due
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0  mt-6 right-0 flex items-center px-2 text-gray-700">
                            <CehvronDown color="gray" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-lightPink p-5 rounded-lg space-y-5">
                        <p className="font-bold text-">Enable Portal?</p>
                        <div className="flex items-center mt-4 gap-1 text-textColor">
                          <input
                            type="checkbox"
                            className="accent-[#97998E] bg-white h-6 w-5 mx-1"
                            id=""
                          />
                          <label htmlFor="" className="text-textColor text-sm ">
                            Allow portal access to this customer
                          </label>
                        </div>
                        <div className="relative w-[349px]">
                          <label htmlFor="" className="block mb-1 ">
                            Select Language
                          </label>
                          <select
                            className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder 
                                 text-sm pl-2 pr-8 rounded-md leading-tight 
                                 focus:outline-none focus:bg-white focus:border-gray-500"
                            name="currency"
                            // value={customerdata}
                            onChange={handleChange}
                          >
                            <option value="" className="text-gray">
                              Select Language
                            </option>
                            <option
                              value="Payment On Due"
                              className="text-gray"
                            >
                              Paymeny On due
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0  mt-6 right-0 flex items-center px-2 text-gray-700">
                            <CehvronDown color="gray" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block mb-1">Documents
                        <div className="border-dashed border border-neutral-300 p-2 rounded flex gap-2">
                          <Upload />
                          <span>Upload File</span>
                        </div>
                        <p className="text-xs mt-1 text-gray-600">
                          You Can Upload a Maximum of 10 Files, 10 MB each
                        </p>
                        <input type="file" className="hidden" />
                        </label>
                      </div>

                      <div>
                        <label className="block mb-1">Derpartment</label>
                        <input
                          type="text"
                          className=" text-sm w-[49%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                          placeholder="Value"
                          name="department"
                          value={customerdata.department}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Designation</label>

                        <input
                          type="text"
                          className=" text-sm w-[49%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                          placeholder="Value"
                          name="designation"
                          value={customerdata.designation}
                          onChange={handleChange}
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
                            name="websiteURL"
                            value={customerdata.websiteURL}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "taxes" && (
                    <div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative w-full">
                          <label htmlFor="gstTreatment" className="block mb-1">
                            GST Treatment
                          </label>
                          <select
                            className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="gstTreatment"
                            value={customerdata.gstTreatment}
                            onChange={handleChange}
                          >
                            <option value="" className="text-gray">
                              Select GST Treatment
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-6 text-gray-700">
                            <CehvronDown color="gray" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="gstin_uin" className="block mb-1">
                            GSTIN/UIN
                          </label>
                          <input
                            type="text"
                            name="gstin_uin"
                            className="text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                            placeholder="GSTIN/UIN"
                            value={customerdata.gstin_uin}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="gstin_uin" className="block mb-1">
                            Business Legal Name
                          </label>
                          <input
                            type="text"
                            name="gstin_uin"
                            className="text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                            placeholder=""
                            // value={customerdata}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="gstin_uin" className="block mb-1">
                            Business Trade Name
                          </label>
                          <input
                            type="text"
                            name="gstin_uin"
                            className="text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                            placeholder=""
                            // value={customerdata}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="relative w-full">
                          <label htmlFor="placeOfSupply" className="block mb-1">
                            Place of supply
                          </label>
                          <select
                            className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="placeOfSupply"
                            value={customerdata.placeOfSupply}
                            onChange={handleChange}
                          >
                            <option value="" className="text-gray">
                              Value
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-6 text-gray-700">
                            <CehvronDown color="gray" />
                          </div>
                        </div>

                        <div></div>

                        <div></div>
                        {isMsmeRegistered && (
                          <>
                            <div className="relative w-full">
                              <label htmlFor="msmeType" className="block mb-1">
                                MSME/Udyam Registration Type
                              </label>
                              <select
                                className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="msmeType"
                                value={customerdata.msmeType}
                                onChange={handleChange}
                              >
                                <option value="" className="text-gray">
                                  Select a Registration Type
                                </option>
                                {/* Add your other options here */}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-6 text-gray-700">
                                <CehvronDown color="gray" />
                              </div>
                            </div>
                            <div className="relative w-full">
                              <label
                                htmlFor="msmeRegistrationNumber"
                                className="block mb-1"
                              >
                                MSME/Udyam Registration Number
                              </label>
                              <input
                                type="text"
                                name="msmeNumber"
                                className="text-sm ps-2 rounded-md text-start bg-white border border-slate-300 h-9 p-2 w-full"
                                placeholder="Enter the Registration Number"
                                value={customerdata.msmeNumber}
                                onChange={handleChange}
                              />
                            </div>
                          </>
                        )}
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
                              name="billingAttention"
                              value={customerdata.billingAttention}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              Country/Region
                            </label>
                            <select
                              className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="billingCountry"
                              value={customerdata.billingCountry}
                              onChange={handleChange}
                            >
                              <option value="" className="text-gray">
                                Select
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
                        </div>
                        <div className="pt-3">
                          <label
                            className="text-slate-600 "
                            htmlFor="organizationAddress"
                          >
                            Address
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-4  ">
                          <div>
                            <input
                              className="pl-3 text-sm w-[100%]  rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Street 1"
                              name="addline1"
                            />{" "}
                          </div>

                          <div>
                            <input
                              className="pl-3 text-sm w-[100%]  rounded-md text-start bg-white border border-inputBorder h-[39px] p-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Street 2"
                              name="addline2"
                            />{" "}
                          </div>
                          <div>
                            <div>
                              <label className="text-slate-600 " htmlFor="">
                                City
                              </label>
                            </div>
                            <input
                              className="pl-3 text-sm w-[100%] rounded-md text-start bg-white border border-inputBorder  h-[39px] p-2 mt-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Enter City"
                              name="city"
                            />{" "}
                          </div>

                          <div className="relative ">
                            <div>
                              <label
                                className="text-slate-600 "
                                htmlFor="organizationAddress"
                              >
                                State / Region / County
                              </label>
                            </div>
                            <div className="relative w-full mt-2">
                              <select
                                name="state"
                                id="state"
                                className="block appearance-none w-full text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white  focus:border-darkRed"
                              >
                                <option value="">
                                  State / Region / County
                                </option>
                              </select>

                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <CehvronDown color="gray" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div>
                            <label
                              className="text-slate-600 "
                              htmlFor="organizationAddress"
                            >
                              Pin / Zip / Post code
                            </label>
                            <input
                              className="pl-3 text-sm w-[100%] rounded-md text-start bg-white border border-inputBorder  h-[39px] p-2 mt-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder=" Pin / Zip / Post code"
                              type="text"
                              name="pincode"
                            />{" "}
                          </div>
                          <div>
                            <label
                              className="text-slate-600 "
                              htmlFor="organizationAddress"
                            >
                              Phone
                            </label>
                            <div className="flex">
                              <div className="relative w-24  mt-2 ">
                                <select
                                  name="phoneCode"
                                  id="phoneCode"
                                  className="block appearance-none w-full text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-l-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                                >
                                  <option value="">+91</option>
                                </select>

                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <CehvronDown
                                    color="gray"
                                    height={15}
                                    width={15}
                                  />
                                </div>
                              </div>
                              <input
                                className="pl-3 text-sm w-[100%] rounded-r-md text-start bg-white border border-inputBorder  h-[39px] p-2 mt-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                                placeholder="Phone"
                                type="tel"
                                name="organizationPhNum"
                              />{" "}
                            </div>
                          </div>

                          <div className="relative w-full">
                            <label htmlFor="" className="mb-2 block">
                              Fax Number
                            </label>
                            <select
                              className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="billingFaxNumber"
                              value={customerdata.billingFaxNumber}
                              onChange={handleChange}
                            >
                              <option value="" className="text-gray">
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
                      <div className="flex">
                          <p>
                            <b>Shipping Address</b>
                          </p>

                          <p className="ml-auto text-gray"><b>Copy Billing Address</b></p>
                      </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-1">Attention</label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                              name="billingAttention"
                              value={customerdata.shippingAttention}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              Country/Region
                            </label>
                            <select
                              className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="billingCountry"
                              value={customerdata.shippingCountry}
                              onChange={handleChange}
                            >
                              <option value="" className="text-gray">
                                Select
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <label
                            className="text-slate-600 "
                            htmlFor="organizationAddress"
                          >
                            Address
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-4 ">
                          <div>
                            <input
                              className="pl-3 text-sm w-[100%]  rounded-md text-start bg-white  border border-inputBorder  h-9  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Street 1"
                              name="addline1"
                            />{" "}
                          </div>

                          <div>
                            <input
                              className="pl-3 text-sm w-[100%]  rounded-md text-start bg-white border border-inputBorder h-9 p-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Street 2"
                              name="addline2"
                            />{" "}
                          </div>
                          <div>
                              <label className="text-slate-600 " htmlFor="">
                                City
                              </label>
                            <input
                              className="pl-3 text-sm w-[100%] rounded-md text-start bg-white border border-inputBorder  h-9 p-2 mt-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Enter City"
                              name="city"
                            />{" "}
                          </div>

                          <div className="relative ">
                            <div>
                              <label
                                className="text-slate-600 "
                                htmlFor="organizationAddress"
                              >
                                State / Region / County
                              </label>
                            </div>
                            <div className="relative w-full mt-2">
                              <select
                                name="state"
                                id="state"
                                className="block appearance-none w-full text-zinc-400 bg-white border border-inputBorder text-sm h-9 pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white  focus:border-darkRed"
                              >
                                <option value="">
                                  State / Region / County
                                </option>
                              </select>

                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <CehvronDown color="gray" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div className="">
                            <label
                              className="text-slate-600 "
                              htmlFor="organizationAddress"
                            >
                              Pin / Zip / Post code
                            </label>
                            <input
                              className="pl-3 text-sm w-[100%] rounded-md text-start bg-white border border-inputBorder  h-9 p-2 mt-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder=" Pin / Zip / Post code"
                              type="text"
                              name="pincode"
                            />{" "}
                          </div>
                          <div>
                            <label
                              className="text-slate-600 "
                              htmlFor="organizationAddress"
                            >
                              Phone
                            </label>
                            <div className="flex">
                              <div className="relative w-24  mt-2 ">
                                <select
                                  name="phoneCode"
                                  id="phoneCode"
                                  className="block appearance-none w-full text-zinc-400 bg-white border border-inputBorder text-sm h-9 pl-3 pr-8 rounded-l-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                                >
                                  <option value="">+91</option>
                                </select>

                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <CehvronDown
                                    color="gray"
                                    height={15}
                                    width={15}
                                  />
                                </div>
                              </div>
                              <input
                                className="pl-3 text-sm w-[100%] rounded-r-md text-start bg-white border border-inputBorder  h-9 p-2 mt-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                                placeholder="Phone"
                                type="tel"
                                name="organizationPhNum"
                              />{" "}
                            </div>
                          </div>

                          <div className="relative w-full">
                            <label htmlFor="" className="mb-2 block">
                              Fax Number
                            </label>
                            <select
                              className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="billingFaxNumber"
                              value={customerdata.shippingFaxNumber}
                              onChange={handleChange}
                            >
                              <option value="" className="text-gray">
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
                        <table className="min-w-full bg-white rounded-lg relative mb-4 border-dropdownText">
                          <thead className="text-[12px] text-center text-dropdownText">
                            <tr className="bg-lightPink">
                              <th className="py-2 px-5 font-medium border-b border-tableBorder relative">
                                Salutation
                              </th>
                              <th className="py-2 px-5 font-medium border-b border-tableBorder relative">
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
                          <tbody className="text-dropdownText text-center text-[13px]">
                            {rows.map((row, index) => (
                              <tr className="relative text-center" key={index}>
                                <td className="py-2.5 px- border-y border-tableBorder justify-center mt-4 gap-2 items-center flex-1">
                                  <div className="relative w-full">
                                    <select
                                      className="block relative appearance-none w-full h-9 focus:border-none text-zinc-400 bg-white text-sm text-center border-none rounded-md leading-tight"
                                      value={row.salutation}
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "salutation",
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="" className="text-gray">
                                        Select
                                      </option>
                                      <option value="Mr" className="text-gray">
                                        Mr
                                      </option>
                                      <option value="Mrs" className="text-gray">
                                        Mrs
                                      </option>
                                      <option
                                        value="Miss"
                                        className="text-gray"
                                      >
                                        Miss
                                      </option>
                                      <option value="Dr" className="text-gray">
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
                                    value={row.firstName}
                                    className="text-sm w-[100%] text-center rounded-md bg-white h-9 p-2"
                                    placeholder="Value"
                                    onChange={(e) =>
                                      handleRowChange(
                                        index,
                                        "firstName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="py-2.5 px-4 border-y border-tableBorder flex-1">
                                  <input
                                    type="text"
                                    value={row.lastName}
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                    placeholder="Value"
                                    onChange={(e) =>
                                      handleRowChange(
                                        index,
                                        "lastName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="py-2.5 px-4 border-y border-tableBorder relative">
                                  <input
                                    type="text"
                                    value={row.email}
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                    placeholder="Value"
                                    onChange={(e) =>
                                      handleRowChange(
                                        index,
                                        "email",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="py-2.5 px-4 border-y border-tableBorder relative">
                                  <input
                                    type="text"
                                    value={row.mobile}
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                    placeholder="Value"
                                    onChange={(e) =>
                                      handleRowChange(
                                        index,
                                        "mobile",
                                        e.target.value
                                      )
                                    }
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
                          name="remark"
                          value={customerdata.remark}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-end gap-2 mb-3 m-5">
            <Button onClick={handleSubmit} variant="primary" size="sm">
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
