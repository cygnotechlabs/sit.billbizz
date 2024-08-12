import {  useState } from "react";
import CehvronDown from "../../../assets/icons/CehvronDown";
import Banner from "../banner/Banner";
import Button from "../../../Components/Button";

type Props = {};

const itemOptions = [
  {
    label: "Set decimal rate of your item quantity:",
    options: ["2", "3", "4"],
  },
  {
    label: "Measure item dimensions:",
    options: ["CM", "3", "4"],
  },
  {
    label: "Measure item weights In:",
    options: ["KG", "3", "4"],
  },
  {
    label: "Selected items when barcodes are scanned using:",
    options: ["SKU", "3", "4"],
  },
];

function Items({}: Props) {
  const [selectedRadio, setSelectedRadio] = useState({
    hsnCode:"4"
  });
  const[enableCheckBox,setEnableCheckBox]=useState({
    allowDuplicateItem:false,
    hsnCode:false,
    priceList:false,
    applyPriceListLineTimeLevel:false,
    compositeItems:false,
    preventStock:false,
    showOutOfStock:false,
    quantityReachesReorderPoint:false,
    trackLandedCost:false 
  })
  return (
    <div className="m-4 text-[#303F58]">
      <Banner/>
      
        <p className="text-[20px] font-bold mt-3">Item</p>
        <div className="space-y-4 mt-2">
        {/* Quantity */}
        <div className="bg-white h-[192px] w-full p-6 rounded-lg">
          <div className="space-y-4">
            
            {itemOptions.map((item, index) => (
              <div key={index} className="grid grid-cols-12 items-center space-x-20">
                <p className="col-span-4 text-[14px] font-semibold">{item.label}</p>
                <div className="relative col-span-2 w-[60px]">
                  <select
                    className="block appearance-none text-zinc-400 bg-white border border-inputBorder text-sm h-[24px] w-[58px] pl-2 rounded-md focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                  >
                    {item.options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none  absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                    <CehvronDown bold={2} height={18} width={18} color="gray" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Duplicate Item name */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
            <p className="font-bold ">Duplicate Item Name</p>
            <div className='flex items-center space-x-2 mt-3'>
          <input onChange={(e)=>setEnableCheckBox({...enableCheckBox,allowDuplicateItem:e.target.checked})} type="checkbox" id='customCheckbox' />
          <label className=' font-medium  '>Allow duplicate item names</label>
          </div>
          <p className="text-[#818894]">If you allow duplicate item names, all imports involving items will use SKU as the primary field for mapping</p>
        </div>
        {/* HSN Code or SAC */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-4">
            <p className="font-bold ">HSN Code or SAC </p>
            <div className='flex items-center space-x-2 mt-3'>
          <input type="checkbox" id='customCheckbox' onChange={(e)=>setEnableCheckBox({...enableCheckBox,hsnCode:e.target.checked})}/>
          <label >Enable the HSN Code or SAC field</label>
          </div>
          {enableCheckBox.hsnCode&&<>
            <div className="flex gap-1  items-center mt-3">
                <div onClick={() => {
                      setSelectedRadio({...selectedRadio,hsnCode:"4"});
                      // handleInputChange(e);
                    }} className="grid place-items-center cursor-pointer">
                  <input
                    id="6"
                    type="radio"
                    name="reportBasis"
                    value="4"
                    className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border  ${
                      selectedRadio.hsnCode === "4"
                        ? "border-8 border-neutral-400"
                        : "border-1 border-neutral-400"
                    }`}
                    
                    checked={selectedRadio.hsnCode === "4"}
                  />
                  <div
                    className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                      selectedRadio.hsnCode === "4" ? "bg-neutral-100" : "bg-transparent"
                    }`}
                  />
                </div>
                <label htmlFor="4" className="text-slate-600">
                  <span className="font-semibold">4-Digit HSN Code or SAC</span> 
                </label>
               </div>
               <p className="w-[82%] text-[13px] text-[#818894]">Select this option if your business’s annual turnover was less than 5crores in the previous year. The 4-digit HSN Code or SAC is mandatory 
               for B2B,SEZ Export or Deemed Export tax invoices and optional for B2C tax invoices.</p>
              <div className="flex gap-1  items-center -mt-2">
                <div onClick={() => {
                      setSelectedRadio({...selectedRadio,hsnCode:"6"});
                      // handleInputChange(e);
                    }} className="grid place-items-center cursor-pointer">
                  <input
                    id="6"
                    type="radio"
                    name="reportBasis"
                    value="6"
                    className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border  ${
                      selectedRadio.hsnCode === "6"
                        ? "border-8 border-neutral-400"
                        : "border-1 border-neutral-400"
                    }`}
                    
                    checked={selectedRadio.hsnCode === "6"}
                  />
                  <div
                    className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                      selectedRadio.hsnCode === "6" ? "bg-neutral-100" : "bg-transparent"
                    }`}
                  />
                </div>
                <label htmlFor="6" className="text-slate-600">
                  <span className="font-semibold">6-Digit HSN Code or SAC</span>
                </label>
               </div>
               <p className="text-[13px] text-[#818894]">Select this option if your business’s annual turnover was more than 5crores in the previous year. The 6-digit HSN Code or SAC is mandatory invoices.</p>
          </>}
        </div>
        {/* Price List */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
            <p className="font-bold ">Price List</p>
            <div className='flex items-center space-x-2 mt-3'>
          <input onChange={(e)=>setEnableCheckBox({...enableCheckBox,priceList:e.target.checked})} type="checkbox" id='customCheckbox' />
          <label >Enable Price List</label>
          </div>
          <p className="text-[#818894]">Price Lists enables you to customise the rates of the items in your sales and purchase transactions</p>
          {enableCheckBox.priceList&&<>
          <div className='flex items-center space-x-2 mt-3'>
          <input onChange={(e)=>setEnableCheckBox({...enableCheckBox,applyPriceListLineTimeLevel:e.target.checked})} type="checkbox" id='customCheckbox' />
          <label >Apply price list at line time level</label>
          </div>
          <p className="text-[#818894]">Select this option if you want to apply different price lists for each line item.</p>
          </>}
        </div>
        {/* Composite Items */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
            <p className="font-bold ">Composite Items</p>
            <div className='flex items-center space-x-2 mt-3'>
          <input onChange={(e)=>setEnableCheckBox({...enableCheckBox,compositeItems:e.target.checked})} type="checkbox" id='customCheckbox' />
          <label >Enable Composite Items</label>
          </div>
        </div>
        {/* Advanced Inventory Tracking */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
            <p className="font-bold ">Advanced Inventory Tracking </p>
            <div className='flex items-center space-x-2 mt-3'>
          <input onChange={(e)=>setEnableCheckBox({...enableCheckBox,preventStock:e.target.checked})} type="checkbox" id='customCheckbox' />
          <label >Prevent stock from going below zero</label>
            </div>
            <div className='flex items-center space-x-2 mt-3'>
          <input onChange={(e)=>setEnableCheckBox({...enableCheckBox,showOutOfStock:e.target.checked})} type="checkbox" id='customCheckbox' />
          <label >Show an Out of Stock warning when an item's stock drops below zero </label>
            </div>
            <div className='flex items-center space-x-2 mt-3'>
          <input onChange={(e)=>setEnableCheckBox({...enableCheckBox,quantityReachesReorderPoint:e.target.checked})} type="checkbox" id='customCheckbox' />
          <label >Notify me if an item's quantity reaches the reorder point</label>
          
            </div>
            {enableCheckBox.quantityReachesReorderPoint&&<div className="mt-2 space-y-2">
          <p>Notify To</p>
          <div className="relative w-[286px] mt-2">
                <select
                  name="state"
                  id="state"
                  className="block appearance-none w-full text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">aneetasolaman@cygnoz</option>

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
          </div>}
            <div className='flex items-center space-x-2 mt-3'>
          <input onChange={(e)=>setEnableCheckBox({...enableCheckBox,trackLandedCost:e.target.checked})} type="checkbox" id='customCheckbox' />
          <label >Track landed cost on items</label>
            </div>
        </div>
        <Button
            variant="primary"
            className='h-[38px] w-[120px] flex justify-center float-end'
          >
            <p className='text-sm'>Save</p>
          </Button>
      </div>
    </div>
  );
}

export default Items;
