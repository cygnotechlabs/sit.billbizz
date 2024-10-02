import { useState } from "react";
import OrderCards from "./OrderCards";
import toatalInvImage from "../../../assets/Images/product packaging (packaging the product into a box).png";
import totalSalesImage from "../../../assets/Images/processing_2816119 1.png";
import turnoverImage from "../../../assets/Images/exchange_873924 1.png";
import pendingImage from "../../../assets/Images/shopping-bags_3601438 1.png";
import pendingSalesImage from "../../../assets/Images/discount_12707444 1.png"
type Props = {}

const InventoryCards = ({}: Props) => {
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const handleCardClick = (index: number) => {
        setActiveCard(index);
      };
  const cards = [
    {
      icon: toatalInvImage,
      title: "Total Inventory Value",
      count: "1500",
      rating: "12",
    },
    {
      icon: totalSalesImage,
      title: "Total Sales Value",
      count: "120",
      rating: "18",
    },
    {
        icon: turnoverImage,
        title: "Turnover Rate",
        count: "800",
        rating: "12",
    },
    {
        icon: pendingImage,
        title: "Pending Purchase",
        count: "85%",
        rating: "18",
    },
    {
        icon: pendingSalesImage,
        title: "Pending Sales",
        count: "15%",
        rating: "10",
    },
  ];
  return (
    <div>
        <div className="flex justify-between  w-full space-x-4">
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
  )
}

export default InventoryCards;