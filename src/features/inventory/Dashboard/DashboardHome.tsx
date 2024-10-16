import { useEffect, useRef, useState } from 'react';
import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import ArrowUpIcon from '../../../assets/icons/ArrowUpIcon';
import Ellipsis from '../../../assets/icons/Ellipsis';
import RefreshIcon from '../../../assets/icons/RefreshIcon';
import BarChart from "../../../Components/charts/BarChart";
import HoriBarChart from '../../../Components/charts/HoriBarChart';
import SemiChart from '../../../Components/charts/SemiChart';
import TopDataTable from '../../../Components/charts/TopDataTable';
import useApi from '../../../Hooks/useApi';
import { endponits } from '../../../Services/apiEndpoints';
import InventoryCards from './InventoryCards';

type Props = {};

function DashboardHome({}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { request: getDashboard } = useApi("get", 5003);
  const [data, setData] = useState<any>(null);

  const getDashboards = async () => {
    const url = `${endponits.GET_INVENTORY_DASHBOARD}/2024-10-10`;
    try {
      const apiResponse = await getDashboard(url);
      const { response, error } = apiResponse;
      if (!error && response) {
        setData(response.data);
        // console.log(response.data, "get status");
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getDashboards();
  }, []);

  const dropdownItems = [
    {
      icon: <ArrowDownIcon />,
      text: "Import Items",
      onClick: () => {
        console.log("Import Sales Order clicked");
      },
    },
    {
      icon: <ArrowUpIcon />,
      text: "Export Items",
      onClick: () => {
        console.log("Export Sales Order clicked");
      },
    },
    {
      icon: <ArrowUpIcon />,
      text: "Export Current View",
      onClick: () => {
        console.log("Export Current View clicked");
      },
    },
    {
      icon: <RefreshIcon color="#4B5C79" />,
      text: "Refresh List",
      onClick: () => {
        console.log("Refresh List clicked");
      },
    },
  ];

  return (
    <div className='px-6 space-y-8 text-[#303F58]'>
      <div className="flex items-center relative">
        <div>
          <h3 className="font-bold text-2xl text-textColor">Inventory Overview</h3>
          <p className="text-sm text-gray mt-1">
            Lorem ipsum dolor sit amet consectetur. Commodo enim odio fringilla egestas consectetur amet.
          </p>
        </div>
        <div className="ml-auto gap-3 flex items-center">
          <div onClick={toggleDropdown} className="cursor-pointer">
            <Ellipsis />
          </div>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-16 right-4 mt-2 w-48 bg-white shadow-xl z-10"
            >
              <ul className="py-1 text-dropdownText">
                {dropdownItems.map((item, index) => (
                  <li
                    key={index}
                    onClick={item.onClick}
                    className="px-4 py-2 flex items-center gap-2 hover:bg-orange-100 rounded-md text-sm cursor-pointer"
                  >
                    {item.icon}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <InventoryCards data={data} />

      {/* Top suppliers and supplier retention rate over time */}
      <div className="grid grid-cols-3 gap-5">
        <div className="flex justify-center col-span-2">
          <TopDataTable/>
        </div>
        <div className="flex justify-center">
          <BarChart />
        </div>
        <div className="col-span-2 flex justify-center">
          <HoriBarChart />
        </div>
        <div className="flex justify-center">
          <SemiChart />
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
