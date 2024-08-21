import Button from "../../../../Components/Button";
import Banner from "../../banner/Banner";
import { useState } from "react";

type Props = {};

function SalesOrder({}: Props) {
  const [selectedFields, setSelectedFields] = useState({
    address: true,
    customerNotes: false,
    termsAndConditions: false,
  });

  const [closureOption, setClosureOption] = useState("invoice");

  return (
    <div className="p-5">
      <Banner />
      <p className="text-textColor font-bold text-xl mt-4">Sales Order</p>

      {/* Checkbox Group for Updating Fields */}
      <div className="mt-4 p-6 rounded-lg bg-white">
  <p className="font-semibold text-dropdownText text-sm mb-3">
    Which of the following fields of Sales Orders do you want to update in
    the respective Invoices?
  </p>
  <div className="flex flex-col space-y-3">
    <div className="flex items-center  space-x-2">
      <input
        type="checkbox"
        id="customCheckbox"
        checked={selectedFields.address}
        onChange={() =>
          setSelectedFields({
            ...selectedFields,
            address: !selectedFields.address,
          })
        }
      />
      <label htmlFor="addressCheckbox" className="text-textColor text-sm">
        Address
      </label>
    </div>
    <div className="flex items-center  space-x-2">
      <input
        type="checkbox"
        id="customCheckbox"
        checked={selectedFields.customerNotes}
        onChange={() =>
          setSelectedFields({
            ...selectedFields,
            customerNotes: !selectedFields.customerNotes,
          })
        }
      />
      <label
        htmlFor="customerNotesCheckbox"
        className="text-textColor text-sm"
      >
        Customer Notes
      </label>
    </div>
    <div className="flex items-center  space-x-2">
      <input
        type="checkbox"
        id="customCheckbox"
        checked={selectedFields.termsAndConditions}
        onChange={() =>
          setSelectedFields({
            ...selectedFields,
            termsAndConditions: !selectedFields.termsAndConditions,
          })
        }
      />
      <label
        htmlFor="termsConditionsCheckbox"
        className="text-textColor text-sm"
      >
        Terms & Conditions
      </label>
    </div>
  </div>
</div>

{/* Radio Buttons for Sales Order Closure */}
<div className="mt-4 p-6 rounded-lg bg-white">
  <p className="font-semibold text-dropdownText text-sm mb-3">
    When do you want your Sales Orders to be closed?
  </p>
  <div className="flex flex-col space-y-3">
    {/* Radio Button - When invoice is created */}
    <div className=" flex items-center">
    <div onClick={() => {
                      setClosureOption("invoice");
                      // handleInputChange(e);
                    }} className="grid place-items-center cursor-pointer">
                  <input
                    id="invoice"
                    type="radio"
                    name="reportBasis"
                    value="invoice"
                    className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border  ${
                      closureOption === "invoice"
                        ? "border-8 border-neutral-400"
                        : "border-1 border-neutral-400"
                    }`}
                    
                    checked={ closureOption === "invoice"}
                  />
                  <div
                    className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                      closureOption === "invoice" ? "bg-neutral-100" : "bg-transparent"
                    }`}
                  />
                     
    </div>
    <label htmlFor="invoiceRadio" className="text-textColor text-sm ml-2">
        When invoice is created
      </label>
    </div>

    {/* Radio Button - When shipment is fulfilled */}
    <div className=" flex items-center">
    <div onClick={() => {
                      setClosureOption("shipment");
                      // handleInputChange(e);
                    }} className="grid place-items-center cursor-pointer">
                  <input
                    id="shipment"
                    type="radio"
                    name="reportBasis"
                    value="shipment"
                    className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border  ${
                      closureOption === "shipment"
                        ? "border-8 border-neutral-400"
                        : "border-1 border-neutral-400"
                    }`}
                    
                    checked={ closureOption === "shipment"}
                  />
                  <div
                    className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                      closureOption === "shipment" ? "bg-neutral-100" : "bg-transparent"
                    }`}
                  />
                     
    </div>
    <label htmlFor="invoiceRadio" className="text-textColor text-sm ml-2">
        When shipment is fulfilled
      </label>
    </div>

    {/* Radio Button - When shipment and invoice are fulfilled */}
    <div className=" flex items-center">
    <div onClick={() => {
                      setClosureOption("shipmentInvoice");
                      // handleInputChange(e);
                    }} className="grid place-items-center cursor-pointer">
                  <input
                    id="shipmentInvoice"
                    type="radio"
                    name="reportBasis"
                    value="shipmentInvoice"
                    className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border  ${
                      closureOption === "shipmentInvoice"
                        ? "border-8 border-neutral-400"
                        : "border-1 border-neutral-400"
                    }`}
                    
                    checked={ closureOption === "shipmentInvoice"}
                  />
                  <div
                    className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                      closureOption === "shipmentInvoice" ? "bg-neutral-100" : "bg-transparent"
                    }`}
                  />
                     
    </div>
    <label htmlFor="invoiceRadio" className="text-textColor text-sm ml-2">
        When shipment is fulfilled and invoice is created
      </label>
    </div>

    {/* Checkbox - Restrict closed sales orders from being edited */}
    <div className="flex items-center mb-2 cursor-pointer">
      <input
        id="customCheckbox"
        type="checkbox"
        name="closureOption"
        value="restrict"
        className="accent-[#97998E] bg-white h-5 w-5 mr-2"
        checked={closureOption === "restrict"}
        onChange={() => setClosureOption("restrict")}
      />
      <label htmlFor="restrictRadio" className="text-textColor text-sm">
        Restrict closed sales orders from being edited
      </label>
    </div>
  </div>
</div>








      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-bold text-textColor text-sm mb-3">
          Terms & Condition
        </p>
        <textarea className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#7E0D0B]" />
      </div>

      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-bold text-textColor text-sm mb-3">Customer Notes</p>
        <textarea className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#7E0D0B]" />
      </div>

      {/* Save Button */}
      <div className="mt-4 flex justify-end">
        <Button size="sm" className="text-sm  pl-10 pr-10">
          Save
        </Button>
      </div>
    </div>
  );
}

export default SalesOrder;
