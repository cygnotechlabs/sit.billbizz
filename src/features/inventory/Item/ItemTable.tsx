import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";
import CustomiseColmn from "./CustomiseColum";
import SearchBar from "../../../Components/SearchBar";
import Print from "../../sales/salesOrder/Print";
import ItemSort from "./ItemSort";

interface Column {
  id: string;
  label: string;
  visible: boolean;
}

const ItemTable = () => {
  const initialColumns: Column[] = [
    { id: "itemName", label: "Name", visible: true },
    { id: "sku", label: "SKU", visible: true },
    { id: "productUsage", label: "Description", visible: true },
    { id: "purchaseDescription", label: "Purchase Description", visible: true },
    { id: "costPrice", label: "Rate", visible: true },
    { id: "saleMrp", label: "Purchase Rate", visible: true },
    { id: "status", label: "Stock On Hand", visible: true },
  ];

  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [itemsData, setItemsData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const { request: GetAllItems } = useApi("put", 5003);
  const fetchAllItems = async () => {
    try {
      const url = `${endponits.GET_ALL_ITEM}`;
      const body = { organizationId: "INDORG0001" };
      const { response, error } = await GetAllItems(url, body);

      if (!error && response) {
        setItemsData(response.data); 
      } else {
        console.error("Error in response:", error);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  const filteredItems = itemsData.filter((item) => {
    const searchValueLower = searchValue.toLowerCase();
    return (
      item.itemName?.toLowerCase().includes(searchValueLower)
    );
  });

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
          <ItemSort />
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
                      className="py-2 px-4 font-medium border-b border-tableBorder"
                      key={col.id}
                    >
                      {col.label}
                    </th>
                  )
              )}
              <th className="py-2 px-4 font-medium border-b border-tableBorder">
                <CustomiseColmn columns={columns} setColumns={setColumns} />
              </th>
            </tr>
          </thead>
          <tbody className="text-dropdownText text-center text-[13px]">
            {filteredItems.map((item) => (
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
                        {item[col.id as keyof typeof item]}
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

export default ItemTable;
