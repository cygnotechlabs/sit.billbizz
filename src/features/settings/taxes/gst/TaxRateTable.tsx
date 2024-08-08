import { useState } from "react";
import SearchBar from "../../../../Components/SearchBar";
import Button from "../../../../Components/Button";
import ListIcon from "../../../../assets/icons/ListIcon";
import PencilIcon from "../../../../assets/icons/PencilIcon";
import TrashCan from "../../../../assets/icons/TrashCan";
import Eye from "../../../../assets/icons/Eye";

type TaxRate = {
  id: string;
  name: string;
  type: string;
  rate: string;
  category: "Tax Group" | "Tax";
};

const taxData: TaxRate[] = [
  { id: "001", name: "GST0 (Tax Group)", type: "GST", rate: "0", category: "Tax Group" },
  { id: "002", name: "GST12 (Tax Group)", type: "GST", rate: "4", category: "Tax Group" },
  { id: "003", name: "IGST 0", type: "IGST", rate: "8", category: "Tax" },
  { id: "004", name: "IGST 12", type: "IGST", rate: "7", category: "Tax" },
  { id: "005", name: "IGST 18", type: "IGST", rate: "8", category: "Tax" },
];

type Props = {};

function TaxRateTable({}: Props) {
  const [search, setSearch] = useState<string>("");

  const filteredTaxRates = taxData.filter((taxRate) =>
    taxRate.name.toLowerCase().includes(search.toLowerCase())
  );

  const tableHeaders = ["Tax Name", "Tax Type", "Rate(%)", "Actions"];

  return (
    <div>
      <div className="flex justify-between items-center mt-5">
        <div className="w-[89%]">
          <SearchBar placeholder="Search Taxes" onSearchChange={setSearch} searchValue={search} />
        </div>
        <Button variant="secondary" size="sm">
          <ListIcon color="#565148" />{" "}
          <p className="text-sm font-medium text-outlineButton">Sort By</p>
        </Button>
      </div>
      <div className="max-h-[25rem] overflow-y-auto mt-3">
        <table className="min-w-full bg-white mb-5">
          <thead className="text-[12px] text-center text-textColor sticky top-0 z-10">
            <tr style={{ backgroundColor: "#F9F7F0" }}>
            <th className="py-3 px- border-b border-tableBorder">
                <input type="checkbox" className="form-checkbox w-4 h-4" />
              </th>
              {tableHeaders.map((heading, index) => (
                <th className="py-2 px-4 font-medium border-b border-tableBorder" key={index}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-dropdownText text-center text-[13px]">
            {filteredTaxRates.map((item) => (
              <tr key={item.id} className="relative">
                <td className=" border-y border-tableBorder">
                  <input type="checkbox" className="form-checkbox w-4 h-4" />
                </td>
                <td className="py-2.5  border-y border-tableBorder">{item.name}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.type}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.rate}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <div className="flex justify-center cursor-pointer">
                    {item.category === "Tax Group" ? (
                      <div className="gap-3 flex">
                      <PencilIcon color="#3C7FBC"/>
                      <TrashCan color="red"/>
                      </div>
                    ) : (
                      <>
                     <Eye color="#4B5C79"/>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaxRateTable;
