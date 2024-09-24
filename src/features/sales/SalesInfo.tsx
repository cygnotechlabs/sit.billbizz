import NewspaperIcon from "../../assets/icons/NewspaperIcon";
import PlusCircle from "../../assets/icons/PlusCircle";
import UserRound from "../../assets/icons/user-round";
import Button from "../../Components/Button";

type Props = {};

const data = [
  { title: "Customer Creation", icon: <UserRound color="#4B5C79" /> } ,
  {
    title:"Invoicing",icon:<NewspaperIcon color="#4B5C79" size="22"/>
  },
  {
    title:"Fund Processing", 
  },
  {title:"Communication"},
  {title:"Sales Tracking"},
  {title:"Reporting"},
  {title:"Integration"},
 
];

function SalesInfo({}: Props) {
  return (
    <>
      <div className="grid grid-cols-12 items-center justify-center text-textColor p-5">
        <div className="items-center justify-center flex-col text-center col-span-5">
          <p className="text-[32px] font-normal">
            Unlock Growth with Our Sales <br /> Expertise
          </p>
          <p className="text-[16px] mt-5">
            Lorem ipsum dolor sit amet consectetur. Arcu porttitor lacus <br />{" "}
            sit ut a sed gravida.
          </p>
          <div className="items-center flex w-full justify-center mt-5">
            <Button variant="primary" size="sm">
              <PlusCircle />
              Add Sales Order
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center col-span-7">
          <img
            className="w-full"
            src="https://i.postimg.cc/t414M16N/Rectangle-5529.png"
            alt=""
          />
        </div>
      </div>
      <div className="text-center">
        <p className="font-bold text-2xl text-[#303F58]">
          How Sales life cycle works?
        </p>
      </div>
      <div className="bg-white h-1 w-full absolute items-center flex mt-3 mx-5"></div>

      <div className="flex items-center mb-28">
        {data.map((item, index) => (
          <div key={index} className="px-10 flex ">
            <div className="">
              <div className="bg-[white] h-7 w-7 rounded-full relative border-[#BDBFB2] border-[2px] flex items-center justify-center">
                <div className="bg-[#BDBFB2] rounded-full h-[11px] w-[11px]"></div>
              </div>
  
              <div className="bg-white w-48 h-[105px] items-center justify-center  rounded-lg mt-5 text-[#4B5C79]">
                <div className="flex items-center justify-center" >
                  <div className="h-6 w-6 rounded-[4px] bg-[#F7E7CE] flex items-center justify-center">
                    {item.icon}
                  </div> 
                 
                </div>
                <div className="flex items-center justify-center"> {item.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SalesInfo;
