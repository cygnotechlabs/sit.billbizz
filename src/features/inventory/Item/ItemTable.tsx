import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";
import CustomiseColmn from "./CustomiseColum";

const ItemTable = () => {
  const data = [
    {
      id: "1",
      name: "John Doe",
      companyName: "Electrotech Solution",
      contact: "9643658765",
      email: "electrotech@gmail.com",
      receivables: "electrotech@gmail.com",
    },
    {
      id: "2",
      name: "Divya Kumar",
      companyName: "Max Lab",
      contact: "9643658765",
      email: "John123@gmail.com",
      receivables: "John123@gmail.com",
    },
    {
      id: "3",
      name: "Kiran Kammath",
      companyName: "ABC Electronics",
      contact: "9643658765",
      email: "John123@gmail.com",
      receivables: "John123@gmail.com",
    },
  ];

  const tableHeaders = [
    { text: "Name", icon: null },
    { text: "Company Name", icon: null },
    { text: "Contact", icon: null },
    { text: "Email", icon: null },
    { text: "Customer details", icon: null },
    { text: "Receivables(BCY)", icon: null },
    { text: "", icon: null },
    { text: "", icon: <CustomiseColmn /> },
    { text: "", icon: null },
  ];
  const [itemsData, setItemsData] = useState<any>({})
  console.log(itemsData);
  

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
          {data.map((item) => (
            <tr key={item.id} className="relative">
              <td className="py-2.5 px-4 border-y border-tableBorder">
                <input type="checkbox" className="form-checkbox w-4 h-4" />
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.name}
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.companyName}
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.contact}
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.email}
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder flex justify-center">
                <Button variant="secondary" size="sm">
                  <p className="text-[10px]">See details</p>
                </Button>
              </td>
              <td className="py-2.5 px-4 border-y border-tableBorder">
                {item.receivables}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
