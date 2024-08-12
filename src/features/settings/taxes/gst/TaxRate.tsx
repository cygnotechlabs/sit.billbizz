import BookIcon from "../../../../assets/icons/BookIcon";
import BookXIcon from "../../../../assets/icons/BookXIcon";
import NewspaperIcon from "../../../../assets/icons/NewspaperIcon";
import OpenedBookIcon from "../../../../assets/icons/OpenedBookIcon";
import { useState } from "react";
import TaxRateTable from "./TaxRateTable";
import CreateNewTax from "./CreateNewTaxGst";

type Props = {}

function TaxRate({ }: Props) {
    const TaxFilter = [
        {
          icon: <BookIcon color="#585953" />,
          title: "All",
        },
        {
          icon: <OpenedBookIcon color="#585953" />,
          title: "Active",
        },
        {
          icon: <BookXIcon color="#585953" />,
          title: "Inactive",
        },
        {
          icon: <NewspaperIcon color="#585953" />,
          title: "Expired",
        },
      ];
      const [selected, setSelected] = useState("All");
    return (
        <div>
            <div className="flex justify-between">
                <p className="text-textColor font-bold">Tax Rate</p>
                <div className="flex gap-4">
                 <CreateNewTax/>
                </div>
            </div>


            <div className="bg-white rounded-lg p-6 mt-3">
            <div className="flex gap-3 justify-between">
                 {TaxFilter.map((customer) => (
                   <button
                     key={customer.title}
                     onClick={() => setSelected(customer.title)}
                     className={`flex items-center gap-2 p-2 w-[100%] justify-center  rounded ${
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
                 <TaxRateTable/>
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
                style={{
                  color: "#4B5C79",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {customer.title}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-3">
          <TaxRateTable />
        </div>
      </div>
    </div>
  );
}

export default TaxRate;
