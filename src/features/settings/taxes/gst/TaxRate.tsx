import BookIcon from "../../../../assets/icons/BookIcon";
import BookXIcon from "../../../../assets/icons/BookXIcon";
import NewspaperIcon from "../../../../assets/icons/NewspaperIcon";
import OpenedBookIcon from "../../../../assets/icons/OpenedBookIcon";
import PlusCircle from "../../../../assets/icons/PlusCircle"
import Button from "../../../../Components/Button"
import { useState } from "react";
import TaxRateTable from "./TaxRateTable";

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
        {
          icon: <NewspaperIcon color="#585953" />,
          title: "Tax Group",
        },
    
      ];
      const [selected, setSelected] = useState("All");
    return (
        <div>
            <div className="flex justify-between">
                <p className="text-textColor font-bold">Tax Rate</p>
                <div className="flex gap-4">
                    <Button variant="secondary" className="text-sm font-medium" size="sm"><PlusCircle color="#565148" /> New Tax Group</Button>
                    <Button  className="text-sm font-medium" size="sm"><PlusCircle color="white" /> New Tax</Button>
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
                 <TaxRateTable/>
                 </div>
           </div>


        </div>
    )
}

export default TaxRate