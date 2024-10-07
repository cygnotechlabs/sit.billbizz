import { useState } from "react";

import packing from "../../../assets/Images/packing_4536852 1.png";
import group0 from "../../../assets/Images/Group.png";
import group from "../../../assets/Images/one.png";
import group2 from "../../../assets/Images/two.png";
import group4 from "../../../assets/Images/third.png";

import OrderCards from "./OrderCards"; // Ensure the correct path to OrderCards component

const Cards = () => {
  const [activeCard, setActiveCard] = useState<number | null>(0);
  const handleCardClick = (index: number) => {
    setActiveCard(index);
  };

  const cards = [
    {
      icon: packing,
      title: "Total Supplier",
      count: "1500",
      rating: "12,95",
    },
    {
      icon: group0,
      title: "Average Lead Time",
      count: "120",
      rating: "18,95",
    },
    {
      icon: group,
      title: "On-Time Delivery Rate",
      count: "800",
      rating: "12,95",
    },
    {
      icon: group2,
      title: "Total Spend",
      count: "85%",
      rating: "18",
    },
    {
      icon: group4,
      title: "Total Purchase Order",
      count: "15%",
      rating: "10",
    },
  ];

  return (
    <div>
      <div className="flex justify-between w-full space-x-4">
        {cards.map((card, index) => (
          <OrderCards
            key={index}
            icon={card.icon}
            title={card.title}
            count={card.count}
            rating={card.rating}
            active={activeCard === index}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
