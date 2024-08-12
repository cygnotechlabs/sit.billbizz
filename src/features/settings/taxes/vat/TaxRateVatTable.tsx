import { useState } from "react";
import SearchBar from "../../../../Components/SearchBar";
import Button from "../../../../Components/Button";
import ListIcon from "../../../../assets/icons/ListIcon";
import ViewTaxDetailsVat from "./ViewTaxDetailsVat";

type TaxRate = {
  id: string;
  name: string;
  rate: string;
};

const vatData: TaxRate[] = [
  { id: "001", name: "VAT0", rate: "0" },
];

type Props = {};

function TaxRateVatTable({}: Props) {
  const [search, setSearch] = useState<string>("");
  const [selectedVatRate, setSelectedVatRate] = useState<TaxRate | null>(null);

  const filteredVatRates = vatData.filter((vatRate) =>
    vatRate.name.toLowerCase().includes(search.toLowerCase())
  );

  const tableHeaders = ["", "Tax Name", "Rate(%)", "Actions"];

  const handleViewClick = (vatRate: TaxRate) => {
    setSelectedVatRate(vatRate);
  };

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
              {tableHeaders.map((heading, index) => (
                <th className="py-2 px-4 font-medium border-b border-tableBorder" key={index}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-dropdownText text-center text-[13px]">
            {filteredVatRates.map((item) => (
              <tr key={item.id} className="relative">
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <input type="checkbox" className="form-checkbox w-4 h-4" />
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.name}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.rate} %</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <div className="flex justify-center cursor-pointer" onClick={() => handleViewClick(item)}>
                    <ViewTaxDetailsVat vatRate={selectedVatRate} />
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

export default TaxRateVatTable;
