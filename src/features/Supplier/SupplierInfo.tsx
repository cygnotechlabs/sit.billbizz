import React from 'react'
import Button from '../../Components/Button'
import PlusCircle from '../../assets/icons/PlusCircle'
import supplierInfo from '../../assets/Images/supplierInfo.png'
import UserRoundPlus from '../../assets/icons/UserRoundPlus'
import UserCheck from '../../assets/icons/UserCheck'
import NotebookText from '../../assets/icons/NotebookText'
import SentToBack from '../../assets/icons/SentToBack'
import RecieptText from '../../assets/icons/RecieptText'
import NewspaperIcon from '../../assets/icons/NewspaperIcon'
import IndianRupee from '../../assets/icons/IndianRupee'
import RecieptIndianRupee from '../../assets/icons/RecieptIndianRupee'
type Props = {}
interface StepProps {
  icon: React.ReactNode;
  label: string;
  isLast: boolean;
}

interface CircleProps {
  index: number;
}
const circlesArray = new Array(7).fill(null);
  const steps = [
    { icon:   <UserRoundPlus/>, label: 'Supplier Creation' },
    { icon: <UserCheck/>, label: 'Supplier Verification' },
    { icon: <NotebookText/>, label: 'Supplier Management' },
    { icon: <SentToBack/>, label: 'Purchase Order Creation' },
    { icon: <RecieptText/>, label: 'Order Tracking and Management' },
    { icon: <NewspaperIcon color='#4B5C79'/>, label: 'Invoice' },
    { icon: <RecieptIndianRupee size={16} color='#4B5C79'/>, label: 'Payment' },
  ];
  const Circle: React.FC<CircleProps> = ({ index }) => (
    <div key={index} className='w-[28px] h-[28px] rounded-full border border-[#BDBFB2] flex justify-center items-center -mt-3 bg-white'>
      <div className='w-[11px] h-[11px] bg-[#CACCBE] rounded-full'></div>
    </div>
  );
  
  const Step: React.FC<StepProps> = ({ icon, label, isLast }) => (
    <div className='flex items-center'>
      <div className='h-[105px] bg-white rounded-lg mt-4 flex flex-col justify-center items-center mb-2 space-y-2'>
        <div className='bg-[#F7E7CE] w-6 h-6 flex justify-center rounded items-center'>
          {icon}
        </div>
        <p className='text-[#4B5C79] font-semibold text-center text-[13px] w-[150px] mx-2'>{label}</p>
      </div>
      {!isLast && (
        <div className='flex items-center'>
          <p className='w-8 border border-dashed text-[#CACCBE]'></p>
          <div className='w-2 h-2 bg-[#CACCBE] rounded-full'></div>
        </div>
      )}
    </div>
  );
function SupplierInfo({}: Props) {
  
  return (
    <div className='mx-7 mt-8 space-y-4'>
        <div className='grid grid-cols-12 gap-1'>
        <div className='col-span-5 flex '>
            <div className='flex justify-center items-center flex-col w-[540px] space-y-4'>
            <h2 className='text-[32px] text-center text-[#303F58]'>Efficient Supplier Management System</h2>
            <p className='text-center text-[#4B5C79] text-[16px] w-[466px]'>Lorem ipsum dolor sit amet consectetur. Arcu porttitor lacus sit ut a sed gravida.</p>
            <Button
          variant="primary"
          className="flex items-center rounded-lg"
          size="xl"
        >
          <PlusCircle color="white" />{" "}
          <p className="text-sm font-medium">Add Supplier</p>
        </Button>
            </div>
        </div>
        <div className='col-span-7'>
          <img src={supplierInfo} className='w-[800px] h-[315px]' alt="" />
        </div>
        </div>
       <div>
       
       </div>
       <div className='space-y-6'>
      <h2 className='text-[24px] font-bold text-[#303F58] text-center mb-7'>How Supplier Management life cycle works?</h2>
      <div className='h-1 w-full bg-white px-20 flex justify-between'>
        {circlesArray.map((_, index) => (
          <Circle key={index} index={index} />
        ))}
      </div>
    </div>
    <div className='flex'>
    {steps.map((step, index) => (
          <Step key={index} icon={step.icon} label={step.label} isLast={index === steps.length - 1} />
        ))}
      </div>
    </div>
  )
}

export default SupplierInfo