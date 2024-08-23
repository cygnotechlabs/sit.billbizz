import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Banner from "../banner/Banner";
import { endponits } from "../../../Services/apiEndpoints";
import useApi from "../../../Hooks/useApi";
import Button from "../../../Components/Button";

type Props = {};

function PurchaseOrders({}: Props) {
  const initialPurchaseOrder = {
    organizationId: "INDORG0001",
    purchaseOrderClose: "",
    purchaseTC: "",
    purchaseNote: "",
  };

  const [purchaseOrderData, setPurchaseOrderData] = useState(initialPurchaseOrder);
console.log(purchaseOrderData);

  const { request: fetchPurchaseOrderSettings } = useApi("put", 5004);
  const { request: savePurchaseOrderSettings } = useApi("put", 5005);

  useEffect(() => {
    const fetchAllSettings = async () => {
      try {
        const url = `${endponits.GET_SETTINGS}`;
        const body = { organizationId: purchaseOrderData.organizationId };
        const { response, error } = await fetchPurchaseOrderSettings(url, body);
        
        if (!error && response) {
          const settings = response.data[0];
          const { purchaseOrderClose, purchaseTC, purchaseNote } = settings;
          console.log("purchaseOrderClose:", purchaseOrderClose);
          setPurchaseOrderData({
            ...purchaseOrderData,
            purchaseOrderClose: purchaseOrderClose || "",
            purchaseTC: purchaseTC || "",
            purchaseNote: purchaseNote || "",
          });
        } else {
          console.error("Error:", error);
        }
      } catch (error) {
        console.error("Error fetching purchase order settings:", error);
      }
    };
  
    fetchAllSettings();
  }, []);
  

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setPurchaseOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setPurchaseOrderData((prevData) => ({
      ...prevData,
      purchaseOrderClose: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${endponits.ADD_PURCHASE_ORDER_SETTINGS}`;
      const { response, error } = await savePurchaseOrderSettings(url, purchaseOrderData);
      if (!error && response) {
        toast.success("Purchase order settings saved successfully!");
      } else {
        toast.error("Failed to save purchase order settings.");
      }
    } catch (error) {
      console.error("Error saving purchase order settings:", error);
      toast.error("An error occurred while saving the settings.");
    }
  };

  return (
    <div className="p-5">
      <Banner />

      <p className="text-textColor font-bold mt-4">Purchase Orders</p>
      <div className="p-6 rounded-lg bg-white mt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Closure Option Radio Buttons */}
          <div className="mt-4 p-6 rounded-lg bg-white">
            <p className="font-semibold text-sm text-textColor mb-3">
              When do you want your Purchase Orders to be closed?
            </p>
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="purchaseOrderClose"
                  className="accent-[#97998E] bg-white h-5 w-5 mr-2"
                  checked={purchaseOrderData.purchaseOrderClose === "When a Purchase Receive is recorded"}
                  onChange={() => handleRadioChange("When a Purchase Receive is recorded")}
                  id="receiveRadio"
                />
                <label htmlFor="receiveRadio" className="text-textColor text-sm">
                  When a Purchase Receive is recorded
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="purchaseOrderClose"
                  className="accent-[#97998E] bg-white h-5 w-5 mr-2"
                  checked={purchaseOrderData.purchaseOrderClose === "When a Bill is created"}
                  onChange={() => handleRadioChange("When a Bill is created")}
                  id="billRadio"
                />
                <label htmlFor="billRadio" className="text-textColor text-sm">
                  When a Bill is created
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="purchaseOrderClose"
                  className="accent-[#97998E] bg-white h-5 w-5 mr-2"
                  checked={purchaseOrderData.purchaseOrderClose === "When Receives and Bills are recorded"}
                  onChange={() => handleRadioChange("When Receives and Bills are recorded")}
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
            <textarea
              name="purchaseTC"
              className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none"
              value={purchaseOrderData.purchaseTC}
              onChange={handleChange}
              placeholder="Enter terms and conditions"
            />
          </div>

          {/* Notes */}
          <div className="mt-4 p-6 rounded-lg bg-white">
            <p className="font-bold text-textColor text-sm mb-3">Notes</p>
            <textarea
              name="purchaseNote"
              className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none"
              value={purchaseOrderData.purchaseNote}
              onChange={handleChange}
              placeholder="Enter any notes"
            />
          </div>

          {/* Save Button */}
          <div className="mt-4 flex justify-end">
            <Button variant="primary" type="submit" className="pl-10 pr-10 h-[38px] text-sm" size="sm">
              Save
            </Button>
          </div>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default PurchaseOrders;
