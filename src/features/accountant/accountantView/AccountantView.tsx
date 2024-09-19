import { Link } from "react-router-dom";
import CheveronLeftIcon from "../../../assets/icons/CheveronLeftIcon";

type Props = {};

function AccountantView({}: Props) {
  const tableHeaders = ["Date", "Transaction Details", "Type", "Debit", "Credit"];

  return (
    <div className="px-6">
      <div className="flex items-center gap-5 mb-2">
        <Link to={"/accountant/chart-OF-accountant"}>
          <div
            style={{ borderRadius: "50%" }}
            className="w-[40px] h-[40px] flex items-center justify-center bg-white"
          >
            <CheveronLeftIcon />
          </div>
        </Link>
        <p className="text-textColor text-xl font-bold">Account Receivable</p>
      </div>

      <div className="p-6 rounded-lg bg-white">
        <div className="flex justify-between mb-4">
          <p className="font-bold text-textColor text-base">Recent Transaction</p>
          {/* FCY/BCY Toggle Buttons */}
          <div className="flex text-[#565148] text-xs font-medium">
            <button className="border border-[#565148] border-r-0 px-3 py-1 rounded-s-lg text-sm">FCY</button>
            <button className="border border-[#565148] px-3 py-1 rounded-e-lg text-sm">BCY</button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-tableBorder rounded-lg">
            <thead className="text-[12px] text-center text-dropdownText">
              <tr className="bg-[#F9F7F0]">
                {tableHeaders.map((heading, index) => (
                  <th
                    key={index}
                    className="py-3 px-4 font-medium border-b border-tableBorder text-sm"
                  >
                    {heading}
                  </th> 
                ))}
              </tr>
            </thead>
            <tbody className="text-dropdownText text-center text-[13px]">
              <tr>
                <td className="py-3 px-4 border-b border-tableBorder">06 Jun 24</td>
                <td className="py-3 px-4 border-b border-tableBorder">Journal</td>
                <td className="py-3 px-4 border-b border-tableBorder">Journal</td>
                <td className="py-3 px-4 border-b border-tableBorder">Rs. 5,000.00</td>
                <td className="py-3 px-4 border-b border-tableBorder"></td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccountantView;
