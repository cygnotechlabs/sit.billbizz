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
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              className="accent-[#97998E] bg-white h-5 w-5 mr-2"
              checked={selectedFields.address}
              onChange={() =>
                setSelectedFields({
                  ...selectedFields,
                  address: !selectedFields.address,
                })
              }
              id="addressCheckbox"
            />
            <label htmlFor="addressCheckbox" className="text-textColor text-sm">
              Address
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              className="accent-[#97998E] bg-white h-5 w-5 mr-2"
              checked={selectedFields.customerNotes}
              onChange={() =>
                setSelectedFields({
                  ...selectedFields,
                  customerNotes: !selectedFields.customerNotes,
                })
              }
              id="customerNotesCheckbox"
            />
            <label
              htmlFor="customerNotesCheckbox"
              className="text-textColor text-sm"
            >
              Customer Notes
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              className="accent-[#97998E] bg-white h-5 w-5 mr-2"
              checked={selectedFields.termsAndConditions}
              onChange={() =>
                setSelectedFields({
                  ...selectedFields,
                  termsAndConditions: !selectedFields.termsAndConditions,
                })
              }
              id="termsConditionsCheckbox"
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
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="closureOption"
              className="accent-[#97998E] bg-white h-5 w-5 mr-2"
              checked={closureOption === "invoice"}
              onChange={() => setClosureOption("invoice")}
              id="invoiceRadio"
            />
            <label htmlFor="invoiceRadio" className="text-textColor text-sm">
              When invoice is created
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="closureOption"
              className="accent-[#97998E] bg-white h-5 w-5 mr-2"
              checked={closureOption === "shipment"}
              onChange={() => setClosureOption("shipment")}
              id="shipmentRadio"
            />
            <label htmlFor="shipmentRadio" className="text-textColor text-sm">
              When shipment is fulfilled
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="closureOption"
              className="accent-[#97998E] bg-white h-5 w-5 mr-2"
              checked={closureOption === "shipmentInvoice"}
              onChange={() => setClosureOption("shipmentInvoice")}
              id="shipmentInvoiceRadio"
            />
            <label
              htmlFor="shipmentInvoiceRadio"
              className="text-textColor text-sm"
            >
              When shipment is fulfilled and invoice is created
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="closureOption"
              className="accent-[#97998E] bg-white h-5 w-5 mr-2"
              checked={closureOption === "restrict"}
              onChange={() => setClosureOption("restrict")}
              id="restrictRadio"
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
        <textarea className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none" />
      </div>

      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-bold text-textColor text-sm mb-3">Customer Notes</p>
        <textarea className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none" />
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
