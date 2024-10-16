import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../Components/Button";
import SearchBar from "../../../Components/SearchBar";
import CehvronDown from "../../../assets/icons/CehvronDown";
import CheveronLeftIcon from "../../../assets/icons/CheveronLeftIcon";
import PrinterIcon from "../../../assets/icons/PrinterIcon";
import NewCustomerModal from "../../Customer/CustomerHome/NewCustomerModal";
import ManageSalesPerson from "../SalesPerson/ManageSalesPerson";
import NewInvoiceTable from "./NewSalesQuoteTable";
import SettingsIcons from "../../../assets/icons/SettingsIcon";
import { endponits } from "../../../Services/apiEndpoints";
import useApi from "../../../Hooks/useApi";
import { SalesQuote } from "../../../Types/SalesQuote";
import toast from "react-hot-toast";

type Props = {};

const NewSalesQuote = ({ }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [oneOrganization, setOneOrganization] = useState<any | []>([]);
  const [placeOfSupplyList, setPlaceOfSupplyList] = useState<any | []>([]);
  const [countryData, setcountryData] = useState<any | any>([]);
  const [customerData, setCustomerData] = useState<[]>([]);
  const [selectedCustomer, setSelecetdCustomer] = useState<string>("");
  const [prefix, setPrifix] = useState("")
  const [discountType, setDiscoutType] = useState<string>("");


  const { request: getOneOrganization } = useApi("get", 5004);
  const { request: getCountries } = useApi("get", 5004);
  const { request: AllCustomer } = useApi("get", 5002);
  const { request: getPrfix } = useApi("get", 5007);

  const [salesQuoteState, setSalesQuoteState] = useState<SalesQuote>({
    customerId: "",
    customerName: "",
    placeOfSupply: "",
    reference: "",
    salesOrderDate: "",
    expiryDate: "",
    subject: "",
    items: [
      {
        itemId: "",
        itemName: "",
        quantity: "",
        sellingPrice: "",
        taxGroup: "",
        cgst: "",
        sgst: "",
        igst: "",
        vat: "",
        itemTotaltax: "",
        discountType: "",
        discountAmount: "",
        amount: "",
      },
    ],
    note: "",
    tc: "",
    discountType: "",
    discountTransactionType: "",
    discountTransactionAmount: "",
    discountTax: "",
    subTotal: "",
    totalItem: "",
    cgst: "",
    sgst: "",
    igst: "",
    vat: "",
    totalTax: "",
    totalAmount: "",
  });

  const fetchData = async (
    url: string,
    setData: React.Dispatch<React.SetStateAction<any>>,
    fetchFunction: (url: string) => Promise<any>
  ) => {
    try {
      const { response, error } = await fetchFunction(url);
      if (!error && response) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleDropdown = (key: string | null) => {
    setOpenDropdownIndex(key === openDropdownIndex ? null : key);
    const customerUrl = `${endponits.GET_ALL_CUSTOMER}`;

    fetchData(customerUrl, setCustomerData, AllCustomer);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdownIndex(null);
    }
  };

  const fetchCountries = async () => {
    try {
      const url = `${endponits.GET_COUNTRY_DATA}`;
      const { response, error } = await getCountries(url);
      if (!error && response) {
        setcountryData(response.data[0].countries);
      }
    } catch (error) {
      console.log("Error in fetching Country", error);
    }
  };


  const getSalesQuotePrefix = async () => {
    try {
      const prefixUrl = `${endponits.GET_LAST_SALES_QUOTE_PREFIX}`;
      const { response, error } = await getPrfix(prefixUrl);

      if (!error && response) {
        setPrifix(response.data)
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log("Error in fetching Purchase Order Prefix", error);
    }
  };


  const handleplaceofSupply = () => {
    if (oneOrganization.organizationCountry) {
      const country = countryData.find(
        (c: any) =>
          c.name.toLowerCase() ===
          oneOrganization.organizationCountry.toLowerCase()
      );
      if (oneOrganization) {
        setSalesQuoteState((preData) => ({
          ...preData,
          placeOfSupply: oneOrganization.state,
        }));
      }
      if (country) {
        const states = country.states;
        setPlaceOfSupplyList(states);
      } else {
        console.log("Country not found");
      }
    } else {
      console.log("No country selected");
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "transactionDiscount") {
      let discountValue = parseFloat(value) || 0;

      const totalAmount = parseFloat(salesQuoteState.subTotal) || 0;

      if (salesQuoteState.discountTransactionType === "percentage") {
        if (discountValue > 100) {
          discountValue = 100;
          toast.error("Discount cannot exceed 100%");
        }
      } else {
        if (discountValue > totalAmount) {
          discountValue = totalAmount;
          toast.error("Discount cannot exceed the subtotal amount");
        }
      }

      setSalesQuoteState((prevState: any) => ({
        ...prevState,
        [name]: discountValue.toString(),
      }));
    } else {
      setSalesQuoteState((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const filterByDisplayName = (
    data: any[],
    displayNameKey: string,
    searchValue: string
  ) => {
    return data.filter((item: any) =>
      item[displayNameKey]?.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const filteredCustomer = filterByDisplayName(
    customerData,
    "customerDisplayName",
    searchValue
  );

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
  useEffect(() => {
    handleplaceofSupply();
    fetchCountries();
    getSalesQuotePrefix()
  }, [oneOrganization]);

  useEffect(() => {
    const organizationUrl = `${endponits.GET_ONE_ORGANIZATION}`;

    fetchData(organizationUrl, setOneOrganization, getOneOrganization);
  }, []);

  return (
    <div className="px-8">
      <div className="flex gap-5">
        <Link to={"/sales/quote"}>
          <div className="flex justify-center items-center h-11 w-11 bg-[#FFFFFF] rounded-full">
            <CheveronLeftIcon />
          </div>
        </Link>
        <div className="flex justify-center items-center">
          <h4 className="font-bold text-xl text-textColor ">
            Create Sales Quote
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 py-5 rounded-lg">
        <div className="col-span-8">
          <div className="bg-[#FFFFFF] p-5 min-h-max rounded-xl relative ">
            <div className=" mt-5 space-y-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5  ">
                  <label className="text-sm mb-1 text-labelColor">
                    Customer Name
                  </label>
                  <div
                    className="relative w-full"
                    onClick={() => toggleDropdown("customer")}
                  >
                    <div className="items-center flex appearance-none w-full h-9 text-zinc-400 bg-white border
                         border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer">
                      <p>
                        {(
                          selectedCustomer as { customerDisplayName?: string }
                        )?.customerDisplayName ?? "Select Customer"}
                      </p>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                  {openDropdownIndex === "customer" && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 bg-white  shadow  rounded-md mt-1 p-2   space-y-1 max-w-72 overflow-y-auto  hide-scrollbar"
                      style={{ width: "80%" }}
                    >
                      <SearchBar
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        placeholder="Serach customer"
                      />
                      {filteredCustomer ? (
                        filteredCustomer.map((customer: any) => (
                          <div
                            className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointe 
                                border border-slate-400 rounded-lg bg-lightPink"
                            onClick={() => {
                              setSalesQuoteState((prevState) => ({
                                ...prevState,
                                customerId: customer._id,
                              }));
                              setOpenDropdownIndex(null);
                              setSelecetdCustomer(customer);
                            }}
                          >
                            <div className="col-span-2 flex items-center justify-center">
                              <img
                                src="https://i.postimg.cc/MHdYrGVP/Ellipse-43.png"
                                alt=""
                              />
                            </div>
                            <div className="col-span-10 flex">
                              <div>
                                <p className="font-bold text-sm">
                                  {customer.customerDisplayName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Phone: {customer.mobile}
                                </p>
                              </div>
                              <div className="ms-auto text-2xl cursor-pointer relative -mt-2 pe-2">
                                &times;
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                      <div className="hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg py-4">
                        <NewCustomerModal page="purchase" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-span-7">
                  <label className="block text-sm mb-1 text-labelColor">
                    Place Of Supply
                  </label>
                  <div className="relative w-full">
                    <select
                      name="placeOfSupply"
                      onChange={handleChange}
                      value={salesQuoteState.placeOfSupply}
                      className="block appearance-none w-full h-9  text-zinc-400 bg-white border
                         border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Select place Of Supply</option>
                      {placeOfSupplyList &&
                        placeOfSupplyList.map((item: any, index: number) => (
                          <option
                            key={index}
                            value={item}
                            className="text-gray"
                          >
                            {item}
                          </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                </div>

                <div className="col-span-5 ">
                  <label className="block text-sm mb-1 text-labelColor">
                    Quote#
                  </label>
                  <div className=" flex items-center border rounded-lg border-inputBorder">

                    <input
                      readOnly
                      value={prefix}
                      type="text"
                      className="w-full text-sm p-1.5 pl-2 h-9 border-none outline-none rounded-l-lg"
                    />
                    <div className="p-1.5">
                      <SettingsIcons color="#495160" />
                    </div>
                  </div>
                </div>

                <div className="col-span-7">
                  <label className="block text-sm mb-1 text-labelColor">
                    Reference#
                  </label>
                  <input
                    placeholder="reference"
                    type="text"
                    className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"
                  />
                </div>


                <div className="col-span-5">
                  <label className="block text-sm mb-1 text-labelColor">
                    Quote Date
                  </label>
                  <div className="relative w-full">
                    <input
                      type="date"
                      className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-2"
                    />
                  </div>
                </div>



                <div className="col-span-7 relative">
                  <label className="block text-sm mb-1 text-labelColor">
                    Expiry Date
                  </label>
                  <div className="relative w-full">
                    <input
                      type="date"
                      className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 px-2"
                    />
                  </div>
                </div>

                <div className="col-span-5">
                  <label className="block text-sm mb-1 text-labelColor">
                    Subject
                  </label>
                  <input
                    placeholder="subject"
                    type="text"
                    className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"
                  />
                </div>
                <div className="col-span-7 relative">
                  <label className="block text-sm mb-1 text-labelColor">
                    Sales Person
                  </label>
                  <div
                    className="relative w-full"
                    onClick={() => toggleDropdown("salesPerson")}
                  >
                    <div className="items-center flex appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <p>Select or Add Sales Person</p>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                  {openDropdownIndex === "salesPerson" && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 bg-white shadow rounded-md mt-1 p-2 w-full space-y-1"
                    >
                      <SearchBar
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        placeholder="Select sales person"
                      />
                      <div className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointer border border-slate-400 rounded-lg bg-lightPink items-center">
                        <div className="col-span-11 flex">
                          <div>
                            <p className="font-bold text-sm">
                              Joey Tribiriyani
                            </p>
                            <p className="text-xs text-gray-500">
                              joey@gmail.com
                            </p>
                          </div>
                        </div>
                        <div className="ms-auto text-2xl cursor-pointer relative -mt-2 pe-2">
                          &times;
                        </div>
                      </div>
                      <ManageSalesPerson />
                    </div>
                  )}
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
                    className=" absolute z-10 bg-white  shadow  rounded-md  p-2 mt-48 w-[24%] space-y-1 ms-10 "
                  >
                    <div
                      className=" p-2 hover:bg-red-50 cursor-pointe  rounded-lg py-3"
                      onClick={() => {
                        setDiscoutType("Item Line");
                        setOpenDropdownIndex(null);
                      }}
                    >
                      Item Line
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
                    <div
                      className=" p-2 hover:bg-red-50 cursor-pointe  rounded-lg py-3"
                      onClick={() => {
                        setDiscoutType("Both");
                        setOpenDropdownIndex(null);
                      }}
                    >
                      Both
                    </div>
                  </div>
                )}
              </div>



              <p className="font-bold">Add Item</p>
              <NewInvoiceTable 
              />

              <br />

            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="bg-[#FFFFFF] p-5 text-sm rounded-xl space-y-4 text-textColor">
            <div className="grid grid-cols-12 pb-4  text-dropdownText border-b-2 border-slate-200">
              <div className="col-span-10 mt-5">
                <p>Untaxed Amount</p>
              </div>
              <div className="col-span-2 mt-5">
                <p className="text-base  font-bold">RS 0.00</p>
              </div>

              <div className="col-span-10 mt-1">
                <p>SGST</p>
              </div>
              <div className="col-span-2 mt-1">
                <p className="text-base">RS 0.00</p>
              </div>

              <div className="col-span-10">
                <p> CGST</p>
              </div>
              <div className="col-span-2">
                <p className="text-base">RS 0.00</p>
              </div>

              <div className="col-span-10 mt-1">
                <p className="font-bold text-base text-black">Total</p>
              </div>
              <div className="col-span-2 mt-1">
                <p className="text-base font-bold">RS 0.00</p>
              </div>
            </div>

            <div className="flex gap-4 pt-3 justify-end">
              {" "}
              <Button size="sm" variant="secondary">
                <p>Cancel</p>
              </Button>
              <Button size="sm" variant="secondary">
                <PrinterIcon height={18} width={18} color="currentColor" />
                <p>Print</p>
              </Button>
              <Button size="sm" variant="primary">
                <p>Save & Send</p>
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSalesQuote;
