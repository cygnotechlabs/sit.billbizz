import { ChangeEvent, useContext, useEffect, useState } from "react";
import Button from "../../../Components/Button";
import Upload from "../../../assets/icons/Upload";
import Modal from "../../../Components/model/Modal";
import PlusCircle from "../../../assets/icons/PlusCircle";
import CirclePlus from "../../../assets/icons/circleplus";
import CehvronDown from "../../../assets/icons/CehvronDown";
import { endponits } from "../../../Services/apiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import useApi from "../../../Hooks/useApi";
import { SupplierResponseContext } from "../../../context/ContextShare";
import PhoneInput from "react-phone-input-2";

type Props = { page?: string };
type SupplierData = {
  organizationId: string;
  salutation: string;
  firstName: string;
  lastName: string;
  companyName: string;
  supplierDisplayName: string;
  supplierEmail: string;
  workPhone: string;
  mobile: string;
  createdDate: string;
  lastModifiedDate: string;
  creditDays: string;
  creditLimit: string;
  interestPercentage: string;
  pan: string;
  currency: string;
  openingBalance: string;
  paymentTerms: string;
  tds: string;
  documents: string;
  websiteURL: string;
  department: string;
  designation: string;
  // taxType:""
  gstTreatment: string;
  gstinUin: string;
  sourceOfSupply: string;
  msmeType: string;
  msmeNumber: string;
  msmeRegistered: boolean;
  billingAttention: string;
  billingCountry: string;
  billingAddressStreet1: string;
  billingAddressStreet2: string;
  billingCity: string;
  billingState: string;
  billingPinCode: string;
  billingPhone: string;
  billingFaxNum: string;
  shippingAttention: string;
  shippingCountry: string;
  shippingAddressStreet1: string;
  shippingAddressStreet2: string;
  shippingCity: string;
  shippingState: string;
  shippingPinCode: string;
  shippingPhone: string;
  shippingFaxNum: string;

  contactPerson: {
    salutation: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    workPhone: string;
    mobile: string;
  }[];

  bankDetails: {
    accountHolderName: string;
    bankName: string;
    accountNum: string;
    ifscCode: string;
  }[];
  remarks: string;
  status: string;
};

const AddSupplierModal = ({ page }: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [countryData, setcountryData] = useState<any | []>([]);
  const [stateList, setStateList] = useState<any | []>([]);
  const [currencyData, setcurrencyData] = useState<any | []>([]);
  const [gstOrVat, setgstOrVat] = useState<any | []>([]);

  const [shippingstateList, setshippingStateList] = useState<any | []>([]);
  const [paymentTerms, setPaymentTerms] = useState<any | []>([]);
  const [activeTab, setActiveTab] = useState<string>("otherDetails");
  const { request: getCountryData } = useApi("get", 5004);
  const { request: getCurrencyData } = useApi("put", 5004);
  const { request: CreateSupplier } = useApi("post", 5009);
  const { request: getPaymentTerms } = useApi("get", 5004);
  const { request: getTax } = useApi("put", 5002);
  const { setsupplierResponse } = useContext(SupplierResponseContext)!;
  const [rows, setRows] = useState([
    { salutation: "", firstName: "", lastName: "", email: "", mobile: "" },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { salutation: "", firstName: "", lastName: "", email: "", mobile: "" },
    ]);
  };

  const [supplierdata, setSupplierData] = useState<SupplierData>({
    organizationId: "INDORG0001",
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    supplierDisplayName: "",
    supplierEmail: "",
    workPhone: "",
    mobile: "",
    createdDate: "",
    lastModifiedDate: "",
    creditDays: "",
    creditLimit: "",
    interestPercentage: "",
    pan: "",
    currency: "",
    openingBalance: "",
    paymentTerms: "",
    tds: "",
    documents: "",
    websiteURL: "",
    department: "",
    designation: "",
    gstTreatment: "",
    gstinUin: "",
    sourceOfSupply: "",
    msmeType: "",
    msmeNumber: "",
    msmeRegistered: false, // boolean type
    billingAttention: "",
    billingCountry: "",
    billingAddressStreet1: "",
    billingAddressStreet2: "",
    billingCity: "",
    billingState: "",
    billingPinCode: "",
    billingPhone: "",
    billingFaxNum: "",
    shippingAttention: "",
    shippingCountry: "",
    shippingAddressStreet1: "",
    shippingAddressStreet2: "",
    shippingCity: "",
    shippingState: "",
    shippingPinCode: "",
    shippingPhone: "",
    shippingFaxNum: "",
    contactPerson: [
      {
        salutation: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        workPhone: "",
        mobile: "",
      },
    ],
    bankDetails: [
      {
        accountHolderName: "",
        bankName: "",
        accountNum: "",
        ifscCode: "",
      },
    ],
    remarks: "",
    status: "",
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
      emailAddress: row.email,
      workPhone: "",
      mobile: row.mobile,
    }));

    setSupplierData((prevFormData) => ({
      ...prevFormData,
      contactPerson: updatedContactPerson,
    }));
  };

  const getTabClassName = (tabName: string) => {
    return activeTab === tabName
      ? " cursor-pointer font-bold text-darkRed"
      : " cursor-pointer font-bold";
  };

  const getBorderClassName = (tabName: string) => {
    return activeTab === tabName ? "border-darkRed" : "border-neutral-300";
  };
  console.log(supplierdata);

  const handleBillingPhoneChange = (value: string) => {
    setSupplierData((prevData) => ({
      ...prevData,
      billingPhone: value,
    }));
  };

  const handleShippingPhoneChange = (value: string) => {
    setSupplierData((prevData) => ({
      ...prevData,
      shippingPhone: value,
    }));
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setSupplierData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setSupplierData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const getAdditionalData = async () => {
    try {
      // Fetching currency data
      const Currencyurl = `${endponits.GET_CURRENCY_LIST}`;
      const { response, error } = await getCurrencyData(Currencyurl, {
        organizationId: "INDORG0001",
      });

      if (!error && response) {
        setcurrencyData(response?.data);
        // console.log(response.data, "currencyData");
      }

      const paymentTermsUrl = `${endponits.GET_PAYMENT_TERMS}`;
      const { response: paymentTermResponse, error: paymentTermError } =
        await getPaymentTerms(paymentTermsUrl);

      if (!paymentTermError && paymentTermResponse) {
        setPaymentTerms(paymentTermResponse.data);
        // console.log(paymentTermResponse.data);
      }

      const taxUrl = `${endponits.GET_TAX_SUPPLIER}`;
      const { response: taxResponse, error: taxError } = await getTax(taxUrl, {
        organizationId: "INDORG0001",
      });

      if (!taxError && taxResponse) {
        if (taxResponse) {
          // console.log(taxResponse.data.taxType,"tax");

          setgstOrVat(taxResponse.data);
        }
      } else {
        console.log(taxError.response.data, "tax");
      }

      const CountryUrl = `${endponits.GET_COUNTRY_DATA}`;
      const { response: countryResponse, error: countryError } =
        await getCountryData(CountryUrl, { organizationId: "INDORG0001" });
      if (!countryError && countryResponse) {
        // console.log(countryResponse.data[0].countries, "country");
        setcountryData(countryResponse?.data[0].countries);
      } else {
        console.log(countryError, "country");
      }
    } catch (error) {
      console.log("Error in fetching currency data or payment terms", error);
    }
  };

  //api call
  const handleSubmit = async () => {
    try {
      const url = `${endponits.ADD_SUPPLIER}`;
      const { response, error } = await CreateSupplier(url, supplierdata);
      if (response && !error) {
        toast.success(response.data.message);
        console.log(response);
        setModalOpen(false);
        setsupplierResponse((prevSupplierResponse: any) => ({
          ...prevSupplierResponse,
          supplierdata,
        }));
        setSupplierData({
          organizationId: "INDORG0001",
          salutation: "",
          firstName: "",
          lastName: "",
          companyName: "",
          supplierDisplayName: "",
          supplierEmail: "",
          workPhone: "",
          mobile: "",
          createdDate: "",
          lastModifiedDate: "",
          creditDays: "",
          creditLimit: "",
          interestPercentage: "",
          pan: "",
          currency: "",
          openingBalance: "",
          paymentTerms: "",
          tds: "",
          documents: "",
          websiteURL: "",
          department: "",
          designation: "",
          gstTreatment: "",
          gstinUin: "",
          sourceOfSupply: "",
          msmeType: "",
          msmeNumber: "",
          msmeRegistered: false, // boolean type
          billingAttention: "",
          billingCountry: "",
          billingAddressStreet1: "",
          billingAddressStreet2: "",
          billingCity: "",
          billingState: "",
          billingPinCode: "",
          billingPhone: "",
          billingFaxNum: "",
          shippingAttention: "",
          shippingCountry: "",
          shippingAddressStreet1: "",
          shippingAddressStreet2: "",
          shippingCity: "",
          shippingState: "",
          shippingPinCode: "",
          shippingPhone: "",
          shippingFaxNum: "",
          contactPerson: [
            {
              salutation: "",
              firstName: "",
              lastName: "",
              emailAddress: "",
              workPhone: "",
              mobile: "",
            },
          ],
          bankDetails: [
            {
              accountHolderName: "",
              bankName: "",
              accountNum: "",
              ifscCode: "",
            },
          ],
          remarks: "",
          status: "",
        });
      } else {
        toast.error(error.response?.data?.message);
        console.error(
          "Error creating supplier:",
          error.response?.data?.message || error.message
        );
      }
    } catch (error) {
      console.error("Unexpected error:");
    }
  };

  const handleCopyAddress = (e: any) => {
    e.preventDefault();
    setSupplierData((prevData) => ({
      ...prevData,
      shippingAttention: supplierdata.billingAttention,
      shippingCountry: supplierdata.billingCountry,
      shippingAddressStreet1: supplierdata.billingAddressStreet1,
      shippingAddressStreet2: supplierdata.billingAddressStreet2,
      shippingCity: supplierdata.billingCity,
      shippingState: supplierdata.billingState,
      shippingPinCode: supplierdata.billingPinCode,
      shippingPhone: supplierdata.billingPhone,
      shippingFaxNumber: supplierdata.billingFaxNum,
    }));
  };

  useEffect(() => {
    if (supplierdata.billingCountry) {
      const country = countryData.find(
        (c: any) => c.name === supplierdata.billingCountry
      );
      if (country) {
        setStateList(country.states || []);
      }
    }

    if (supplierdata.shippingCountry) {
      const country = countryData.find(
        (c: any) => c.name === supplierdata.shippingCountry
      );
      if (country) {
        setshippingStateList(country.states || []);
      }
    }
  }, [supplierdata.shippingCountry, countryData]);

  useEffect(() => {
    getAdditionalData();
  }, []);

  return (
    <div>
      {page && page == "purchase" ? (
        <div
          className="w-[100%] flex col-span-10  px-4  justify-between"
          onClick={openModal}
        >
          <div className="flex items-center  space-x-1">
            <CirclePlus color="darkRed" size="18" />

            <p className="text-[#820000] text-sm">
              <b>Add new Supplier</b>
            </p>
          </div>
          <div className=" col-span-2 text-end text-2xl cursor-pointer relative ">
            &times;
          </div>
        </div>
      ) : (
        <Button
          onClick={openModal}
          variant="primary"
          className="flex items-center"
          size="xl"
        >
          <PlusCircle color="white" />{" "}
          <p className="text-sm font-medium">Add Supplier</p>
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
                  Add Supplier
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
              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-2">
                  <label htmlFor="salutation">Salutation</label>
                  <div className="relative w-full">
                    <select
                      name="salutation"
                      value={supplierdata.salutation} // Moved to the correct position
                      onChange={handleChange} // Moved to the correct position
                      className="block appearance-none w-full h-9 mt-1 text-zinc-400 bg-white border border-inputBorder text-sm pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="Mr" className="text-gray">
                        Mr
                      </option>
                      <option value="Mrs" className="text-gray">
                        Mrs
                      </option>
                      <option value="Ms" className="text-gray">
                        Ms
                      </option>
                      <option value="Dr" className="text-gray">
                        Dr
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />{" "}
                      {/* Assuming ChevronDown is a valid component */}
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
                      name="firstName"
                      className="pl-9 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                      placeholder="Name"
                      value={supplierdata.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="" className="text-slate-600">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="pl-9 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                      placeholder="Value"
                      value={supplierdata.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="">Company Name </label>
                    <input
                      type="text"
                      name="companyName"
                      className="pl-9 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                      placeholder="Value"
                      value={supplierdata.companyName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="companyName">Supplier Display Name </label>
                    <input
                      required
                      type="text"
                      name="supplierDisplayName"
                      className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                      placeholder="Enter Display Name"
                      value={supplierdata.supplierDisplayName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="">Supplier Email</label>
                  <input
                    type="text"
                    name="supplierEmail"
                    className="pl-9 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Enter Email"
                    value={supplierdata.supplierEmail}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="">Work Phone</label>
                  <input
                    type="text"
                    name="workPhone"
                    className="pl-9 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Value"
                    value={supplierdata.workPhone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    className="pl-9 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Value"
                    value={supplierdata.mobile}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="">Phone Number</label>
                  <input
                    type="text"
                    name="workPhone"
                    className="pl-9 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Value"
                    value={supplierdata.workPhone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="">Card Number</label>
                  <input
                    type="text"
                    className="pl-9 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Value"
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
                      )} border-r-4 ${getBorderClassName("taxes")} p-2 `}
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
                      onClick={() => setActiveTab("contactPerson")}
                    >
                      Contact Persons
                    </li>
                    <li
                      className={`${getTabClassName(
                        "customFields1"
                      )} border-r-4 ${getBorderClassName("customFields")} p-2`}
                      onClick={() => setActiveTab("customFields")}
                    >
                      Custom fields
                    </li>
                    <li
                      className={`${getTabClassName(
                        "customFields2"
                      )} border-r-4 ${getBorderClassName("remarks")} p-2`}
                      onClick={() => setActiveTab("remarks")}
                    >
                      Remarks
                    </li>
                  </ul>
                </div>
                <div className="w-3/4 px-20 p-2">
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
                            value={supplierdata.pan}
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
                                className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="currency"
                                value={supplierdata.currency}
                                onChange={handleChange}
                              >
                                <option value="">Select Currency"</option>
                                {currencyData.map(
                                  (item: any, index: number) => (
                                    <option
                                      key={index}
                                      value={item.currencyCode}
                                    >
                                      {item.currencyName} ({item.currencySymbol}
                                      )
                                    </option>
                                  )
                                )}
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
                            placeholder="Enter Opening Balance"
                            name="openingBalance"
                            value={supplierdata.openingBalance}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Payment Terms</label>
                          <select
                            className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder 
                                 text-sm pl-2 pr-8 rounded-md leading-tight 
                                 focus:outline-none focus:bg-white focus:border-gray-500"
                            name="paymentTerms"
                            value={supplierdata.paymentTerms}
                            onChange={handleChange}
                          >
                            <option value="" className="text-gray">
                              Select Payment Terms
                            </option>
                            {paymentTerms &&
                              paymentTerms.map((item: any) => (
                                <option
                                  key={item._id}
                                  value={item.name}
                                  className="text-gray"
                                >
                                  {item.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="">
                          <label htmlFor="" className="block mb-1">
                            TDS
                          </label>
                          <div className="relative w-full">
                            <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option value="" className="text-gray">
                                {" "}
                                Select a Tax
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
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
                        <input
                          type="file"
                          className="hidden"
                          value={supplierdata.documents}
                          name="documents"
                          // onChange={(e)=>handleFileChange(e)}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Website URL</label>
                        <input
                          type="text"
                    
                          className=" text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-p p-2"
                          placeholder="Value"
                          name="websiteURL"
                          value={supplierdata.websiteURL}
                          onChange={handleChange}
                        

                        />
                      </div>
                      <div>
                        <label className="block mb-1">Department</label>
                        <input
                          type="text"
                          className=" text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-p p-2"
                          placeholder="Value"
                          name="department"
                          value={supplierdata.department}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Designation</label>
                        <input
                          type="text"
                          name="designation"
                          className=" text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-p p-2"
                          placeholder="Value"
                          value={supplierdata.designation}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                  {activeTab === "taxes" && (
                    <>
                      <div className="space-y-3 p-5  text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="">
                            <label htmlFor="" className="block mb-1">
                              GST Treatment
                            </label>

                            <div className="relative w-full">
                              <select
                                className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="gstTreatment"
                                value={supplierdata.gstTreatment}
                                onChange={handleChange}
                              >
                                <option value="" className="text-gray">
                                  {" "}
                                  Select a GST treatment
                                </option>
                                {gstOrVat?.gstTreatment?.map(
                                  (item: any, index: number) => (
                                    <option value={item} key={index}>
                                      {item}
                                    </option>
                                  )
                                )}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <CehvronDown color="gray" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label htmlFor="gstin uin" className="block mb-1">
                              Source of Supply
                            </label>

                            <div className="relative w-full">
                              <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value="" className="text-gray">
                                  {" "}
                                  Value
                                </option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <CehvronDown color="gray" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1">GSTIN/UIN</label>
                            <input
                              type="text"
                              name="gstinUin"
                              className=" text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="gstinUin"
                              value={supplierdata.gstTreatment}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              MSME/Udyam Registration Type
                            </label>
                            <select className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option value="" className="text-gray">
                                {" "}
                                Select the Registration Type
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              MSME/Udyam Registration Number
                            </label>
                            <select className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option value="" className="text-gray">
                                {" "}
                                Enter the Registration Number
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
                              name="billingAttention"
                              className="pl-9 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                              value={supplierdata.billingAttention}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="relative w-full">
                            <label
                              htmlFor="billingCountry"
                              className="mb-1 block"
                            >
                              Country/Region
                            </label>
                            <select
                              name="billingCountry"
                              id="billingCountry" // Added id to match the label's htmlFor
                              value={supplierdata.billingCountry} // Correctly placed the value attribute
                              onChange={handleChange} // Correctly placed the onChange attribute
                              className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                              <option value="" className="text-gray">
                                Select
                              </option>
                              {/* Add more options here as needed */}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />{" "}
                              {/* Corrected the spelling of ChevronDown */}
                            </div>
                          </div>

                          {/* Address  */}
                          <div className="">
                            <label
                              className="text-slate-600"
                              htmlFor="organizationAddress"
                            >
                              Address
                            </label>
                          </div>
                          <input
                            className="pl-3 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-inputBorder h-[39px] leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                            placeholder="Street 1"
                            name="billingAddressStreet1"
                            value={supplierdata.billingAddressStreet1}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <input
                            className="pl-3 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-inputBorder h-[39px] p-2 leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                            placeholder="Street 2"
                            name="billingAddressStreet2"
                            value={supplierdata.billingAddressStreet2}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-1">City</label>
                            <input
                              type="text"
                              className="pl-9 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                              name="billingCity"
                              value={supplierdata.billingCity}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="relative ">
                            <label
                              className="text-slate-600 "
                              htmlFor="organizationAddress"
                            >
                              State / Region / County
                            </label>
                            <div className="relative w-full mt-2">
                              <select
                                value={supplierdata.billingState}
                                onChange={handleChange}
                                name="billingState"
                                id="billingState"
                                className="block appearance-none w-full text-[#818894] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                                disabled={!supplierdata.billingCountry}
                              >
                                <option value="">
                                  State / Region / County
                                </option>
                                {stateList.length > 0 ? (
                                  stateList.map((item: any, index: number) => (
                                    <option key={index} value={item}>
                                      {item}
                                    </option>
                                  ))
                                ) : (
                                  <></>
                                )}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <CehvronDown color="gray" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block mb-1">
                              Pin /Zip /Postal code
                            </label>
                            <input
                              type="text"
                              className="pl-9 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                              name="billingPinCode"
                              value={supplierdata.billingPinCode}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label className="block mb-1">Phone</label>
                            <div className="w-full border-0 mt-2">
                              <PhoneInput
                                inputClass="appearance-none text-[#818894] bg-white border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                                inputStyle={{ height: "38px", width: "100%" }}
                                containerStyle={{ width: "100%" }}
                                country={
                                  supplierdata.billingCountry
                                    ? supplierdata.billingCountry.toLowerCase()
                                    : "in"
                                }
                                value={supplierdata.billingPhone}
                                onChange={(value) =>
                                  handleBillingPhoneChange(value)
                                }
                              />
                            </div>
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              Fax Number
                            </label>
                            <select
                              className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="billingFaxNum"
                              value={supplierdata.billingFaxNum}
                              onChange={handleChange}
                            >
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
                        <div className="flex">
                          <p>
                            <b>Shipping Address</b>
                          </p>
                          <button
                            className="ml-auto text-gray"
                            onClick={handleCopyAddress}
                          >
                            <b>Copy Billing Address</b>
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-1">Attention</label>
                            <input
                              type="text"
                              className="pl-9 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-10 p-2"
                              placeholder="Value"
                              name="shippingAttention"
                              value={supplierdata.shippingAttention}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              Country/Region
                            </label>
                            <select
                              className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="shippingCountry"
                              value={supplierdata.shippingCountry}
                              onChange={handleChange}
                            >
                              <option value="">Select a country</option>
                              {countryData && countryData.length > 0 ? (
                                countryData.map((item: any, index: number) => (
                                  <option key={index} value={item.name}>
                                    {item.name}
                                  </option>
                                ))
                              ) : (
                                <option disabled></option>
                              )}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />{" "}
                              {/* Corrected the spelling of ChevronDown */}
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block mb-1">Address</label>
                          <input
                            type="text"
                            className="pl-9 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  p-2"
                            placeholder="Value"
                            name="shippingAddress"
                            value={supplierdata.shippingAddressStreet1}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-1">City</label>
                            <input
                              type="text"
                              className="pl-9 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                              name="shippingCity"
                              value={supplierdata.shippingCity}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              State/Region/County
                            </label>
                            <div className="relative w-full mt-2">
                              <select
                                value={supplierdata.billingState}
                                onChange={handleChange}
                                name="shippingState"
                                id="shippingState"
                                className="block appearance-none w-full text-[#818894] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                                disabled={!supplierdata.billingCountry}
                              >
                                <option value="">
                                  State / Region / County
                                </option>
                                {shippingstateList.length > 0 ? (
                                  shippingstateList.map(
                                    (item: any, index: number) => (
                                      <option key={index} value={item}>
                                        {item}
                                      </option>
                                    )
                                  )
                                ) : (
                                  <></>
                                )}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <CehvronDown color="gray" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label
                              className="text-slate-600 "
                              htmlFor="organizationAddress"
                            >
                              Pin / Zip / Post code
                            </label>
                            <input
                              type="text"
                              className="pl-9 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                              placeholder="Value"
                              name="shippingPinCode"
                              value={supplierdata.shippingPinCode}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label className="block mb-1">Phone</label>
                            <PhoneInput
                              inputClass="appearance-none text-[#818894] bg-white border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              inputStyle={{ height: "38px", width: "100%" }}
                              containerStyle={{ width: "100%" }}
                              country={
                                supplierdata.shippingCountry
                                  ? supplierdata.shippingCountry.toLowerCase()
                                  : "in"
                              }
                              value={supplierdata.shippingPhone}
                              onChange={handleShippingPhoneChange}
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
                          name="remarks"
                          value={supplierdata.remarks}
                          onChange={(e: any) => handleChange(e)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-end gap-2 mb-3 m-5">
            <Button onClick={closeModal} variant="secondary" size="lg">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="primary" size="lg">
              Save
            </Button>
          </div>
        </>
      </Modal>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default AddSupplierModal;
