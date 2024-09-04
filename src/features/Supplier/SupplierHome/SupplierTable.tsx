import {  useContext, useEffect, useState } from "react";
import SupplierColumn from "./SupplierColumn";
import Button from "../../../Components/Button";
import { Link } from "react-router-dom";
import { endponits } from "../../../Services/apiEndpoints";
import useApi from "../../../Hooks/useApi";
import SearchBar from "../../../Components/SearchBar";
import SortBy from "./SortBy";
import Print from "../../sales/salesOrder/Print";


import {SupplierResponseContext} from "../../../context/ContextShare";

interface Column {
  id: string;
  label: string;
  visible: boolean;
}

const SupplierTable = () => {
  // const [suppliersList,setSuppliersList] = useState<any[]>([]);
  // const { request: AllSuppliers } = useApi("put", 5002);
  const initialColumns: Column[] = [
    { id: "billingAttention", label: "Name", visible: true },
    { id: "companyName", label: "Company Name", visible: true },
    { id: "contact", label: "Contact", visible: true },
    { id: "email", label: "Email", visible: true },
    { id: "supplierDetails", label: "Supplier details", visible: true },
    { id: "payables", label: "Payables(BCY)", visible: true },
    { id: "unused", label: "Unused Credit(BCY)", visible: true },
  ];

  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [supplierData, setSupplierData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
const {supplierResponse}=useContext(SupplierResponseContext)!;
  const { request: AllSuppliers } = useApi("put", 5002);


  const fetchAllCustomers = async () => {
    try {
      const url = `${endponits.GET_ALL_CUSTOMER}`;
      const body = { organizationId: "INDORG0001" };
      const { response, error } = await AllSuppliers(url, body);
      if (!error && response) {
        setSupplierData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };



  // const data = [
  //   {
  //     id: "1",
  //     name: "John Doe",
  //     companyName: "Electrotech Solution",
  //     contact: "9643658765",
  //     email: "electrotech@gmail.com",
  //     payables: 0.0,
  //     unused: 0.0,
  //   },
  //   {
  //     id: "2",
  //     name: "Divya Kumar",
  //     companyName: "Max Lab",
  //     contact: "9643658765",
  //     email: "John123@gmail.com",
  //     payables: 0.0,
  //     unused: 0.0,
  //   },
  //   {
  //     id: "3",
  //     name: "Kiran Kammath",
  //     companyName: "ABC Electronics",
  //     contact: "9643658765",
  //     email: "John123@gmail.com",
  //     payables: 0.0,
  //     unused: 0.0,
  //   },
  // ];

  useEffect(() => {
    fetchAllCustomers();
  }, [supplierResponse]);

  const filteredAccounts = supplierData.filter((account) => {
    const searchValueLower = searchValue.toLowerCase();
    return (
      account.billingAttention.toLowerCase().startsWith(searchValueLower) ||
      account.companyName.toLowerCase().startsWith(searchValueLower) ||
      account.mobile.toLowerCase().startsWith(searchValueLower) ||
      account.supplierEmail.toLowerCase().startsWith(searchValueLower) ||
      account.skypeNameNumber.toLowerCase().startsWith(searchValueLower)
    );
  });

  const renderColumnContent = (colId: string, item: any) => {
    if (colId === "supplierDetails") {
      return (
        <div className="flex justify-center">
          <Link to={`/supplier/view/${item._id}`}>
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
    return item[colId as keyof typeof item];
  };

  // const fetchAllSuppliers = async () => {
  //   try {
  //     const url = `${endponits.GET_ALL_SUPPLIER}`;
  //     const body = { organizationId: "INDORG0001" };
  //     const { response, error } = await AllSuppliers(url, body);
  //     if (!error && response) {
  //       setSuppliersList(response.data);
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching accounts:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAllSuppliers();
  // }, []);

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
  