

import Pen from "../../../../assets/icons/Pen";
import TrashCan from "../../../../assets/icons/TrashCan";
import { Link } from "react-router-dom";


 
type Props = {};
 
const CustomerTable = ({}: Props) => {
  const tableHeaders = ["Name", "Symbol", "Actions"];
 
  const tableData = [
    {
      name: "AED-UAE Dirham",
      symbol: "AED",
    },
    {
      name: "AUD-Australian Dollar",
      symbol: "AUD",
    },
    {
      name: "CAD-Canadian Dollar",
      symbol: "CAD",
    },
    {
      name: "EUR-Euro",
      symbol: "EUR",
    },
    {
      name: "INR-Indian Rupee",
      symbol: "INR",
    },
  ];
 
  return (
    <div className="space-y-4">
      <div className="flex text-dropdownText gap-4">
        
        <div className="relative border-2 border-slate-200 flex rounded-md px-2 py-1 text-sm items-center"></div>
      </div>
 
      <div>
        <table className="min-w-full bg-white mb-5">
          <thead className="text-[12px] w-full text-center text-dropdownText sticky bg-red-500">
            <tr style={{ backgroundColor: "#F9F7F0" }}>
             
              {tableHeaders.map((heading, index) => (
                <th
                  className="py-2 px-4 font-medium border-b border-tableBorder"
                  key={index}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-dropdownText text-center text-[13px]">
            {tableData.map((item, index) => (
              <tr className="relative" key={index}>
                
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <Link to={"/expense/view"}>{item.name}</Link>
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  {item.symbol}
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <div className="flex justify-center gap-2">
                  <div className="h-[26px] justify-start items-start inline-flex">
<div className="#fefdfa">
<div className="#565148 border px-[10px] py-1 rounded-lg" ><Link to="/settings/currencies/exchange-rates">View Exchange Rate</Link></div>
</div>
</div>
                    <Pen color={"blue"} /> <TrashCan color={"red"} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default CustomerTable;