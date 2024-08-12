import { useState } from "react";
import Button from "../../../Components/Button";
import Banner from "../banner/Banner";

type Props = {};

function PurchaseOrders({}: Props) {
  const [closureOption, setClosureOption] = useState("receive");

  return (
    <div className="p-5">
      <Banner />
      <p className="text-textColor font-bold text-xl mt-4">Purchase Orders</p>

      {/* Closure Option Radio Buttons */}
      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-semibold text-sm text-textColor mb-3">
          When do you want your Purchase Orders to be closed?
        </p>
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="closureOption"
              className="accent-[#97998E] bg-white h-5 w-5 mr-2"
              checked={closureOption === "receive"}
              onChange={() => setClosureOption("receive")}
              id="receiveRadio"
            />
            <label htmlFor="receiveRadio" className="text-textColor text-sm">
              When a Purchase Receive is recorded
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="closureOption"
              className="accent-[#97998E] bg-white h-5 w-5 mr-2"
              checked={closureOption === "bill"}
              onChange={() => setClosureOption("bill")}
              id="billRadio"
            />
            <label htmlFor="billRadio" className="text-textColor text-sm">
              When a Bill is created
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="closureOption"
              className="accent-[#97998E] bg-white h-5 w-5 mr-2"
              checked={closureOption === "receiveBill"}
              onChange={() => setClosureOption("receiveBill")}
              id="receiveBillRadio"
            />
            <label
              htmlFor="receiveBillRadio"
              className="text-textColor text-sm"
            >
              When Receives and Bills are recorded
            </label>
          </div>
        </div>
      </div>

      {/* Terms & Condition */}
      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-bold text-textColor text-sm mb-3">
          Terms & Condition
        </p>
        <textarea className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none" />
      </div>

      {/* Notes */}
      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-bold text-textColor text-sm mb-3">Notes</p>
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

export default PurchaseOrders;
