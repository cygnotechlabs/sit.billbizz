import { useState } from "react";
import Button from "../../../../Components/Button";
import Banner from "../../banner/Banner";

type Props = {};

function CreditNotes({}: Props) {
  const [overrideCostPrice, setOverrideCostPrice] = useState(false);
  const [qrCodeEnabled, setQrCodeEnabled] = useState(false);
  const [recordLockingEnabled, setRecordLockingEnabled] = useState(false);

  return (
    <div className="p-5">
      <Banner />
      <p className="text-textColor font-bold text-xl mt-4">Credit Notes</p>

      {/* Cost Price Preference */}
      <div className="mt-4 p-6 rounded-lg bg-white">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="accent-[#97998E] bg-white h-5 w-5 mr-2"
            checked={overrideCostPrice}
            onChange={() => setOverrideCostPrice(!overrideCostPrice)}
            id="overrideCostPriceCheckbox"
          />
          <label
            htmlFor="overrideCostPriceCheckbox"
            className="text-textColor text-sm"
          >
            Allow users to override cost prices in credit notes
          </label>
        </div>
        <p className="text-sm text-textColor mt-2">
          Mark this option to allow users to manually edit and update the cost
          price that is fetched from the recent transaction. Once you override
          the cost price, the latest cost price will not be updated based on the
          recent transaction.
        </p>
      </div>

      {/* QR Code Toggle */}
      <div className="mt-4 p-6 rounded-lg bg-white">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm text-textColor">
            Credit Note QR Code
          </p>
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={qrCodeEnabled}
              onChange={() => setQrCodeEnabled(!qrCodeEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 border-2 border-gray peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-textColor">
              {qrCodeEnabled ? "Enabled" : "Disabled"}
            </span>
          </label>
        </div>
        <p className="text-sm text-textColor mt-2">
          Enable and configure the QR code you want to display on the PDF copy
          of an Credit Note. Your customers can scan the QR code using their
          device to access the URL or other information that you configure.
        </p>
      </div>

      {/* Record Locking Toggle */}
      <div className="mt-4 p-6 rounded-lg bg-white">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm text-textColor">Record Locking</p>
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={recordLockingEnabled}
              onChange={() => setRecordLockingEnabled(!recordLockingEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 border-2 border-gray peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm text-textColor">
              {recordLockingEnabled ? "Enabled" : "Disabled"}
            </span>
          </label>
        </div>
        <p className="text-sm text-textColor mt-2">
          Record locking helps you control who can make changes to certain
          records within your organization. This can be useful if you want to
          protect important information or prevent accidental changes from being
          made. When you lock a record, only users with permission to edit
          locked records will be able to edit or delete it.
        </p>
      </div>

      {/* Terms & Condition */}
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

export default CreditNotes;
