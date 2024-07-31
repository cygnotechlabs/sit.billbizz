import { Link } from "react-router-dom";
import CheveronLeftIcon from "../../../assets/icons/CheveronLeftIcon";
import Button from "../../../Components/Button";
import Pen from "../../../assets/icons/Pen";
import MailIcon from "../../../assets/icons/MailIcon";
import CehvronDown from "../../../assets/icons/CehvronDown";
import BookIcon from "../../../assets/icons/BookIcon";
import PlusCircle from "../../../assets/icons/PlusCircle";
import { useEffect, useRef, useState } from "react";
import ReceiptPDFView from "./ReceiptPDFView";

type Props = {};

const ReceiptView = ({}: Props) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(0);

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

  const receiptData = [
    {
      name: "Mr.Aman Rasheedh",
      amount: "1000",
      date: "30/07/20240",
      mode: "cash",
      receipt: "CR-001",
    },
    {
      name: "Mr.Aman Rasheedh",
      amount: "1000",
      date: "30/07/20240",
      mode: "cash",
      receipt: "CR-002",
    },
    {
      name: "Mr.Aman Rasheedh",
      amount: "1000",
      date: "30/07/20240",
      mode: "cash",
      receipt: "CR-003",
    },
  ];
  return (
    <div className="bg-white rounded-md p-5 mb-32 mx-5 my-4 space-y-5">
      <div className="flex items-center gap-5">
        <Link to={"/sales/receipt"}>
          <div
            style={{ borderRadius: "50%" }}
            className="w-[40px] h-[40px] flex items-center justify-center bg-backButton"
          >
            <CheveronLeftIcon />
          </div>
        </Link>
        <p className="text-textColor text-xl font-bold">View Receipt</p>
      </div>
      <div className="flex border-b border-slate-300 pb-4">
        <div className="flex gap-3 items-center">
          <p className="text-lg text-textColor font-bold pr-4 border-r-[1px] border-borderRight">
            Receipt
          </p>
          <p className="text-lg text-textColor font-bold pr-4 ">
            CR-0001
          </p>
          <p className="text-sm font-semibold text-textColor bg-cuscolumnbg p-1 text-center rounded-sm">
            Draft
          </p>
        </div>
        <div className="flex gap-3 items-center ml-auto">
          <Button variant="secondary" className="pl-6 pr-6" size="sm">
            <Pen color="#565148" /> <p className="text-sm font-medium">Edit</p>
          </Button>
          <Button variant="secondary" className="pl-5 pr-5" size="sm">
            <MailIcon color="#565148" />{" "}
            <p className="text-sm font-medium">Email</p>
          </Button>
          <Button
            variant="secondary"
            className="h-9"
            size="sm"
            onClick={() => toggleDropdown("moreAction")}
          >
            More Action
            <CehvronDown color="#565148" />{" "}
            {openDropdownIndex === "moreAction" && (
              <div
                ref={dropdownRef}
                className="absolute  bg-white w-44 -ms-2  shadow  rounded-md mt-28 pt-3 pb-1   flex "
              >
                <button className="hover:bg-red-50 w-full rounded-sm px-7 p-2 ">
                  Delete
                </button>
              </div>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12  ">
        <div className="col-span-4 bg-[#F6F6F6] py-4 px-3 rounded-lg h-[763px] ">
          <div className="flex py-2 gap-4">
            <div className="flex items-center justify-center bg-[#E3E6D5] text-sm  rounded-[4px] h-9 px-6 ">
              <BookIcon color={"#585953"} />
              All
            </div>
            <div className=" flex gap-2 px-3 items-center justify-center bg-white text-sm rounded-[4px] h-9 border  border-slate-300 text-darkRed font-semibold">
              <PlusCircle color="darkRed" />
              New Custom View
            </div>
          </div>
          {receiptData.map((item, index) => (
            <div
              className={`space-y-[10px] my-3 py-[10px] px-4 ${
                clickedIndex === index ? "bg-white  rounded-lg" : ""
              }`}
              key={index}
              onClick={() => setClickedIndex(index)}
            >
              <div className="flex text-textColor    ">
                <p className="font-bold text-base">{item.name}</p>
                <p className="font-bold text-base ml-auto">
                  &#8377;{item.amount}
                </p>
              </div>
              <div className="flex text-textColor  ">
                <p className=" text-xs">
                  {item.date}
                  <span className="px-5">|</span>
                  {item.receipt}
                </p>
              </div>
              <p className="font-semibold text-sm text-textColor">Mode : {item.mode}</p>
            </div>
          ))}
        </div>

        <div className="col-span-7 p px-3 rounded-lg">
          <ReceiptPDFView />
        </div>
      </div>
    </div>
  );
};

export default ReceiptView;
