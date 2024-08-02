import  { useState } from "react";
import WorkTypeDropdown from "./WorkTypeDropdown"
import SearchBar from "../../Components/SearchBar";
import Print from "../sales/salesOrder/Print";
import Ellipsis from "../../assets/icons/Ellipsis";
import StaffsSort from "./StaffsSort";
import { useNavigate } from "react-router-dom";
interface Staff {
  id: string;
  name: string;
  email: string;
  contact: string;
  cost: string;
  workMode: string;
  department: string;
}

const CashAccountsTable = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [workType, setWorkType] = useState<string>("");

  const staffData: Staff[] = [
    {
      id: "001",
      name: "Aswin Mukundan",
      email: "1001",
      contact: "9878567857",
      cost: "1000.00",
      workMode: "Per Day",
      department: "Marketing",
    },
    {
      id: "002",
      name: "Fousiya hameed",
      email: "1002",
      contact: "9578567857",
      cost: "2000.00",
      workMode: "Per Work",
      department: "Marketing",
    },
    {
      id: "003",
      name: "Aman Rasheed",
      email: "1003",
      contact: "9579567847",
      cost: "2000.00",
      workMode: "Monthly Salary",
      department: "Marketing",
    },
  ];

  const handleWorkTypeChange = (workType: string) => {
    setWorkType(workType);
  };

  const dropdownItems = [
    {
      text: "Per Day",
      onClick: () => handleWorkTypeChange("Per Day"),
    },
    {
      text: "Per Work",
      onClick: () => handleWorkTypeChange("Per Work"),
    },
    {
      text: "Monthly Salary",
      onClick: () => handleWorkTypeChange("Monthly Salary"),
    },
    {
      text: "Hourly Pay",
      onClick: () => handleWorkTypeChange("Hourly Pay"),
    },
    {
      text: "Driver",
      onClick: () => handleWorkTypeChange("Driver"),
    },
  ];
const department=[
    {
        text: "Marketing",
        onClick: () => handleWorkTypeChange("Per Da"),
      }
]
  const filteredStaff = staffData.filter((staff: Staff) => {
    const searchValueLower = searchValue.toLowerCase();
    const workTypeMatch = workType ? staff.workMode === workType : true;
    return (
      (staff.name.toLowerCase().startsWith(searchValueLower) ||
        staff.email.toLowerCase().startsWith(searchValueLower) ||
        staff.contact.toLowerCase().startsWith(searchValueLower) ||
        staff.cost.toLowerCase().startsWith(searchValueLower) ||
        staff.workMode.toLowerCase().startsWith(searchValueLower) ||
        staff.department.toLowerCase().startsWith(searchValueLower)) &&
      workTypeMatch
    );
  });

  const tableHeaders = [
    "Sl No",
    "Staff Name",
    "Work Email",
    "Contact",
    "Cost to Company",
    "Work Mode",
    "Department",
    "Actions",
  ];
  const navigate =useNavigate()

  return (
    <div>
         <div className="flex items-center justify-between">
        <div className="w-[40%]">
        <SearchBar
        placeholder="Search Staff"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        />
        </div>
        <div className="flex items-center gap-4">
            <p className="text-dropdownText text-sm">Filter by:</p>
            <WorkTypeDropdown label="Work Type" items={dropdownItems} />
            <WorkTypeDropdown label="Department" items={department}/>
            <WorkTypeDropdown label="Designation" items={department} />
            <StaffsSort/>
            <Print />
        </div>
      </div>
      <div className="max-h-[25rem] overflow-y-auto mt-3">
        <table className="min-w-full bg-white mb-5">
          <thead className="text-[12px] text-center text-dropdownText sticky top-0 z-10">
            <tr style={{ backgroundColor: "#F9F7F0" }}>
              {tableHeaders.map((heading, index) => (
                <th className="py-2 px-4 font-medium border-b border-tableBorder" key={index}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-dropdownText text-center text-[13px]">
            {filteredStaff.map((item: Staff) => (
              <tr key={item.id} className="relative">
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  {item.id}
                </td>
                <td onClick={() => navigate("/staffs/view")} className="py-2.5 px-4 border-y border-tableBorder cursor-pointer">
                       {item.name}
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  {item.email}
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  {item.contact}
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  {item.cost}
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  {item.workMode}
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  {item.department}
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                    <div className="flex justify-center cursor-pointer">
                  <Ellipsis height={13}/>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashAccountsTable;
