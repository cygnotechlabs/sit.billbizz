import { useEffect, useState } from "react";
import SupplierColumn from "./SupplierColumn";
import Button from "../../../Components/Button";
import { Link } from "react-router-dom";
import useApi from "../../../Hooks/useApi";
import SearchBar from "../../../Components/SearchBar";
import SortBy from "./SortBy";
import Print from "../../sales/salesOrder/Print";
import { endponits } from "../../../Services/apiEndpoints";
 
interface Column {
  id: string;
  label: string;
  visible: boolean;
}
 
interface Supplier {
  id: string;
  billingAttention: string;
  companyName: string;
  mobile: string;
  supplierEmail: string;
  skypeNameNumber?: string;
  billingPhone: string;
  billingCity: string;
  [key: string]: any;
}
 
const SupplierTable = () => {
  const initialColumns: Column[] = [
    { id: "billingAttention", label: "Name", visible: true },
    { id: "companyName", label: "Company Name", visible: true },
    { id: "mobile", label: "Mobile", visible: true },
    { id: "supplierEmail", label: "Email", visible: true },
    { id: "supplierDetails", label: "Supplier details", visible: true },
    { id: "billingPhone", label: "Billing Phone", visible: true },
    { id: "billingCity", label: "Billing City", visible: true },
    { id: "payables", label: "Payables(BCY)", visible: false },
    { id: "unused", label: "Unused Credit(BCY)", visible: false },
  ];
 
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [supplierData, setSupplierData] = useState<Supplier[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const { request: AllSuppliers } = useApi("put", 5009);
 
  const fetchAllSuppliers = async () => {
    try {
      const url = `${endponits.GET_ALL_SUPPLIER}`;
      const body = { organizationId: "INDORG0001" };
      const { response, error } = await AllSuppliers(url, body);
      if (!error && response) {
        console.log(response.data);
        setSupplierData(response.data);
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };
 
  useEffect(() => {
    fetchAllSuppliers();
  }, []);
 
  const filteredAccounts = supplierData.filter((account) => {
    const searchValueLower = searchValue.toLowerCase();
    return (
      account.billingAttention.toLowerCase().startsWith(searchValueLower) ||
      account.companyName.toLowerCase().startsWith(searchValueLower) ||
      account.mobile.toLowerCase().startsWith(searchValueLower) ||
      account.supplierEmail.toLowerCase().startsWith(searchValueLower) ||
      (account.skypeNameNumber &&
        account.skypeNameNumber.toLowerCase().startsWith(searchValueLower))
    );
  });
 
  const renderColumnContent = (colId: string, item: Supplier) => {
    if (colId === "supplierDetails") {
      return (
        <div className="flex justify-center">
          <Link to={`/supplier/view`}>
            <Button
              variant="secondary"
              className="font-medium rounded-lg h-[1rem] text-[9.5px]"
            >
              See details
            </Button>
          </Link>
        </div>
      );
    }
    return item[colId as keyof Supplier];
  };
 
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-[82.5%]">
          <SearchBar
            placeholder="Search"
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        </div>
        <div className="flex gap-4">
          <SortBy />
          <Print />
        </div>
      </div>
      <div className="overflow-x-auto mt-3">
        <table className="min-w-full bg-white mb-5">
          <thead className="text-[12px] text-center text-dropdownText">
            <tr style={{ backgroundColor: "#F9F7F0" }}>
              <th className="py-3 px-4 border-b border-tableBorder">
                <input type="checkbox" className="form-checkbox w-4 h-4" />
              </th>
              {columns.map(
                (col) =>
                  col.visible && (
                    <th
                      key={col.id}
                      className="py-2 px-4 font-medium border-b border-tableBorder"
                    >
                      {col.label}
                    </th>
                  )
              )}
              <th className="py-2 px-4 font-medium border-b border-tableBorder">
                <SupplierColumn columns={columns} setColumns={setColumns} />
              </th>
            </tr>
          </thead>
          <tbody className="text-dropdownText text-center text-[13px]">
            {filteredAccounts.map((item) => (
              <tr key={item.id} className="relative">
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <input type="checkbox" className="form-checkbox w-4 h-4" />
                </td>
                {columns.map(
                  (col) =>
                    col.visible && (
                      <td
                        key={col.id}
                        className="py-2.5 px-4 border-y border-tableBorder"
                      >
                        {renderColumnContent(col.id, item)}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default SupplierTable;