import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../Components/SearchBar";
import SettingsIcons from "../../assets/icons/SettingsIcon";
import Notification from "./HeaderIcons/Notification";
import RefferEarn from "./HeaderIcons/RefferEarn";
import Organization from "./HeaderIcons/Organization";
import { useState } from "react";
import viewAppsIcon from "../../assets/Images/Frame 629925.png"
type Props = {};

const Header = ({}: Props) => {
  const navigate=useNavigate();
  const handleNavigate =()=>{
navigate("/landing")
  }
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div
      className="p-4 flex items-center gap-2 w-full border-b-slate-400 border-y-orange-200"
      style={{ borderBottom: "1.5px solid rgba(28, 28, 28, 0.1)" }}
    >
      <div className="w-[68%]">
        <SearchBar
          placeholder="Search"
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
      </div>
      <div className="flex ms-8 justify-center items-center gap-2 cursor-pointer" onClick={handleNavigate}>
      <img src={viewAppsIcon} alt="" />
      <span className="text-xs font-semibold text-dropdownText whitespace-nowrap">
        View Apps
      </span>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-2">
          <Notification />
          <RefferEarn />
          <Link to="/settings">
            <SettingsIcons size="md" />
          </Link>
          <Organization />
        </div>
      </div>
    </div>
  );
};

export default Header;
