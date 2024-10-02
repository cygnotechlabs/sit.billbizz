import React from "react";
import { cva } from "class-variance-authority";
import ArrowIconNoUnderline from "../../../assets/icons/ArrowIconNoUnderline";

type CardProps = {
  icon: string;
  title: string;
  count: string;
  rating: string;
  active?: boolean;
  onClick?: () => void;
};

const cardVariants = cva(" rounded-xl px-4  cursor-pointer", {
  variants: {
    active: {
      true: "bg-cardBg border-cardBorder border-2",
      false: "bg-white border-gray-300", 
    },
  },
  defaultVariants: {
    active: false,
  },
});

const OrderCards: React.FC<CardProps> = ({ icon, title, count, rating, active = false, onClick }) => {
  return (
    <div className={`${cardVariants({ active })} py-4 px-5  w-[100%]`} onClick={onClick}>
      <div className="rounded-full w-8 h-8 mb-2 ">
      <img src={icon} alt={`${title} icon`} />
      </div>

      < >
        <h2 className="text-[14px] font-bold text-[#303F58]">{title}</h2>
        <p className="text-[#303F58] font-extrabold text-2xl" style={{color : active ? "#820000" : ""}}>{count}</p>
        <div className="flex justify-between items-center">
        <div className="text-[12px] p-[4px] font-bold  flex items-center   text-[#32A38E] rounded-md bg-[#D8F2EE]" >
          {rating}%<ArrowIconNoUnderline size={16} color="#32A38E"/>
        </div>
        <div className="flex items-center justify-center w-full">
        <p className="text-xs text-end">Compared to last month</p>
        </div>
        </div>
      </>
    </div>
  );
};

export default OrderCards;
