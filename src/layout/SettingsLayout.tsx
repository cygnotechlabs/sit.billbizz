import { useState } from "react";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Organization from "../pages/Organization";

type Props = {
  children: React.ReactNode;
};

const SettingsLayout = ({}: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex">
      <SideBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <div className="w-[100%]">
        <Header />
        <div className="flex">
          {location.pathname !== "/settings" && <Organization />}
          <div className="w-full">
          <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
