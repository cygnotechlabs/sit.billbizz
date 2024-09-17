import ArrowRight from "../../../../assets/icons/ArrowRight"

import MailIcon from "../../../../assets/icons/MailIcon"
import NewspaperIcon from "../../../../assets/icons/NewspaperIcon"
import Pen from "../../../../assets/icons/Pen"
import PhoneIcon from "../../../../assets/icons/PhoneIcon"
import ShoppingCart from "../../../../assets/icons/ShoppingCart"
import TrashCan from "../../../../assets/icons/TrashCan"
import UserRound from "../../../../assets/icons/UserRound"
import Button from "../../../../Components/Button"
import { SupplierData } from "../SupplierData"
import ExpensesGraph from "./ExpensesGraph"



type Props = {
  supplier?:SupplierData | null
}

function Overview({supplier}: Props) {
  const historyData = [
    {
      initials: <ShoppingCart size="16" color="white"/>,
      date: '30/5/2020',
      time: '2:30 pm',
      title: "Purchase Order",
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate harum tempora at!',
      author: 'By Info'
    },
    {
      initials: <ShoppingCart size="16" color="white" />,
      date: '30/5/2020',
      time: '2:30 pm',
      title: "Sales Order Added",
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate harum tempora at!',
      author: 'By Info'
    },
    {
      initials: <UserRound size="16" color="white"/>,
      date: '30/5/2020',
      time: '2:30 pm',
      title: "Contact Added",
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate harum tempora at!',
      author: 'By Info'
    },
    {
      initials: <NewspaperIcon size="16"/>,
      date: '30/5/2020',
      time: '2:30 pm',
      title: "Invoice Created",
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate harum tempora at!',
      author: 'By Info'
    },
  ];
  const getCircleStyle = (title: string) => {
    switch (title) {
      case 'Contact Added':
        return { bgColor: 'bg-[#97998E]', text: 'tg' };
      case 'Invoice Created':
        return { bgColor: 'bg-[#B9AD9B]', text: 'rss' };
      default:
        return { bgColor: 'bg-[#820000]', text: '' }; // Default style
    }
  };


  
  
  return (
    <>
    <div className="grid grid-cols-12 gap-5">
      
    <div className="col-span-8 space-y-3  h-auto">
        <div className="bg-[#F3F3F3] rounded-lg h-[108px] w-full p-4 space-y-5">
            <div className="flex items-center gap-2">
            <p className="w-8 bg-[url('https://s3-alpha-sig.figma.com/img/b0b0/fef6/46944393f2dbab75baf0521d6db03606?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JKaYgp-3a-l3Mf9djW8iztMnXKkdU5qi-Vzu1r6EF~4m9a4sKcenmPbkWEgYfuvH83yiC1c0-8cOgq3p228EXebKTMMi8T4gFgA64-5HSFVl8tSi0oe~74-p09C~xEfm8RAKoLvqiyOoLjutLIvjkzFbMY7tIaVI5ktUcNxMS3dUTAQy2SFmp96jLZhGyifx8DpEvxFy58Z~orck26rD8tVRYl5z4sg6XSgJ~c-C5mQqLRV6TybKP79Ir8PrD~PNZQjt75zlVN9PN2TfMAY96syGUde0ChnsL~6R5hWhaFIQwIrXogU2HcpUiF-J5YVJnLXRRRGbSCRSJTtl4dGJXA__')] bg-cover h-8 rounded-full"></p>
            <p className="pr-3 border-r-[1px] font-bold text-[16px] border-borderRight">{supplier?.supplierDisplayName}</p>
            <p className="font-bold text-[16px] ps-2">{supplier?.companyName}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-[14px] flex items-center gap-1 pr-3 border-r-[1px] border-borderRight">
                  <MailIcon size={16} color="#565148"/>
                  <p className="-mt-1">{supplier?.supplierEmail}</p>
                  </div>
                <p className="text-[14px] ps-3  flex items-center gap-1"><PhoneIcon color="#565148" size={16}/> {supplier?.mobile}</p>
              </div>
              <div className="flex gap-3 items-center">
              <Button  variant="secondary" className="h-[26px] w-[68px] text-[12px]  items-center justify-center" ><Pen size={14} color="#565148" /> <p className="text-sm font-medium">Edit</p></Button>
              <Button variant="secondary" className="h-[26px] w-[88px] text-[12px] items-center justify-center" ><TrashCan size={15} color="#565148"/> <p className="text-sm font-medium">Delete</p></Button>
              </div>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-1 justify-between">
         <div className="w-[98%] h-[200px]  space-y-3 p-[10px] rounded-lg bg-[#FDF8F0]">
            <div className="flex justify-between items-center">
            <h3 className="font-bold text-[14px]">Billing Addresss</h3>
            <p><Pen color="#303F58"/></p>
            </div>
            <div className="flex flex-col space-y-2 text-[12px]">
              <p>{supplier?.billingCity}</p>
              <p>{supplier?.billingAddressStreet1}</p>
              <p>{supplier?.billingAddressStreet2}</p>
              <p>pin {supplier?.billingPinCode}</p>
              <p>{supplier?.billingState},{supplier?.billingCountry}</p>
              <p>Phone:{supplier?.billingPhone}</p>
            </div>
         </div>
         <div className="w-[98%] h-[200px]  space-y-3 p-[10px] rounded-lg bg-[#FCFFED]">
            <div className="flex justify-between items-center">
            <h3 className="font-bold text-[14px]">Shipping Addresss</h3>
            <p><Pen color="#303F58"/></p>
            </div>
            <div className="flex flex-col space-y-2 text-[12px]">
              <p>abc</p>
              <p>Kalyanath house,puthanathaaani</p>
              <p>Po alavil</p>
              <p>pin 670008</p>
              <p>India</p>
              <p>Phone:96337968756</p>
            </div>
         </div>
         <div className="w-[100%] h-[200px]  space-y-3 p-[10px] rounded-lg bg-[#F6F6F6]">
          
            <h3 className="font-bold text-[14px]">Other Details</h3>
          
            <div className="grid grid-cols-2  text-[12px]">
              <div className="space-y-2">
              <p>Customer Type</p>
              <p>Default Currency</p>
              <p>Payment Terms</p>
              <p>Portal Languages</p>
              </div>
              <div className="text-end font-bold space-y-2">
              <p>Business</p>
              <p>INR</p>
              <p>Due On Receipt</p>
              <p>English</p>
              </div>
            </div>
         </div>
        </div>
        <div className="flex  items-center justify-end space-x-1">
        <p className="text-end text-[#820000] text-[14px] font-bold cursor-pointer">See Payable </p><ArrowRight size={15} color="#820000"/>
        </div>
        <div>
          <ExpensesGraph/>
        </div>
    </div>
   {/* Supplier Status History */}
   <div className="col-span-4 py-5 px-3 bg-[#F6F6F6] rounded-[8px]">
      <h3 className="font-bold text-[14px] mb-4">Supplier Status History</h3>
      <div className="flex flex-col relative pb-8">
        <div className="w-[2px] absolute left-4 top-0 bg-slate-500" style={{ height: 'calc(100% - 70px)' }}></div>
        {historyData.map((item, index) => {
          const circleStyle = getCircleStyle(item.title);
          console.log(circleStyle.bgColor);
          
          return (
            <div key={index} className="space-x-4 flex pb-8">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 z-10 ${circleStyle.bgColor} flex items-center justify-center rounded-full text-white`}>
                  <p>{ item.initials}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex space-x-3 text-[14px]">
                  <p>{item.date}</p>
                  <p>{item.time}</p>
                </div>
                <p className="font-bold">{item.title}</p>
                <p>{item.description}</p>
                <div className="flex space-x-4 font-bold text-[14px]">
                  <p>{item.author}</p>
                  <p><u>View Details</u></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
    <div className="flexz justify-end">
    <Button size="sm" className="w-[120px] flex justify-center float-end">
    <p>save</p>
  </Button>
    </div>
  </>
  )
}

export default Overview