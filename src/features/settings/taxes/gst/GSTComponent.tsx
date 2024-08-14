import { useState } from "react";
import TaxRate from "./TaxRate";
import GstSettings from "./GstSettings";
import Banner from "../../banner/Banner";


type Props = {}

function GSTComponent({}: Props) {
  const [selectedTab, setSelectedTab] = useState<string>("taxRate");

  return (
    <div className="p-5">
      <Banner/>
      <div className="mt-5 flex gap-7 rounded-[40px] bg-[#EAEBEB] p-3">
        <button
          className={`px-4 py-2 rounded-[40px] text-sm  ${
            selectedTab === "taxRate" ? "bg-white font-bold text-textColor" : "text-[#585953] font-semibold"
          }`}
          onClick={() => setSelectedTab("taxRate")}
        >
          Tax Rate
        </button>
        <button
          className={`px-4 py-2  rounded-[40px] text-sm  ${
            selectedTab === "gstSettings" ? "bg-white font-bold  text-textColor" : "text-[#585953] font-semibold"
          }`}
          onClick={() => setSelectedTab("gstSettings")}
        >
          GST Settings
        </button>
      </div>

      <div className="mt-4">
        {selectedTab === "taxRate" ? <TaxRate /> : <GstSettings/>}
      </div>
    </div>
  );
}

export default GSTComponent;
