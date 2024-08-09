
import CurrencyTable from '../Currencies/CurrencyTable';
import bgImage from './../../../../assets/Images/Group 37 (1).png'
import Button from '../../../../Components/Button';
import PlusCircle from '../../../../assets/icons/PlusCircle';


type Props = {};

const Currencies: React.FC<Props> = () => {

   
  const oneOrganization = {

    organizationName: "Tech Electronics",
    organizationId: 56565434556,
  };

  return (
    <div
      className="px-3 pt-3 overflow-y-scroll hide-scrollbar"
      style={{ height: "92vh" }}
    >
      <div className="bg-[#F7E7CE] rounded-md flex h-[148px]">
        <div className="ms-2 p-2 text-center mt-3 items-center flex">
          <div>
            <p className="bg-gray text-sm w-fit text-yellow-50 rounded-md p-2">
              Organization
            </p>

            <div className="flex mt-1">
              <p className="mt-1 text-[#303F58]">
                <b>
                  {oneOrganization.organizationName || "Organization Profile"}
                </b>
              </p>
              <div className="ms-3 bg-white rounded-md p-1 text-textColor">
                ID: {oneOrganization.organizationId || 852749}
              </div>
            </div>
          </div>
        </div>

        <div className="flex ml-auto w-fit">
          <img src={bgImage} className="bottom-0 top-8 mt-auto" alt="Organization Background" />
          
        </div>
       
      </div>
      <div className="p-2 flex items-center ">
        <p className="font-bold">Currencies</p>
        
        <div className="ml-auto flex gap-4 items-center">
          {/* <div className='flex'>
 <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={isPdfView} onChange={handleToggle} />
                                <div className={`w-[37px] h-[20px] rounded-full shadow-inner transition-colors ${isPdfView ? 'bg-checkBox' : 'bg-dropdownBorder'}`}></div>
                                <div className={`dot absolute items-center center w-2 h-2 bg-white rounded-full top-1 transition-transform ${isPdfView ? 'transform translate-x-full left-2' : 'left-1'}`}></div>
                            </div>
                                <div className="ml-3 text-textColor font-semibold text-base"></div>
                            </label>
                            <p className="text-sm text-textColor">Enable Exchange Rate Feeds</p>

          </div> */}
          
         
        <Button 
        variant="primary"
        size="sm"
        
       ><PlusCircle color={'white'}/>New Currency</Button>     
        </div>
        </div>
<div className="bg-white p-3">    <CurrencyTable /></div>
  
    </div>
  );
};

export default Currencies;
