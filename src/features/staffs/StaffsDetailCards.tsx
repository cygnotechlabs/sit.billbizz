import staffimage from "../../assets/Images/staff_12109791 1.png"
import outsiderimage from "../../assets/Images/outsider_16441814 1.png"
import { useState } from "react";
import StaffCard from "./StaffsCard";
type Props = {}

function StaffsDetailCards({}: Props) {
    const customerCardsData = [ 
        {
          icon:staffimage ,
          title: "All Staff",
          description: "Lorem ipsum dolor sit amet",
          number: 120,
        },
        {
          icon: outsiderimage,
          title: "Active Staff",
          description: "Lorem ipsum dolor sit amet",
          number: 75,
        },
        {
          icon:outsiderimage,
          title: "Incomplete Staff",
          description: "Lorem ipsum dolor sit amet",
          number: 12,
        },
      ];
      const [activeCardCC, setActiveCardCC] = useState<number | null>();
      const handleCardClickCC =(index:number)=>{
        setActiveCardCC(index)
      }
  return (
    <div className="flex space-x-4 justify-center px-6 mt-2">
         {customerCardsData.map((card, index) => (
        <StaffCard
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
          number={card.number}
          active={activeCardCC === index}
          onClick={() => handleCardClickCC(index)}
        />
      ))}
    </div>
  )
}

export default StaffsDetailCards;