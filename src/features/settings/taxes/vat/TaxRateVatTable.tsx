import { useContext, useEffect, useState } from "react";
import SearchBar from "../../../../Components/SearchBar";
import Button from "../../../../Components/Button";
import ListIcon from "../../../../assets/icons/ListIcon";
import ViewTaxDetailsVat from "./ViewTaxDetailsVat";
import useApi from "../../../../Hooks/useApi";
import { endponits } from "../../../../Services/apiEndpoints";
import { VatResponseContext } from "../../../../context/ContextShare";
import PencilIcon from "../../../../assets/icons/PencilIcon";

type TaxRate = {
  id: string;
  taxName: string;
  taxRate: string;
};

function TaxRateVatTable() {
  const [vatData, setVatData] = useState<TaxRate[]>([]);
  const [filteredVatRates, setFilteredVatRates] = useState<TaxRate[]>([]);
  const [selectedVatRate, setSelectedVatRate] = useState<TaxRate | null>(null);
  const [search, setSearch] = useState<string>("");

  const { request: AllTaxVat } = useApi("put", 5004);
  const { vatResponse } = useContext(VatResponseContext)!;

  const fetchAllVatRates = async () => {
    try {
      const url = `${endponits.GET_ALL_TAX}`;
      const body = { organizationId: "INDORG0001" };
      const { response, error } = await AllTaxVat(url, body);
      if (!error && response) {
        const vatTaxRates = response.data.vatTaxRate;
        console.log(vatTaxRates);
        setVatData(vatTaxRates);
        setFilteredVatRates(vatTaxRates);
      }
    } catch (error) {
      console.error("Error fetching VAT tax data:", error);
    }
  };

  useEffect(() => {
    fetchAllVatRates();
  }, [vatResponse]);

  useEffect(() => {
    setFilteredVatRates(
      vatData.filter((vatRate) =>
        vatRate.taxName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, vatData]);

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
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.taxName}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.taxRate} %</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <div className="flex gap-5 justify-center cursor-pointer" onClick={() => handleViewClick(item)}>
                    <ViewTaxDetailsVat vatRate={selectedVatRate} />
                    <div>
                      <PencilIcon color="#3C7FBC" />
                    </div>
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
