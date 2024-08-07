import { useState } from "react";
import { customizationList,itemsList,  onlinePaymentList,  organizationList,preferencesList,purchasesList,
ReminderList,SalesList,taxList,usersAndRoleList,
} from "../assets/constants";
import BarChart from "../assets/icons/BarChart";
import Bell from "../assets/icons/Bell";
import Building from "../assets/icons/Building";
import ChevronLeft from "../assets/icons/ChevronLeft";
import ListFilter from "../assets/icons/ListFilter";
import Packet from "../assets/icons/Packet";
import PaintBucket from "../assets/icons/PaintBucket";
import ShoppingBag from "../assets/icons/ShoppingBag";
import Users from "../assets/icons/Users";
import Wallet from "../assets/icons/Wallet";
import SearchBar from "../Components/SearchBar";
import Button from "../Components/Button";

const mainList = [
  { title: "Organization", icon: Building, subList: organizationList },
  { title: "Items", icon: Packet, subList: itemsList },
  { title: "Tax & Complaints", icon: Building, subList: taxList },
  { title: "Sales", icon: BarChart, subList: SalesList },
  { title: "Purchases", icon: ShoppingBag, subList: purchasesList },
  { title: "Customisation", icon: PaintBucket, subList: customizationList },
  { title: "Users & Roles", icon: Users, subList: usersAndRoleList },
  { title: "Preferences", icon: ListFilter, subList: preferencesList },
  { title: "Reminder & Notification", icon: Bell, subList: ReminderList },
  { title: "Online Payments", icon: Wallet, subList: onlinePaymentList },
];

type Props = {};

const Organization = ({}: Props) => {
  const [search, setSearch] = useState("");
  console.log(search);
  
  const [selectedMain, setSelectedMain] = useState<number | null>(null);
  const [selectedSub, setSelectedSub] = useState<{ mainIndex: number | null; subIndex: number | null }>({ mainIndex: null, subIndex: null });

  const handleMainClick = (index: number) => {
    setSelectedMain(index);
    setSelectedSub({ mainIndex: index, subIndex: null });
  };

  const handleSubClick = (mainIndex: number, subIndex: number) => {
    setSelectedMain(mainIndex);
    setSelectedSub({ mainIndex, subIndex });
  };

  return (
    <>
      <div className="col-span-3 border-neutral-300 text-textColor h-[100vh] border-2 px-8 bg-white">
        <Button variant="secondary" size="sm" className="mt-4 text-sm font-medium">
          <ChevronLeft color="currentColor" className="h-5 w-5" strokeWidth="2" />
          Back
        </Button>
        <div className="relative mt-6">
          <p className="text-xl">
            <b>Settings</b>
          </p>
          <div className="mt-4">
            <SearchBar placeholder="Search" onSearchChange={setSearch} searchValue="" />
          </div>
        </div>

        <div className="overflow-y-scroll mt-6 hide-scrollbar" style={{ height: "445px" }}>
          {mainList.map((main, mainIndex) => (
            <div key={main.title}>
              <div
                className={`relative flex items-center text-lg gap-3 p-2 my-2 rounded-lg cursor-pointer ${
                  selectedMain === mainIndex || selectedSub.mainIndex === mainIndex ? "bg-[#F3E6E6]" : ""
                }`}
                onClick={() => handleMainClick(mainIndex)}
              >
                <main.icon color="currentColor" />
                <p className="font-semibold text-base text-textColor">{main.title}</p>
              </div>

              <ul>
                {main.subList.map((sub, subIndex) => (
                  <li
                    key={sub.title}
                    className={`my-3 text-sm cursor-pointer ${
                      selectedSub.mainIndex === mainIndex && selectedSub.subIndex === subIndex ? "text-[#820000] font-bold" : "font-semibold text-dropdownText"
                    }`}
                    onClick={() => handleSubClick(mainIndex, subIndex)}
                  >
                    {sub.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Organization;
