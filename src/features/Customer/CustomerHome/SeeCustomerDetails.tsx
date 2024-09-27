import { Link, useParams } from "react-router-dom";
import CheveronLeftIcon from "../../../assets/icons/CheveronLeftIcon";
import cardBg from "../../../assets/Images/Card 3 Mask.png";
import walletImage from "../../../assets/Images/Frame 629221.png";
import walletCashImage from "../../../assets/Images/Frame 629221 (1).png";
import revenueImage from "../../../assets/Images/Frame 629221 (2).png";
import salesImage from "../../../assets/Images/Frame 629221 (3).png";
import cardBackground from "../../../assets/Images/Frame 629314.png";
import MailIcon from "../../../assets/icons/MailIcon";
import PhoneIcon from "../../../assets/icons/PhoneIcon";
import Button from "../../../Components/Button";
import Vector from "../../../assets/icons/Vector";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import EditCustomerModal from "./EditCustomerModal";
import { CustomerEditResponseContext } from "../../../context/ContextShare";
import toast, { Toaster } from "react-hot-toast";
import CustomerHistory from "./CustomerHistory";
type Props = {};

interface Status {
  organizationId: string;
  status: string;
}

function SeeCustomerDetails({}: Props) {
  const param = useParams();
  const [selectedTab, setSelectedTab] = useState("Overview");
  const [customerData, setCustomerData] = useState<any | []>([]);
  const { request: getOneCustomer } = useApi("get", 5002);
  const { request: updateCustomerStatus } = useApi("put", 5002);

  const { customerEditResponse } = useContext(CustomerEditResponseContext)!;
  const [statusData, setStatusData] = useState<Status>({
    organizationId: "INDORG0001",
    status: "",
  });

  const { id } = param;
  const customerId = id;

  const getCustomer = async () => {
    const url = `${endponits.GET_ONE_CUSTOMER}/${id}`;
    try {
      const apiResponse = await getOneCustomer(url);
      
      const { response, error } = apiResponse;
      if (!error && response) {
        setCustomerData(response.data);
        // console.log(response.data,"get status");
                setStatusData((prevData) => ({
          ...prevData,
          status: response.data.status
        }));
      
      }
    } catch (error) {}
  };
  useEffect(() => {
    getCustomer();
  }, [customerEditResponse]);


  const sideBarHead = [
    { title: "Overview", onclick: () => setSelectedTab("Overview") },
    { title: "Sales History", onclick: () => setSelectedTab("Sales History") },
    {
      title: "Wallet Transaction",
      onclick: () => setSelectedTab("Wallet Transaction"),
    },
    {
      title: "Referral Bonus",
      onclick: () => setSelectedTab("Referral Bonus"),
    },
    { title: "View Payment", onclick: () => setSelectedTab("View Payment") },
  ];

  
// console.log(customerData);


  const handleStatusSubmit = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setStatusData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
   
    const url = `${endponits.UPDATE_CUSTOMER_STATUS}/${id}`;
    try {
      const { response, error } = await updateCustomerStatus(url, {
        ...statusData,
        status: value,
      });
      if (!error && response) {
        toast.success(response.data.message);
        // console.log(response,"status submit");
      } else {
        console.log(error,"error in status");
        
        toast.error(error.response.data.message);
      }
    } catch (error) {}
  };


  



  return (
    <div className="px-6">
      <div className="bg-white rounded-md p-5">
        <div className="flex items-center gap-5">
          <Link to={"/customer/home"}>
            <div
              style={{ borderRadius: "50%" }}
              className="w-[40px] h-[40px] flex items-center justify-center bg-backButton"
            >
              <CheveronLeftIcon />
            </div>
          </Link>
          <p className="text-textColor text-xl font-bold">Back</p>
        </div>

        <div className="mt-6 flex justify-between">
          {/* 1st card */}
          <div
            className="relative w-[27.9%] h-[146px] rounded-2xl p-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${cardBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#6B0F1A] to-[#200122] opacity-75 rounded-2xl"></div>
            <div className="relative z-10">
              <p className="text-membershipText text-sm mt-1">
                Privilege Membership Card
              </p>
              <div className="flex items-center mt-3">
                <img
                src="https://i.postimg.cc/05XQMpkS/Ellipse-2.png"
                  alt="Profile"
                  className="w-8 h-8 object-cover rounded-full mr-3"
                />
                <div>
                  <p className="text-white text-sm font-semibold mt-1">
                    Jancy Philip
                  </p>
                  <p className="text-membershipText text-xs mt-1">8756347856</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd card */}
          <div className="w-[7.7%] h-[148px] p-6 bg-cuscolumnbg rounded-lg text-center">
            <img src={walletImage} alt="" className="object-cover" />
            <p className="mt-2 text-sm font-semibold text-textColor">Wallet</p>
            <p className="mt-1 text-lg font-bold text-textColor">0.00</p>
          </div>

          {/* 3rd card */}
          <div className="w-[13.4%] h-[148px] p-6 bg-cuscolumnbg rounded-lg text-center">
            <div className="items-center flex justify-center">
              <img src={walletCashImage} alt="" className="object-cover" />
            </div>
            <p className="mt-2 text-sm font-semibold text-textColor">
              Redeemed Wallet
            </p>
            <p className="mt-1 text-lg font-bold text-textColor">0.00</p>
          </div>

          {/* 4th card */}
          <div className="w-[11.6%] h-[148px] p-6 bg-cuscolumnbg rounded-lg text-center">
            <div className="items-center flex justify-center">
              <img src={revenueImage} alt="" className="object-cover" />
            </div>
            <p className="mt-2 text-sm font-semibold text-textColor">
              Total Revenue
            </p>
            <p className="mt-1 text-lg font-bold text-textColor">5000.00</p>
          </div>

          {/* 5th card */}
          <div className="w-[12.8%] h-[148px] p-6 bg-cuscolumnbg rounded-lg text-center">
            <div className="items-center flex justify-center">
              <img src={salesImage} alt="" className="object-cover" />
            </div>
            <p className="mt-2 text-sm font-semibold text-textColor">
              Total no of sales
            </p>
            <p className="mt-1 text-lg font-bold text-textColor">5</p>
          </div>

          {/* 6th card */}
          <div
            className="w-[20.65%] h-[148px] p-6 bg-cuscolumnbg rounded-lg text-center"
            style={{ backgroundImage: `url(${cardBackground})` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 bg-white p-5 my-5 rounded-lg">
        <div className="col-span-3 p-2">
          {sideBarHead.map((item, index) => (
            <div
              key={index}
              className={`rounded-lg my-2 px-3 text-sm py-1.5 cursor-pointer ${
                selectedTab === item.title ? "bg-lightBeige" : "bg-white"
              }`}
              onClick={item.onclick}
            >
              <p>{item.title}</p>
            </div>
          ))}
        </div>

        <div className="col-span-9">
          <div className="space-y-3  w-[100%] text-sm border-[1px]  border-[#DADBDD] rounded-md p-4 ">
            <div className="flex items-center ">
              {/* <img
                className="rounded-full"
                src="https://i.postimg.cc/c4hsrPvM/Ellipse-44.png"
                alt=""
              /> */}
              <p className="font-bold text-textColor border-e pe-5 border-e-textColor">
              <span className="font-medium"> Customer Name : </span>{customerData?.customerDisplayName}
              </p>
              <p className="font-bold text-textColor  px-5 border-e pe-5 border-e-textColor ">
              <span className="font-medium"> Company Name : </span> {customerData.companyName}
              </p>
              {/* <p className="font-bold text-textColor  px-5 ">
              <span className="font-medium"> Opening Balance : </span> 
              </p> */}

              {
               <div className=" w-[33.6%] ml-auto">
                  <div
                    className={`w-fit  px-2 flex justify-center  rounded-md  text-xs text-white p-0.5 -ms-2 ${
                      statusData.status == "Active"
                        ? "bg-[#78AA86]"
                        : "bg-zinc-400"
                    }`}
                  >
                    {statusData.status}
                  </div>
               </div>
              }
            </div>

            <div className="flex items-center ">
              <div className="flex items-center gap-2 text-textColor pe-5 border-e-[.2px] border-e-textColor">
                <MailIcon color={"#303F58"} />
                <p> {customerData.customerEmail}</p>
              </div>
              <div className="flex items-center gap-2 text-textColor px-5 ">
                <PhoneIcon color={"#303F58"} size={18} />
                <p> {customerData.mobile}</p>
              </div>
              <div className="ml-auto w-[40%] gap-2 flex">
                <EditCustomerModal customerDataPorps={customerData} />

                <select
                  id=""
                  className="text-[10px] h-6 ps-2 bg-white border-blk rounded-md border text-textColor border-textColor"
                  value={statusData.status}
                  name="status"
                  onChange={handleStatusSubmit}
                >
                  <option value="" className="disabled hidden"></option>
                  <option value="Active">Active </option>
                  <option value="Inactive"><div>Inactive <div className="h-12 w-14 bg-black"></div></div></option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-[1px]  border-[#DADBDD] rounded-md p-2 mt-2">
            <div className="grid grid-cols-3  gap-4 text-sm text-textColor ">
              <div className="bg-[#F3F3F3] p-2 rounded-lg">
                <div className="flex w-full p-2">
                  <p className="font-bold">Billing Address</p>
                  <div className="ml-auto">
                  <EditCustomerModal addressEdit="billingAddressEdit" customerDataPorps={customerData}/>
                  </div>
                </div>
                <div className=" text-xs p-2">
                  <p>{customerData.billingAttention}</p>
                  <p>
                    {customerData.billingAddressLine1},{" "}
                    {customerData.billingAddressLine2}
                  </p>
                  <p>{customerData.billingCity}</p>
                  <p>pin {customerData.billingPinCode} </p>
                  <p>{customerData.billingCountry}</p>
                  <p>Phone: {customerData.billingPhone}</p>
                </div>
              </div>
              <div className="bg-[#F3F3F3] p-2 rounded-lg">
                <div className="flex w-full p-2 ">
                  <p className="font-bold">Shipping Address</p>
                  <div className="ml-auto">
                    <EditCustomerModal addressEdit="shippingAddressEdit" customerDataPorps={customerData}/>
                    {/* <Pen color={"#303F58"} /> */}
                  </div>
                </div>
                <div className=" text-xs  p-2">
                  <p>{customerData.shippingAttention}</p>
                  <p>
                    {customerData.shippingAddress1},{" "}
                    {customerData.shippingAddress2}
                  </p>
                  <p>{customerData.shippingCity}</p>
                  <p>pin {customerData.shippingPinCode}</p>
                  <p>{customerData.shippingCountry}</p>
                  <p>Phone: {customerData.shippingPhone}</p>
                </div>
              </div>

              <div className="pe-8 p-2">
                <p className="font-bold m-2">Other Details</p>

                <div className="space-y-2 text-xs p-2">
                  <div className="flex text-textColor">
                    <p>Customet Type</p>{" "}
                    <p className="ml-auto font-semibold">
                      {customerData.customerType}
                    </p>
                  </div>
                  <div className="flex text-textColor ">
                    <p>Default Currency</p>{" "}
                    <p className="ml-auto  font-semibold">
                      {customerData.currency}
                    </p>
                  </div>
                  <div className="flex text-textColor ">
                    <p>Payment Terms</p>{" "}
                    <p className="ml-auto font-semibold">
                      {customerData.paymentTerms}
                    </p>
                  </div>
                  <div className="flex text-textColor ">
                    <p>Portal Language</p>{" "}
                    <p className="ml-auto font-semibold">English</p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex items-end justify-end">
            {" "}
            <Button variant="secondary" className="h-3 text-xs">
                <Vector />
                <CustomerHistory id={customerId}/>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
}

export default SeeCustomerDetails;
