import { useState } from "react";
import Button from "../../../../Components/Button";
import Banner from "../../banner/Banner";

type Props = {};

function CreditNotes({}: Props) {
  const [overrideCostPrice, setOverrideCostPrice] = useState(false);
  const [qrCodeEnabled, setQrCodeEnabled] = useState(false);
  const [recordLockingEnabled, setRecordLockingEnabled] = useState(false);

  return (
    <div className="p-5 text-[#303F58]">
      <Banner />
      <p className="  font-bold text-xl mt-4">Credit Notes</p>

      {/* Cost Price Preference */}
      <div className="mt-4 p-6 rounded-lg bg-white space-y-2">
        <p className="font-semibold text-sm">Cost Price Preference</p>
        <div className="flex items-start">
          <input
            type="checkbox"
            className="accent-[#97998E] bg-white h-5 w-5 mr-2 mt-1 shrink-0"
            checked={overrideCostPrice}
            onChange={() => setOverrideCostPrice(!overrideCostPrice)}
            id="customCheckbox"
          />
          <div className="flex-1">
            <label htmlFor="customCheckbox" className="text-sm font-medium">
              Allow users to override cost prices in credit notes
            </label>
            <p className="text-sm mt-1">
              Mark this option to allow users to manually edit and update the
              cost price that is fetched from the recent transaction. Once you
              override the cost price, the latest cost price will not be updated
              based on the recent transaction.
            </p>
          </div>
        </div>
      </div>

      {/* QR Code Toggle */}
      <div className="mt-4 p-6 rounded-lg bg-white space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm  ">Credit Note QR Code</p>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={qrCodeEnabled}
                onChange={() => setQrCodeEnabled(!qrCodeEnabled)}
              />
              <div
                className={`w-9 h-5 rounded-full shadow-inner transition-colors ${
                  qrCodeEnabled ? "bg-checkBox" : "bg-dropdownBorder"
                }`}
              ></div>
              <div
                className={`dot absolute w-3 h-3 bg-white rounded-full top-1 transition-transform ${
                  qrCodeEnabled ? "transform translate-x-full left-2" : "left-1"
                }`}
              ></div>
            </div>
            <div className="ml-2   font-semibold text-sm">
              {qrCodeEnabled ? "Enabled" : "Disabled"}
            </div>
          </label>
        </div>
        <div className="bg-[#FEFBF8] rounded-lg p-3 space-y-3">
          <p className="text-sm   ">
            Enable and configure the QR code you want to display on the PDF copy
            of an Credit Note. Your customers can scan the QR code using their
            device to access the URL or other information that you configure.
          </p>
        </div>
      </div>
       
      {/* Record Locking Toggle */}
      <div className="mt-4 p-6 rounded-lg bg-white space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm  ">Record Locking</p>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={recordLockingEnabled}
                onChange={() => setRecordLockingEnabled(!recordLockingEnabled)}
              />
              <div
                className={`w-9 h-5 rounded-full shadow-inner transition-colors ${
                  recordLockingEnabled ? "bg-checkBox" : "bg-dropdownBorder"
                }`}
              ></div>
              <div
                className={`dot absolute w-3 h-3 bg-white rounded-full top-1 transition-transform ${
                  recordLockingEnabled
                    ? "transform translate-x-full left-2"
                    : "left-1"
                }`}
              ></div>
            </div>
            <div className="ml-2   font-semibold text-sm">
              {recordLockingEnabled ? "Enabled" : "Disabled"}
            </div>
          </label>
        </div>
        <div className="bg-[#FEFBF8] rounded-lg p-3 space-y-3">
          <p className="text-sm  ">
            Record locking helps you control who can make changes to certain
            records within your organization. This can be useful if you want to
            protect important information or prevent accidental changes from
            being made. When you lock a record, only users with permission to
            edit locked records will be able to edit or delete it.
          </p>
        </div>
      </div>

      {/* Terms & Condition */}
      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-semibold   text-sm mb-3">Terms & Condition</p>
        <textarea className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#7E0D0B]" />
      </div>

      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-semibold  text-sm mb-3">Customer Notes</p>
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

export default CreditNotes;
