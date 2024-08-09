import BookIcon from "../../../../assets/icons/BookIcon";
import { useState } from "react";
import TaxRateVatTable from "./TaxRateVatTable";
import CreateNewTaxVat from "./CreateNewTaxVat";

type Props = {}

function TaxRateVat({}: Props) {
    const TaxFilter = [
        {
          icon: <BookIcon color="#585953" />,
          title: "All",
        }
      ];
      const [selected, setSelected] = useState("All");
  return (
    <div>
        <div className="flex justify-between">
                <p className="text-textColor font-bold">Tax Rate</p>
                <div className="flex gap-4">
                   <CreateNewTaxVat/>
                </div>
            </div>

            <div className="bg-white rounded-lg p-6 mt-3">
            <div className="flex gap-3 justify-start">
                 {TaxFilter.map((customer) => (
                   <button
                     key={customer.title}
                     onClick={() => setSelected(customer.title)}
                     className={`flex items-center gap-2 p-2 w-[19%] justify-center  rounded ${
                       selected === customer.title ? "bg-WhiteIce" : "bg-white"
                     }`}
                     style={{ border: "1px solid #DADBDD" }}
                   >
                     {customer.icon}
                     <span
                       style={{ color: "#4B5C79", fontSize: "12px", fontWeight: "600" }}
                     >
                       {customer.title}
                     </span>
                   </button>
                 ))}
               </div>
                 <div className="mt-3">
                    <TaxRateVatTable/>
                 </div>
           </div>


    </div>
  )
}

export default TaxRateVat