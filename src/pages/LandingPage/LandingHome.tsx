// src/components/LandingHome.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowIconNoUnderline from "../../assets/icons/ArrowIconNoUnderline";
import ArrowrightUp from "../../assets/icons/ArrowrightUp";
import CehvronDown from "../../assets/icons/CehvronDown";
import TimerIcon from "../../assets/icons/TimerIcon";
import accVector1 from "../../assets/Images/AccVector1.png";
import accVector2 from "../../assets/Images/AccVector2.png";
import chatVector1 from "../../assets/Images/chatAIVector1.png";
import chatVector2 from "../../assets/Images/chatAIVector2.png";
import customerVector from "../../assets/Images/customerVector.png";
import expenseVector from "../../assets/Images/expenseVector.png";
import inventoryImg from "../../assets/Images/InventoryImg.png";
import inventoryVector from "../../assets/Images/inventoryVector.png";
import manageSalesImg from '../../assets/Images/manageSalesImg.png';
import purchaseVector from "../../assets/Images/purchaseVector.png";
import salesVector from "../../assets/Images/salesVector.png";
import supplierVector from "../../assets/Images/supplierVector.png";
import droidBilly from '../../assets/Images/droidBilly.png'
import LandingHeader from "./LandingHeader";
const LandingHome: React.FC = () => {
  const [mode,setMode]=useState(false)
  const navigate=useNavigate()
  return (
    <div className={`${mode?'bg-white':'bg-[#1A2023]'} text-white min-h-screen p-10`}>
      
      {/* Header */}
     <LandingHeader mode={mode} setMode={setMode}/>
     
      {/* Main Content */}
      <div className="grid grid-cols-12 relative"> 
        
      <button className={`absolute z-60 right-1/2 ${mode?'bg-white':'bg-[#1A282F]'} rounded-full -bottom-2 h-[52px] w-[143px] flex items-center rotate-border shadow-xl`}>
      
      </button>
      <button className={`absolute z-70 right-[722px] ${mode?'bg-white':'bg-[#1A282F]'} rounded-full -bottom-[6px] px-4 py-3 ${mode&&'text-[#C2A270]'} flex items-center`}>
      More Apps <CehvronDown color={mode?'#C2A270':"white"} />
      </button>
        <div className="col-span-9 ">
          <div className="grid grid-cols-12 gap-3">
          <div className="col-span-5">
         <div className={`w-[440px] h-[260px] rounded-2xl ${mode?'bg-[#DED0B9]':'bg-[#565148]'}   relative overflow-hidden p-6 flex flex-col`}>
        <img className="absolute right-0 bottom-0" src={salesVector} alt="" />
        {/* Header Buttons */}
        <div className="flex  justify-between items-center">
          <div className="flex space-x-3 items-center">
          <button className={` ${mode?'bg-[#948B7C]':'bg-[#C4B8A3]'} text-white text-sm w-[62px] h-[35px] rounded-lg`}>
            Sales
          </button>
          <button className={`${mode?'bg-[#948B7C]':'bg-[#726e66]'} text-white space-x-2  text-sm w-[160px] h-[28px] rounded-md flex items-center justify-center`}>
            <TimerIcon/>
            <p>Recently Opened</p>
          </button>
          </div>
          {/* Arrow Button */}
        
        <div  className="flex justify-end cursor-pointer">
          <div onClick={()=>navigate('/sales/salesorder')} className={`${mode?'bg-[#948B7C]':'bg-[#90887A]'} text-white h-[52px] w-[52px] flex items-center justify-center rounded-full `}>
            <ArrowrightUp size={30} stroke={1}/>
          </div>
        </div>
        </div>

        {/* Main Content */}
        <div className={`mt-2 ${mode?'text-[#303F58]':'text-white'} `}>
          <p className="text-[32px] ">Manage <span className="font-bold">Sales</span></p>
          <p className="w-52 text-[32px] ">Workflow Solution</p>
        </div>
        
        <img src={manageSalesImg} alt="" className="absolute -right-12 -bottom-7 w-[326px] h-[177px]" />
      </div>
    </div>
    <div className="relative col-span-7">
    <div
        className="w-[605px] h-[260px] relative overflow-hidden  rounded-2xl"
      >
        <img src={inventoryVector} className="absolute overflow-hidden right-20 top-[2px] z-9999" alt="" />
        {/* Image section */}
        <img
          src={inventoryImg}
          alt="Manage Sales"
          className="absolute bottom-[-40px] right-[-130px] z-9999 w-[520px] h-auto object-cover"
          style={{ clipPath: 'inset(0 0 0 0)' }}
        />
        {/* Arrow icon in the top right corner inside a circle   */}
        <div onClick={()=>navigate('/inventory')}  className={`${mode?'bg-white':'bg-[#1A2023]'} cursor-pointer z-100 w-[98px] h-[63px] absolute top-[2px] right-[7px] flex items-center justify-center rounded-bl-2xl`}>
        <div onClick={()=>navigate('/inventory')} className={`flex items-center justify-center  w-[52px] h-[52px]  ${mode?'bg-[#97998E]':'bg-[#2C353B]'} rounded-full`}>
          <ArrowrightUp size={30} stroke={1}/>
        </div>
        </div>
    <div className={`absolute ${mode?'bg-[#CACCBE]':'bg-[#2C353B]'}  rounded-2xl overflow-hidden bg-[#2C353B] rounded-bl-none w-[505px] h-[70px] -top-2 -left-2 transform translate-x-[10px] translate-y-[10px] pt-8 ps-4`}>
    <button className="bg-[#0F1315] text-white text-sm px-[10px] py-[8px] h-[35px] rounded-lg">
            Inventory
          </button>
    </div>
  <div className={`absolute  rounded-r-2xl ${mode?'bg-[#CACCBE]':'bg-[#2C353B]'}  w-[600px] h-[195px] top-[60px] -left-[8px]  transform translate-x-[10px] translate-y-[10px] px-4`}>
  <div className="flex flex-col  justify-center h-[85%] z-30">
             <p className={`w-[260px] text-[32px] ${mode?'text-[#303F58]':'text-white'}`}>Track and manage <span className="font-bold"> stock </span> efficiently </p>
           </div>
  </div>
  <div className={`absolute ${mode?'bg-[#CACCBE]':'bg-[#2C353B]'}  rounded-r-2xl bg-[#2C353B] w-[105px] h-[198px]  top-[63px] right-0`}></div>
  </div>
    </div>
        <div className="col-span-3">
          <div className={`w-[250px] rounded-2xl ${mode?'bg-[#C9CCBA]':'bg-[#3A3E40]'}  h-[304px] px-4 py-6 relative z-50`}>
            <img src={customerVector} className="absolute bottom-[2px] -z-10 right-3" alt="" />
          <div className="flex justify-between items-center">
           <button className={` ${mode?'bg-[#71736B]':'bg-[#495053]'} text-white text-sm px-[10px] py-[8px] h-[35px] rounded-lg`}>
            Customer
          </button>
          <button onClick={()=>navigate('/customer')} className={` ${mode?'bg-[#585953]':'bg-[#595F62]'} text-white h-[42px] w-[42px] flex items-center justify-center rounded-full`}>
            <ArrowrightUp size={30} stroke={1}/>
          </button>
           </div>
           <div className="flex flex-col  justify-center h-[85%] z-30">
             <p className={`w-[200px] text-[24px] ${mode?'text-[#303F58]':'text-white'}`}>Efficient <span className="font-bold">Customer</span> Management System</p>
           </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className={`w-[250px] rounded-2xl ${mode?'bg-[#DFE1E2]':'bg-[#585953]'}  h-[304px] z-50  relative px-4 py-6`}>
            <img src={purchaseVector} className={`absolute top-0 right-0 -z-10 ${mode&&'opacity-35'}`} alt="" />
          <div className="flex justify-between items-center">
           <button className={`${mode?'bg-white':'bg-[#71736B]'} ${mode?'text-[#303F58]':'text-white'} text-sm px-[10px] py-[8px] font-medium h-[35px] rounded-lg`}>
            Purchase
          </button>
          <button onClick={()=>navigate('/purchase')} className="bg-[#FEFBF8] text-white h-[42px] w-[42px] flex items-center justify-center rounded-full">
            <ArrowrightUp color="black" size={30} stroke={1}/>
          </button>
           </div>
           <div className="flex flex-col  justify-center h-[85%] z-30">
             <p className={`w-[182px] text-[24px] ${mode?'text-[#303F58]':'text-white'}`}>Streamlined <span className="font-bold">Purchase</span> Workflow Hub</p>
           </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className={`w-[250px] rounded-2xl relative  ${mode?'bg-[#DFE1E2]':'bg-[#283035]'} h-[304px] px-4 py-6 z-50`}>
          <img src={expenseVector} className={`absolute right-0 top-0 -z-10 ${mode&&'opacity-35'}`} alt="" />
          <div className="flex justify-between items-center">
           <button className={`${mode?'bg-white':'bg-[#14181B]'} font-medium ${mode?'text-[#303F58]':'text-white'} text-sm px-[10px] py-[8px] h-[35px] rounded-lg`}>
           Expense
          </button>
          <button onClick={()=>navigate('/expense')} className={`${mode?'bg-[#FEFBF8]':'bg-[#283035]'} text-white h-[42px] w-[42px] flex items-center justify-center rounded-full`}>
            <ArrowrightUp color={mode?'black':'currentColor'} size={30} stroke={1}/>
          </button>
           </div>
           <div className="flex flex-col  justify-center h-[85%] z-40">
             <p className={`w-[185px] ${mode?'text-[#303F58]':'text-white'} text-[24px]`}>Advanced <span className="font-bold">Expense</span> Control Hub</p>
           </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className={`w-[240px] rounded-2xl  ${mode?'bg-[#F7E7CE]':'bg-[#626552]'} relative h-[304px] px-4 py-6 z-50`}>
            <img src={supplierVector} className="absolute top-0 right-10" alt="" />
          <div className="flex justify-between items-center">
           <button className={`${mode?'bg-[#DED0B9]':'bg-[#97998E]'} font-medium ${mode?'text-[#303F58]':'text-white'} text-sm px-[10px] py-[8px] h-[35px] rounded-lg`}>
           Supplier
          </button>
          <button onClick={()=>navigate('/supplier')} className={`${mode?'bg-[#DED0B9]':'bg-[#97998E]'}  text-white h-[42px] w-[42px] flex items-center justify-center rounded-full`}>
            <ArrowrightUp color={mode?'#303F58':'currentColor'} size={30} stroke={1}/>
          </button>
           </div>
           <div className="flex flex-col  justify-center h-[85%] z-40">
             <p className={`w-[177px] text-[24px] ${mode?'text-[#303F58]':'text-white'}`}>Efficient <span className="font-bold">Supplier</span> Management System </p>
           </div>
          </div>
        </div>
        </div>
        </div>
        <div className="col-span-3 space-y-4">
          <div className={`w-[360px] h-[437px] rounded-2xl relative ${mode?'bg-[#CFAE7D]':'bg-[#948B7C]'} px-4 py-6 z-50`}>
            <img src={accVector1} className="absolute -right-10 top-20 -z-10" alt="" />
            <img src={accVector2} className="absolute -bottom-[85px] left-0 -z-10" alt="" />
           <div className="flex justify-between items-center">
           <button className={`${mode?'bg-[#948B7C]':'bg-[#C4B8A3]'} text-white text-sm px-[10px] py-[8px] h-[35px] rounded-lg`}>
            Accountant
          </button>
          <button onClick={()=>navigate('/accountant')} className={`${mode?'bg-[#B9AD9B]':'bg-[#565148]'} text-white h-[42px] w-[42px] flex items-center justify-center rounded-full`}>
            <ArrowrightUp size={30} stroke={1}/>
          </button>
           </div>
           <div className="flex flex-col  justify-center h-[85%] z-40">
             <p className={`w-[272px] text-[32px] ${mode?'text-[#303F58]':'text-white'}`}>Manage <span className="font-bold">Finance</span> and Generate Reports</p>
           </div>
          </div>
          <div className="h-[120px] w-[360px] rounded-2xl relative p-4 flex justify-between items-center z-50 overflow-hidden" 
     style={{ 
       background: mode?  'linear-gradient(to right, #F7E7CE, #FEFFF9, #CACCBE)'  : 'linear-gradient(to right, #2C2F34, #4C4F55, #8A8C91, #B4B6BA)'
     }}>
  <img src={droidBilly} className="w-[195px] -bottom-20 absolute " alt="" />    
  <img src={chatVector1} className="-z-10 absolute right-20 top-0" alt="" />
  <img src={chatVector2} className="-z-10 absolute right-0 bottom-0" alt="" />
  <p className={`w-[140px] text-[16px]  absolute right-14 bottom-5 ${mode?'text-[#303F58]':'text-white'}`}>Chat With <br /><span className="font-bold text-[24px]">droid billie</span></p>
  <button className="bg-[#F6F6F6] absolute right-3 top-4 text-white h-[49px] w-[49px] flex items-center justify-center rounded-full">
    <ArrowIconNoUnderline
      className="transform rotate-90" 
      color="#585953"
      stroke={1}
      size={30}
    />
  </button>
</div>


         
        </div>
      </div>
    </div>
  );
};



export default LandingHome;
