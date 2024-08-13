import { useEffect, useState } from "react";
import SearchBar from "../../../../Components/SearchBar"; 
import Button from "../../../../Components/Button";
import ListIcon from "../../../../assets/icons/ListIcon";
import TrashCan from "../../../../assets/icons/TrashCan";
import ViewTaxDetails from "./ViewTaxDetails";
import PencilIcon from "../../../../assets/icons/PencilIcon";
import useApi from "../../../../Hooks/useApi";
import { endponits } from "../../../../Services/apiEndpoints";

type TaxGst = {
  id: string;
  taxName: string;
  taxRate: string;
  cgst: string;
  sgst: string;
  igst: string;
};

function TaxRateTable() {
  const [taxData, setTaxData] = useState<TaxGst[]>([]);
  const [filteredTaxData, setFilteredTaxData] = useState<TaxGst[]>([]); 
  const [selectedTaxRate, setSelectedTaxRate] = useState<TaxGst | null>(null);
  const [search, setSearch] = useState<string>(""); 
  
  const { request: AllTaxGst } = useApi("put", 5004);

  const fetchAllTaxGst = async () => {
    try {
      const url = `${endponits.GET_ALL_TAX}`;
      const body = { organizationId: "INDORG0001" };
      const { response, error } = await AllTaxGst(url, body);
      if (!error && response) {
        const gstTaxRates = response.data.gstTaxRate;
        setTaxData(gstTaxRates);
        setFilteredTaxData(gstTaxRates);
      }
    } catch (error) {
      console.error("Error fetching tax data:", error);
    }
  };

  useEffect(() => {
    fetchAllTaxGst();
  }, []);

  useEffect(() => {
    setFilteredTaxData(
      taxData.filter((tax) =>
        tax.taxName.toLowerCase().includes(search.toLowerCase())  
      )
    );
  }, [search, taxData]);

  const tableHeaders = ["Tax Name", "Rate", "CGST", "SGST", "IGST", "Action"];

  const handleViewClick = (taxRate: TaxGst) => {
    setSelectedTaxRate(taxRate);
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
            {filteredTaxData.map((item) => (
              <tr key={item.id} className="relative">
                <td className=" border-y border-tableBorder">
                  <input type="checkbox" className="form-checkbox w-4 h-4" />
                </td>
                <td className="py-2.5 border-y border-tableBorder">{item.taxName}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.taxRate}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.cgst}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.sgst}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.igst}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <div className="flex justify-center cursor-pointer gap-3">
                    <div onClick={() => handleViewClick(item)}>
                      <ViewTaxDetails taxRate={selectedTaxRate} />
                    </div>
                    <div>
                      <PencilIcon color="#3C7FBC" />
                    </div>
                    <div>
                      <TrashCan color="red" />
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

export default TaxRateTable;
