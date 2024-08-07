import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../Components/Button";
import useApi from "../../Hooks/useApi";
import { endponits } from "../../Services/apiEndpoints";
import { toast, Toaster } from "react-hot-toast";
import CehvronDown from "../../assets/icons/CehvronDown";
import Plus from "../../assets/icons/Plus";
import bgImage from "../../assets/Images/Group 37 (1).png";

interface InputData {
  organizationId: string;
  organizationLogo: string;
  organizationName: string;
  organizationCountry: string;
  organizationIndustry: string;
  addline1: string;
  addline2: string;
  city: string;
  pincode: string;
  state: string;
  organizationPhNum: string;
  website: string;
  baseCurrency: string;
  fiscalYear: string;
  reportBasis: string;
  timeZone: string;
  dateFormat: string;
  dateSplit: string;
}

const CreateOrganizationForm = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [additionalData, setAdditionalData] = useState<any | null>([]);
  const [oneOrganization, setOneOrganization] = useState<any | []>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const { request: getAdditionalData } = useApi("get", 5004);
  const { request: createOrganization } = useApi("post", 5004);
  const { request: getOneOrganization } = useApi("put", 5004);
  const [inputData, setInputData] = useState<InputData>({
    organizationId: "",
    organizationLogo: "", //image field
    organizationName: "",
    organizationCountry: "",
    organizationIndustry: "",
    addline1: "",
    addline2: "",
    city: "",
    pincode: "",
    state: "",
    organizationPhNum: "",
    website: "",
    baseCurrency: "",
    fiscalYear: "",
    reportBasis: "",
    timeZone: "",
    dateFormat: "",
    dateSplit: "",
  });

  console.log(inputData);

  const getDropdownList = async () => {
    try {
      const url = `${endponits.GET_ADDITIONAL_DATA}`;
      const { response, error } = await getAdditionalData(url);
      if (!error && response) {
        setAdditionalData(response.data[0]);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOrganization = async () => {
    try {
      const url = `${endponits.GET_ONE_ORGANIZATION}`;
      const { response, error } = await getOneOrganization(url, {
        organizationId: "INDORG0001",
      });
  
      if (!error && response?.data) {
        setOneOrganization(response.data);
        setInputData((prevData) => ({
          ...prevData,
          organizationId: response.data.organizationId,
          organizationName: response.data.organizationName,
        }));
      }
    } catch (error) {
      console.error("Error fetching organization:", error);
    }
  };

  useEffect(() => {
    getDropdownList();
    getOrganization();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: "organizationLogo"
  ) => {
    console.log("enter into function");

    const file = e.target.files?.[0];
    if (file) {
      if (key === "organizationLogo") setLogo(file);

      setInputData((prevDetails: any) => ({
        ...prevDetails,
        [key]: URL.createObjectURL(file),
      }));
    }
  };

  const handleCreateOrganization = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const url = `${endponits.CREATE_ORGANIZATION}`;
      const apiResponse = await createOrganization(url, inputData);
      console.log(apiResponse, "api response");

      const { response, error } = apiResponse;
      if (!error && response) {
        toast.success(response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      console.log(error, "try");
    }
  };



  return (
    <div
      className=" px-3 pt-3 overflow-y-scroll hide-scrollbar "
      style={{ height: "92vh" }}
    >
      <div className="bg-[#F7E7CE] rounded-md  flex  h-[148px] ">
        <div className="ms-2 p-2   text-center mt-3   items-center flex">
          <div>
            <p className="bg-gray text-sm w-fit  text-yellow-50 rounded-md p-2">
              Organization
            </p>

            <div className="flex mt-1">
              <p className="mt-1 text-[#303F58]">
                <b>
                  {oneOrganization.organizationName || "Organization Profile"}
                </b>
              </p>{" "}
              {
                <div className="ms-3 bg-white rounded-md p-1 text-textColor">
                  ID:{oneOrganization.organizationId || 852749}
                </div>
              }
            </div>
          </div>
        </div>

        <div className="flex ml-auto w-fit">
          <img src={bgImage} className="bottom-0 top-8 mt-auto" alt="" />
        </div>
      </div>

      {/* FORM */}
      <form className="text-slate-800 text-sm">
        <label>
          <div className="h-56 p-3 border-dashed border-neutral-400  rounded-md mt-5 border bg-white text-textColor w-[403px]">
            <div className="bg-lightPink flex h-28 justify-center items-center rounded-md">
              {logo ? (
                <img src={URL.createObjectURL(logo)} alt="" className="h-24" />
              ) : (
                <>
                  <div className="justify-center flex items-center bg-darkRed text-white  p-1 rounded-full">
                    <Plus color="white" classname="h-3 w-3" />
                  </div>
                  <p className="text-sm ms-2">
                    {" "}
                    Upload Your Organizational Logo
                  </p>
                </>
              )}
            </div>
            <div className="text-center">
              <p className="mt-3 text-base">
                <b>Organization Logo</b>
              </p>
              <p className="text-xs mt-1">
                Preferred Image Dimensions: 240&times;240&times; pixels @ 72 DPI{" "}
                <br />
                Maximum File size 1MB
              </p>
            </div>
          </div>
          <input
            accept="image/*"
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e, "organizationLogo")}
          />
        </label>
        <p className="mt-4 text-textColor">
          <b>Organizational Details</b>
        </p>

        <div className="bg-white border-slate-200  border-2 rounded-md mt-4 p-5">
          <div className="grid grid-cols-2 gap-4 ">
            <div className="relative ">
              <label htmlFor="location" className="text-slate-600">
                Oganization Location
              </label>
              <div className="relative w-full mt-3">
                <select
                  value={inputData.organizationCountry}
                  onChange={handleInputChange}
                  name="organizationCountry"
                  id="Location"
                  className="block appearance-none w-full   text-zinc-400 bg-white border border-slate-200 text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Select a country</option>
                  <option value="india">India</option>
                  <option value="argentina">Argentina</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>

            <div className="relative ">
              <label htmlFor="organizationIndustry" className="text-slate-600">
                Industry
              </label>
              <div className="relative w-full mt-3">
                <select
                  onChange={handleInputChange}
                  name="organizationIndustry"
                  id="organizationIndustry"
                  className="block appearance-none w-full text-zinc-400 bg-white border border-slate-200 text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Select Industry</option>

                  {additionalData.industry &&
                  additionalData.industry.length > 0 ? (
                    additionalData.industry.map((item: any, index: any) => (
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
          <div className="pt-3">
            <label className="text-slate-600 " htmlFor="organizationAddress">
              Organization Address
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 -mt-2 space-y-4 ">
            <div>
              <input
                className="pl-3 text-sm w-[100%] mt-4 rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
                placeholder="Street 1"
                name="addline1"
                value={inputData.addline1}
                onChange={handleInputChange}
              />{" "}
            </div>

            <div>
              <input
                className="pl-3 text-sm w-[100%] rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
                placeholder="Street 1"
                name="addline2"
                value={inputData.addline2}
                onChange={handleInputChange}
              />{" "}
            </div>
            <div>
              <input
                className="pl-3 text-sm w-[100%] rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
                placeholder="City"
                value={inputData.city}
                name="city"
                onChange={handleInputChange}
              />{" "}
            </div>

            <div>
              <input
                className="pl-3 text-sm w-[100%] rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
                placeholder="Pincode"
                type="text"
                value={inputData.pincode}
                name="pincode"
                onChange={handleInputChange}
              />{" "}
            </div>
            <div className="relative ">
              <div className="relative w-full">
                <select
                  onChange={handleInputChange}
                  name="state"
                  id="state"
                  className="block appearance-none w-full text-zinc-400 bg-white border border-slate-200 text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Select a State</option>

                  <option value="kerala" className="text-slate-300">
                    Kerala
                  </option>
                  <option value="tamilNadu" className="text-slate-300">
                    TamilNadu
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>

            <div>
              <input
                className="pl-3 text-sm w-[100%] rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
                placeholder="Phone"
                type="tel"
                value={inputData.organizationPhNum}
                name="organizationPhNum"
                onChange={handleInputChange}
              />{" "}
            </div>
          </div>
        </div>

        <p className="mt-4">
          <b>Website Address</b>
        </p>
        <div className="bg-white border-slate-200  border-2 rounded-md  mt-4 p-5">
          <label htmlFor="websit" className="text-slate-600">
            Website URL
          </label>
          <input
            type="text"
            placeholder="Value"
            className="pl-3 text-sm w-[100%] mt-3 rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
            value={inputData.website}
            name="website"
            onChange={handleInputChange}
          />
        </div>
        <p className="mt-4">
          <b>Financial Settings</b>
        </p>
        <div className="bg-white  border-slate-200  border-2 rounded-md mt-4 p-5">
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="relative ">
              <label htmlFor="currency" className="text-slate-600">
                Base Currency
              </label>

              <div className="relative w-full mt-3">
                <select
                  onChange={handleInputChange}
                  name="baseCurrency"
                  id="currency"
                  className="block appearance-none w-full text-zinc-400 bg-white border border-slate-200 text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Select Currency</option>

                  <option value="USD" className="text-slate-300 ">
                    USD
                  </option>
                  <option value="EUR" className="text-slate-300 ">
                    EUR
                  </option>
                  <option value="INR" className="text-slate-300 ">
                    INR
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="fiscalYear" className="text-slate-600">
                Financial Year
              </label>

              <div className="relative w-full mt-3">
                <select
                  onChange={handleInputChange}
                  name="fiscalYear"
                  id="fiscalYear"
                  className="block appearance-none w-full text-zinc-400 bg-white border border-slate-200 text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Select Financial Year</option>

                  {additionalData.financialYear &&
                  additionalData.financialYear.length > 0 ? (
                    additionalData.financialYear.map(
                      (item: any, index: any) => (
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
          <div>
            <div className="flex gap-1 items-center space-y-2 py-5">
              <label className="mt-2 text-slate-600" htmlFor="reportBasis">
                Report Basis
              </label>
              <div className="grid place-items-center justify-center ms-5">
                <input
                  id="accrual"
                  type="radio"
                  name="reportBasis"
                  value="accrual"
                  className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                    selected === "accrual"
                      ? "border-8 border-neutral-400"
                      : "border-1 border-neutral-400"
                  }`}
                  onChange={(e) => {
                    setSelected("accrual");
                    handleInputChange(e);
                  }}
                  checked={selected === "accrual"}
                />
                <div
                  className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                    selected === "accrual" ? "bg-neutral-100" : "bg-transparent"
                  }`}
                />
              </div>
              <label htmlFor="accrual" className="text-slate-600">
                <span className="font-semibold">Accrual</span> (You owe tax as
                of invoice date)
              </label>
              <div className="flex gap-1 justify-center items-center -mt-2">
                <div className="grid place-items-center ms-5">
                  <input
                    id="cash"
                    type="radio"
                    name="reportBasis"
                    value="cash"
                    className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                      selected === "cash"
                        ? "border-8 border-neutral-400"
                        : "border-1 border-neutral-400"
                    }`}
                    onChange={(e) => {
                      setSelected("cash");
                      handleInputChange(e);
                    }}
                    checked={selected === "cash"}
                  />
                  <div
                    className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                      selected === "cash" ? "bg-neutral-100" : "bg-transparent"
                    }`}
                  />
                </div>
                <label htmlFor="cash" className="text-slate-600">
                  <span className="font-semibold">Cash</span> (You owe tax upon
                  payment receipt)
                </label>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4">
          <b>Preferences</b>
        </p>
        <div className="bg-white  border-slate-200  border-2 rounded-md mt-4 p-5">
          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="relative col-span-8">
              <label htmlFor="timeZone" className="text-slate-600">
                Time Zone
              </label>
              <div className="relative w-full my-3">
                <select
                  name="timeZone"
                  onChange={handleInputChange}
                  id="timeZone"
                  className="block appearance-none w-full text-zinc-400 bg-white border border-slate-200 text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">value</option>

                  <option value="IST">IST</option>
                  <option value="UTC">UTC</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>
            <div className="col-span-4"></div>
          </div>
          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="relative col-span-8">
              <label htmlFor="dateformat" className="text-slate-600">
                Date Format
              </label>
              <div className="relative w-full mt-3">
                <select
                  onChange={handleInputChange}
                  name="dateFormat"
                  id="dateFormat"
                  className="block appearance-none w-full text-zinc-400 bg-white border border-slate-200 text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  {additionalData?.dateFormat?.short &&
                  additionalData?.dateFormat.short.length > 0 ? (
                    <>
                      <optgroup label="Short">
                        {additionalData.dateFormat.short.map(
                          (item: any, index: any) => (
                            <option key={`short-${index}`} value={item}>
                              {item}
                            </option>
                          )
                        )}
                      </optgroup>
                    </>
                  ) : (
                    <></>
                  )}

                  {additionalData?.dateFormat?.medium &&
                  additionalData?.dateFormat.medium.length > 0 ? (
                    <>
                      <optgroup label="Medium">
                        {additionalData.dateFormat.medium.map(
                          (item: any, index: any) => (
                            <option key={`medium-${index}`} value={item}>
                              {item}
                            </option>
                          )
                        )}
                      </optgroup>
                    </>
                  ) : (
                    <></>
                  )}

                  {additionalData?.dateFormat?.long &&
                  additionalData?.dateFormat.long.length > 0 ? (
                    <>
                      <optgroup label="Long">
                        {additionalData.dateFormat.long.map(
                          (item: any, index: any) => (
                            <option key={`long-${index}`} value={item}>
                              {item}
                            </option>
                          )
                        )}
                      </optgroup>
                    </>
                  ) : (
                    <></>
                  )}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>
            <div className="relative col-span-4 mt-5">
              <div className="relative w-full mt-3">
                <select
                  onChange={handleInputChange}
                  name="dateSplit"
                  id="dateSplit"
                  className="block appearance-none w-full text-zinc-400 bg-white border border-slate-200 text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  {additionalData?.dateSplit &&
                  additionalData?.dateSplit.length > 0 ? (
                    additionalData?.dateSplit.map((item: any, index: any) => (
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
        </div>

        <div className="flex my-4 gap-4">
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => handleCreateOrganization(e)}
          >
            {" "}
            Save
          </Button>

          <Button variant="secondary" size="sm">
            {" "}
            Cancel
          </Button>
        </div>
      </form>

      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default CreateOrganizationForm;
