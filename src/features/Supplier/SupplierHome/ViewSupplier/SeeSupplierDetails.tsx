import { useState } from "react"
import { Link } from "react-router-dom"
import ArrowRightLeft from "../../../../assets/icons/ArrowRightLeft"
import CheveronLeftIcon from "../../../../assets/icons/CheveronLeftIcon"
import Info from "../../../../assets/icons/Info"
import MessageCircle from "../../../../assets/icons/MessageCircle"
import NewspaperIcon from "../../../../assets/icons/NewspaperIcon"
import Pen from "../../../../assets/icons/Pen"
import TrashCan from "../../../../assets/icons/TrashCan"
import Button from "../../../../Components/Button"
import Comment from "./Comment"
import Overview from "./Overview"
import Transaction from "./Transaction"
import Statement from "./Statement"

type Props = {}

function SeeSupplierDetails({}: Props) {
  const [tabSwitch,setTabSwitch]=useState("overview")
  const handleTabSwitch=(tabName:string)=>{
    setTabSwitch(tabName)
  }
  return (
    <div className="px-6">
      <div className="flex  flex-col bg-white rounded-md text-textColor  p-5 space-y-4">
        {/* header */}
        <div className="flex w-full justify-between">
        <div className="flex gap-5 items-center">
        <Link to={"/supplier/home"}>
          <div
            style={{ borderRadius: "50%" }}
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#F6F6F6]"
          >
            <CheveronLeftIcon />
          </div>
        </Link>
        <p className="text-textColor text-xl font-bold">Office Vendors</p>
        </div>
        <div className="flex gap-3 items-center">
        <Button variant="secondary" className="pl-6 pr-6"  size="sm"><Pen size={18} color="#565148" /> <p className="text-sm font-medium">Edit</p></Button>
        <Button variant="secondary" className="pl-5 pr-5"  size="sm"><TrashCan size={18} color="#565148" /> <p className="text-sm font-medium">Delete</p></Button>
        </div>
        </div>
        {/* Tabs */}
        <div className="flex items-center w-full gap-2">
          <div onClick={()=>handleTabSwitch("overview")} className={`text-[14px] font-semibold ${tabSwitch=="overview"&&"bg-[#F7E7CE]"} w-[187px] py-2 justify-center flex gap-2 items-center rounded-[8px] cursor-pointer`}><Info color="#303F58" size={20}/> Overview</div>
          <div onClick={()=>handleTabSwitch("comment")} className={`text-[14px] font-semibold ${tabSwitch=="comment"&&"bg-[#F7E7CE]"} w-[187px] py-2 justify-center flex gap-2 items-center rounded-[8px] cursor-pointer`}><MessageCircle size={20} color="#303F58"/> Comments</div>
          <div onClick={()=>handleTabSwitch("transaction")} className={`text-[14px] font-semibold ${tabSwitch=="transaction"&&"bg-[#F7E7CE]"} w-[187px] py-2 justify-center flex gap-2 items-center rounded-[8px] cursor-pointer`}><ArrowRightLeft size={20} color="#303F58"/> Transaction</div>
          <div onClick={()=>handleTabSwitch("statement")}className={`text-[14px] font-semibold ${tabSwitch=="statement"&&"bg-[#F7E7CE]"} w-[187px] py-2 justify-center flex gap-2 items-center rounded-[8px] cursor-pointer`}><NewspaperIcon color="#303F58"/> Statements</div>
        </div>
        {
          tabSwitch=="overview"?
          <Overview/>:
          tabSwitch=="comment"?
          <Comment/>:
          tabSwitch=="transaction"?
          <Transaction/>:
          tabSwitch=="statement"&&
          <Statement/>
        }
      </div>
    </div>
  )
}

export default SeeSupplierDetails