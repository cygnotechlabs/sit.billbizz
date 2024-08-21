import Button from "../../../../Components/Button";
import Banner from "../../banner/Banner";
import { useState } from "react";

type Props = {};

function SalesOrder({}: Props) {
  // Define the state with default values
  const [salesOrderState, setSalesOrderState] = useState({
    salesOrderAddress: false,
    salesOrderCustomerNote: false,
    salesOrderTermsCondition: false,
    salesOrderClose: "invoice",
    restrictSalesOrderClose: false,
    termCondition: "",
    customerNote: "",
  });

  // Generic function to handle input changes
  const handleInputChange = (field: string, value: any) => {
    setSalesOrderState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  console.log(salesOrderState);
  
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
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"  id="customCheckbox"
              checked={salesOrderState.salesOrderAddress}
              onChange={(e) =>
                handleInputChange("salesOrderAddress", e.target.checked)
              }
            />
            <label className="text-textColor text-sm">Address</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"  id="customCheckbox"
              checked={salesOrderState.salesOrderCustomerNote}
              onChange={(e) =>
                handleInputChange("salesOrderCustomerNote", e.target.checked)
              }
            />
            <label className="text-textColor text-sm">Customer Notes</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"  id="customCheckbox"
              checked={salesOrderState.salesOrderTermsCondition}
              onChange={(e) =>
                handleInputChange("salesOrderTermsCondition", e.target.checked)
              }
            />
            <label className="text-textColor text-sm">Terms & Conditions</label>
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
          <div className="flex items-center">
            <div
              onClick={() => handleInputChange("salesOrderClose", "invoice")}
              className="grid place-items-center cursor-pointer"
            >
              <input
                id="invoice"
                type="radio"
                name="reportBasis"
                value="invoice"
                className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border  ${
                  salesOrderState.salesOrderClose === "invoice"
                    ? "border-8 border-neutral-400"
                    : "border-1 border-neutral-400"
                }`}
                checked={salesOrderState.salesOrderClose === "invoice"}
              />
              <div
                className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                  salesOrderState.salesOrderClose === "invoice"
                    ? "bg-neutral-100"
                    : "bg-transparent"
                }`}
              />
            </div>
            <label className="text-textColor text-sm ml-2">
              When invoice is created
            </label>
          </div>

          {/* Radio Button - When shipment is fulfilled */}
          <div className="flex items-center">
            <div
              onClick={() => handleInputChange("salesOrderClose", "shipment")}
              className="grid place-items-center cursor-pointer"
            >
              <input
                id="shipment"
                type="radio"
                name="reportBasis"
                value="shipment"
                className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border  ${
                  salesOrderState.salesOrderClose === "shipment"
                    ? "border-8 border-neutral-400"
                    : "border-1 border-neutral-400"
                }`}
                checked={salesOrderState.salesOrderClose === "shipment"}
              />
              <div
                className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                  salesOrderState.salesOrderClose === "shipment"
                    ? "bg-neutral-100"
                    : "bg-transparent"
                }`}
              />
            </div>
            <label className="text-textColor text-sm ml-2">
              When shipment is fulfilled
            </label>
          </div>

          {/* Radio Button - When shipment and invoice are fulfilled */}
          <div className="flex items-center">
            <div
              onClick={() =>
                handleInputChange("salesOrderClose", "shipmentInvoice")
              }
              className="grid place-items-center cursor-pointer"
            >
              <input
                id="shipmentInvoice"
                type="radio"
                name="reportBasis"
                value="shipmentInvoice"
                className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border  ${
                  salesOrderState.salesOrderClose === "shipmentAndInvoice"
                    ? "border-8 border-neutral-400"
                    : "border-1 border-neutral-400"
                }`}
                checked={
                  salesOrderState.salesOrderClose === "shipmentInvoice"
                }
              />
              <div
                className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                  salesOrderState.salesOrderClose === "shipmentInvoice"
                    ? "bg-neutral-100"
                    : "bg-transparent"
                }`}
              />
            </div>
            <label className="text-textColor text-sm ml-2">
              When shipment is fulfilled and invoice is created
            </label>
          </div>

          {/* Checkbox - Restrict closed sales orders from being edited */}
          <div className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"  id="customCheckbox"
              name="closureOption"
              value="restrict"
              className="accent-[#97998E] bg-white h-5 w-5 mr-2"
              checked={salesOrderState.restrictSalesOrderClose}
              onChange={(e) =>
                handleInputChange(
                  "restrictSalesOrderClose",
                  e.target.checked
                )
              }
            />
            <label className="text-textColor text-sm">
              Restrict closed sales orders from being edited
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-bold text-textColor text-sm mb-3">
          Terms & Condition
        </p>
        <textarea
          className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#7E0D0B]"
          value={salesOrderState.termCondition}
          onChange={(e) =>
            handleInputChange("termCondition", e.target.value)
          }
        />
      </div>

      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-bold text-textColor text-sm mb-3">Customer Notes</p>
        <textarea
          className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#7E0D0B]"
          value={salesOrderState.customerNote}
          onChange={(e) =>
            handleInputChange("customerNote", e.target.value)
          }
        />
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
