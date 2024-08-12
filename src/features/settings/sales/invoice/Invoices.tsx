import { useState } from "react";
import CehvronDown from "../../../../assets/icons/CehvronDown";
import Link2 from "../../../../assets/icons/Link2";
import WalletMinimal from "../../../../assets/icons/WalletMinimal";
import Banner from "../../banner/Banner";

type Props = {}

function Invoices({}: Props) {
    const [isInvoiceQR,setIsInvoiceQR]=useState(false)
    const [invoiceURLDropdown,setInvoiceURLDropdown]=useState(false)
    const [selectedRadio, setSelectedRadio] = useState({
        invoiceOrderNumber:"salesOrderNumber"
      });
      const[enableCheckBox,setEnableCheckBox]=useState({
        editingOfSentInvoice:false,
        displayExpenseReceipt:false,
        includePaymentReceipt:false,
        zeroValueLineItems:false,
        // applyPriceListLineTimeLevel:false,
        // compositeItems:false,
        // preventStock:false,
        // showOutOfStock:false,
        // quantityReachesReorderPoint:false,
        // trackLandedCost:false 
      })
      
      
  return (
    <div className="m-4 pb-5 text-[#303F58]">
        <Banner />
        <p className="text-[20px] font-bold mt-3">Invoices</p>
        <div className="space-y-4 mt-2">
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
            <div className='flex items-center space-x-2 '>
          <input onChange={(e)=>setEnableCheckBox({...enableCheckBox,editingOfSentInvoice:e.target.checked})} type="checkbox" id='customCheckbox' />
          <label >Allow editing of sent invoice</label>
          </div>
          <div className='flex items-center space-x-2 mt-4'>
          <input onChange={(e)=>setEnableCheckBox({...enableCheckBox,displayExpenseReceipt:e.target.checked})} type="checkbox" id='customCheckbox' />
          <label >Associate and display expenses reciepts in invoice PDF </label>
          </div>
        </div>
        {/* Invoice Order Number */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
        <p className="font-bold ">Invoice Order Number</p>
        <div className="flex gap-1  items-center mt-3">
                <div onClick={() => {
                      setSelectedRadio({...selectedRadio,invoiceOrderNumber:"salesOrderNumber"});
                      // handleInputChange(e);
                    }} className="grid place-items-center cursor-pointer">
                  <input
                    id="salesOrderNumber"
                    type="radio"
                    name="invoiceOrderNumber"
                    value="salesOrderNumber"
                    className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border  ${
                      selectedRadio.invoiceOrderNumber === "salesOrderNumber"
                        ? "border-8 border-neutral-400"
                        : "border-1 border-neutral-400"
                    }`}
                    
                    checked={selectedRadio.invoiceOrderNumber === "salesOrderNumber"}
                  />
                  <div
                    className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                      selectedRadio.invoiceOrderNumber === "salesOrderNumber" ? "bg-neutral-100" : "bg-transparent"
                    }`}
                  />
                </div>
                <label htmlFor="salesOrderNumber" className="text-slate-600">
                  <span >Use Sales Order Number</span> 
                </label>
        </div>
        <div className="flex gap-1  items-center mt-3">
                <div onClick={() => {
                      setSelectedRadio({...selectedRadio,invoiceOrderNumber:"salesOrderReferenceNumber"});
                      // handleInputChange(e);
                    }} className="grid place-items-center cursor-pointer">
                  <input
                    id="salesOrderReferenceNumber"
                    type="radio"
                    name="invoiceOrderNumber"
                    value="salesOrderReferenceNumber"
                    className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border  ${
                      selectedRadio.invoiceOrderNumber === "salesOrderReferenceNumber"
                        ? "border-8 border-neutral-400"
                        : "border-1 border-neutral-400"
                    }`}
                    
                    checked={selectedRadio.invoiceOrderNumber === "salesOrderReferenceNumber"}
                  />
                  <div
                    className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                      selectedRadio.invoiceOrderNumber === "salesOrderReferenceNumber" ? "bg-neutral-100" : "bg-transparent"
                    }`}
                  />
                </div>
                <label htmlFor="salesOrderReferenceNumber" className="text-slate-600">
                  <span >Use Sales Order Reference Number</span> 
                </label>
        </div>
        </div>
        {/* Payments */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
        <p className="font-bold ">Payments</p>
        <div className='flex items-center space-x-2 mt-4'>
          <input onChange={(e)=>setEnableCheckBox({...enableCheckBox,includePaymentReceipt:e.target.checked})} type="checkbox" id='customCheckbox' />
          <label >Associate and display expenses reciepts in invoice PDF </label>
          </div>
        </div>
        {/* Invoice QR Code */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
        <p className="font-bold ">Invoice QR Code</p>
        <div className="bg-[#FEFBF8] rounded-lg p-3 space-y-3">
            <p>Enable and configure the QR code you want to display on the PDF copy of an Invoice. Your customers can scan the QR code using their device to access the URL or other information that you configure.</p>
            <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={isInvoiceQR} onChange={()=>setIsInvoiceQR(!isInvoiceQR)} />
              <div className={`w-9 h-5 rounded-full shadow-inner transition-colors ${isInvoiceQR ? 'bg-checkBox' : 'bg-dropdownBorder'}`}></div>
              <div className={`dot absolute w-3 h-3 bg-white rounded-full top-1 transition-transform ${isInvoiceQR ? 'transform translate-x-full left-2' : 'left-1'}`}></div>
            </div>
            <div className="ml-2 text-textColor font-bold text-sm">{isInvoiceQR ? 'Enabled' : 'Disabled'}</div>
          </label>        
        </div>
        {isInvoiceQR&&
            <div className="grid grid-cols-12 items-center gap-3">
                 <div className="relative col-span-4">
  <label htmlFor="qrCodeType" className="text-slate-600">
    QR Code Type
  </label>
  <div onClick={()=>setInvoiceURLDropdown(!invoiceURLDropdown)} className="relative w-full mt-2 cursor-pointer">
    <p
      id="qrCodeType"
      className={`appearance-none w-full text-slate-600 bg-white   text-sm h-[39px] pl-3 pr-8 rounded-sm leading-tight focus:outline-none border focus:bg-white ${invoiceURLDropdown?'border-darkRed':'border-inputBorder'}  flex items-center`}
    >
      <option className="text-slate-400">Invoice URL</option>
    </p>
    <div  className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ">
      <CehvronDown color="gray" />
    </div>
  </div>

  {/* Custom dropdown items */}
  {invoiceURLDropdown&&<div className="absolute w-full mt-1 bg-white text-[#4B5C79]  rounded-md shadow-lg z-10">
    <div className="flex flex-col p-2 ">
      <div className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b flex border-b-inputBorder space-x-1">
       <p className="mt-[2px]">
       <WalletMinimal color="#4B5C79" size={16}/>
       </p>
       <div className="flex flex-col">
       <p className="font-medium text-slate-700 flex space-x-1 items-center">UPI ID</p>   
        
        <p className="text-xs text-slate-500">
          UPI ID Will be displayed as QR code on invoices
        </p>
       </div>
      </div>
      <div className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b flex border-b-inputBorder space-x-1">
       <p className="mt-[2px]">
       <Link2 size={16} color="#4B5C79" />
       </p>
       <div className="flex flex-col">
       <p className="font-medium text-slate-700 flex space-x-1 items-center">Invoice URL</p>   
        
        <p className="text-xs text-slate-500">
        Lorem ipsum dolor sit amet consectetur. Commodo enim 
        </p>
       </div>
      </div>
      <div className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b flex border-b-inputBorder space-x-1">
       <p className="mt-[2px]">
       <Link2 color="#4B5C79" size={16}/>
       </p>
       <div className="flex flex-col">
       <p className="font-medium text-slate-700 flex space-x-1 items-center">Custom</p>   
        
        <p className="text-xs text-slate-500">
        Lorem ipsum dolor sit amet consectetur. Commodo enim 
        </p>
       </div>
      </div>
    </div>
  </div>}
</div>

            <div className="relative col-span-8 ">
              <label htmlFor="location" className="text-slate-600">
                QR Code Description
              </label>
              <input
                className="pl-3 text-sm w-[100%]  mt-2 rounded-sm text-start bg-white border border-inputBorder h-[39px] p-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                placeholder="Scan the QR code to view the configured information."
                name="addline2"
                // value={inputData.addline2}
                // onChange={handleInputChange}
              />{" "}
            </div>
            </div>
        }
        </div>
        {/* Zero-value line items */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-3">
        <p className="font-bold ">Zero-value line items</p>
        <div className='flex items-center space-x-2 mt-4'>
          <input onChange={(e)=>setEnableCheckBox({...enableCheckBox,zeroValueLineItems:e.target.checked})} type="checkbox" id='customCheckbox' />
          <label >Hide zero-value line items</label>
          </div>
          <div className="bg-[#FEFBF8] rounded-lg p-3 space-y-3">
            <p>Enable and configure the QR code you want to display on the PDF copy of an Invoice. Your customers can scan the QR code using their device to access the URL or other information that you configure.</p>
            </div>
        </div>
        {/* Terms & Condition */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-2">
        <p className="font-bold text-textColor text-sm ">Terms & Condition</p>
        <textarea
          className="w-full h-32 p-3 border focus:outline-none focus:border-[#820000] border-inputBorder rounded-lg resize-none"
        />
        <p className="text-[12px] text-[#8F99A9]">Payment should be pay before due date</p>
        </div>
        {/* Terms & Condition */}
        <div className="bg-white  w-full p-6 text-[14px] rounded-lg space-y-2">
        <p className="font-bold text-textColor text-sm ">Customer Notes</p>
        <textarea
          className="w-full h-32 p-3 border focus:outline-none focus:border-[#820000] border-inputBorder rounded-lg resize-none"
        />
        <p className="text-[12px] text-[#8F99A9]">Thank you for your payment.You just made our day</p>
        </div>
        </div>
    </div>
  )
}

export default Invoices