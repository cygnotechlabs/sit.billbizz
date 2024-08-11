import Pen from "../../../../assets/icons/Pen";
import TrashCan from "../../../../assets/icons/TrashCan";
import { Link } from "react-router-dom";
 
 
 
type Props = {};
 
const CurrencyTable = ({}: Props) => {
  const tableHeaders = ["Name", "Symbol", "Actions"];
 
  const tableData = [
    {
      base:false,
      name: "AED-UAE Dirham",
      symbol: "AED",
    },
    {
      base:false,
      name: "AUD-Australian Dollar",
      symbol: "$",
    },
    {
      base:false,
      name: "CAD-Canadian Dollar",
      symbol: "$",
    },
    {
      base:false,
      name: "EUR-Euro",
      symbol: "EUR",
    },
    {
      base:true,
      name: "INR-Indian Rupee",
      symbol: "INR",
    },
  ];
 
  return (
    <div className="space-y-4 pt-2 ">
      <div >
        <table className="min-w-full bg-white mb-5 ">
          <thead className="text-[12px] w-full text-center  text-dropdownText sticky bg-red-500">
            <tr style={{ backgroundColor: "#F9F7F0",height:"44px" }}>
             
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
              <tr className="relative " key={index}>
               
                <td className="py-4 px-4 border-y border-tableBorder">
                  <Link to={"/expense/view"}>
                  <p >{item.name} {item.base&&<span className="px-2 py-1 bg-[#6FC7A2] text- text-white">Base Currency</span>}</p>
                  </Link>
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  {item.symbol=="EUR"?<p>&euro;</p>:item.symbol=="INR"?<p>&#8377;</p>:item.symbol}
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <div className="flex justify-center gap-2 items-center">
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
 
export default CurrencyTable;