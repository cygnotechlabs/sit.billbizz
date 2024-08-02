import { useState } from "react";
import BookIcon from "../../assets/icons/BookIcon";
import OpenedBookIcon from "../../assets/icons/OpenedBookIcon";
import BookXIcon from "../../assets/icons/BookXIcon";
import NewspaperIcon from "../../assets/icons/NewspaperIcon";


const StaffsFilterCards = () => {
  const [selected, setSelected] = useState("All");

  const Suppliers = [
    {
      icon: <BookIcon color="#585953" />,
      title: "All",
    },
    {
      icon: <OpenedBookIcon color="#585953" />,
      title: "Active Staff",
    },
    {
      icon: <BookXIcon color="#585953" />,
      title: "Incomplete Staff",
    },
    {
      icon: <NewspaperIcon color="#585953" />,
      title: "Exited Employees",
    },

  ];

  return (
    <div className="flex gap-3 justify-start">
      {Suppliers.map((customer) => (
        <button
          key={customer.title}
          onClick={() => setSelected(customer.title)}
          className={`flex items-center gap-2 p-2 w-[19%] justify-center  rounded ${
            selected === customer.title ? "bg-WhiteIce" : "bg-white"
          }`}
          style={{ border: "1px solid #DADBDD" }}
        >
          {customer.icon}
          <span
            style={{ color: "#4B5C79", fontSize: "12px", fontWeight: "600" }}
          >
            {customer.title}
          </span>
        </button>
      ))}
    </div>
  );
};

export default StaffsFilterCards;
