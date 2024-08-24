import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";
import CustomiseColmn from "./CustomiseColum";

const ItemTable = () => {
  const tableHeaders = [
    { text: "Name", icon: null },
    { text: "SKU", icon: null },
    { text: "Description", icon: null },
    { text: "Purchase Description", icon: null },
    { text: "Rate", icon: null },
    { text: "Purchase Rate ", icon: null },
    { text: "Stock On Hand ", icon: null },
    { text: "", icon: null },
    { text: "", icon: <CustomiseColmn /> },
    { text: "", icon: null },
  ];

  const [itemsData, setItemsData] = useState<any[]>([]); // Assuming itemsData is an array

  const { request: GetAllItems } = useApi("put", 5003);
  const fetchAllItems = async () => {
    try {
      const url = `${endponits.GET_ALL_ITEM}`;
      const body = { organizationId: "INDORG0001" };
      const { response, error } = await GetAllItems(url, body);

      if (!error && response) {
        setItemsData(response.data); // Assuming response.data is the array of items
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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white mb-5">
        <thead className="text-[12px] text-center text-dropdownText">
          <tr style={{ backgroundColor: "#F9F7F0" }}>
            <th className="py-3 px-4 border-b border-tableBorder">
              <input type="checkbox" className="form-checkbox w-4 h-4" />
            </th>
            {tableHeaders.map((header, index) => (
              <th
                className="py-2 px-4 font-medium border-b border-tableBorder"
                key={index}
              >
                {header.text}
                {header.icon && <span>{header.icon}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-dropdownText text-center text-[13px]">
          {itemsData.map((item) => (
            <tr key={item.id} className="relative">
              <td className="py-2.5 px-4 border-y border-tableBorder">
                <input type="checkbox" className="form-checkbox w-4 h-4" />
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.itemName}
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.sku}
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.productUsage}
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.purchaseDescription}
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.costPrice}
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.saleMrp }
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.status}
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
