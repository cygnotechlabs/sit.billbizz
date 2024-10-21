import { FormEvent,useEffect,useState } from "react";
import Button from "../../../Components/Button";

import bgImage from "../../../assets/Images/12.png";

import Modal from "../../../Components/model/Modal";
import { endponits } from "../../../Services/apiEndpoints";
import useApi from "../../../Hooks/useApi";
import toast, { Toaster } from "react-hot-toast";
import Pen from "../../../assets/icons/Pen";
// import { UnitResponseContext } from "../../../context/ContextShare";

type Props = {unit:any};

interface UnitData  {
  unitName: string;
  symbol : string;
  quantityCode:string;
  precision: string;
}


const EditUnitMeasurement = ({unit}: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [initialUnitData, setInitialUnitData] = useState<UnitData>(
    {
    unitName: "",
      symbol: "",
      quantityCode:"",
      precision:"",
    
    });
    
    // const {setUnitResponse}=useContext(UnitResponseContext)!;
   
console.log(unit,"unit");

  const{ request :addnewunit}=useApi("post",5003); 
  const{ request :getoneunit}=useApi("get",5003); 

  console.log(initialUnitData);



  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, } = event.target;

   setInitialUnitData({...initialUnitData,[name]:value})
  };

console.log(unit,"unit");


 

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  const saveInFeild = async () => {


    
    try {
      const url =  `${endponits.GET_ONE_UNIT}/${unit._id}`;
      const body = initialUnitData;
     
      const { response, error } = await getoneunit(url, body);
      if (!error && response) {
        setInitialUnitData(response.data);
     console.log(response);
        
        


      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    
    try {
      const url =  `${endponits.ADD_UNIT}`;
     
     
      const { response, error } = await addnewunit(url);
      if (!error && response) {
        toast.success(response.data.message);
     console.log(response);
     setModalOpen(false);
        setInitialUnitData(  {
          unitName: "",
            symbol: "",
            quantityCode:"",
            precision:"",
          
          });


      } else {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };


useEffect(() => {
     saveInFeild()
  }, []);

  return (
    <div>
      <div>
    

      <button onClick={() => openModal()} className="flex items-center">
  <div className="flex items-center mb-1"> {/* Adjust margin-bottom as needed */}
    <Pen color={"blue"} />
  </div>
</button>




        <Modal open={isModalOpen} onClose={closeModal}  style={{width:"39%"}}>
          <div className="p-5 mt-3 text-start">
            <div className="mb-5 flex p-4 rounded-xl bg-CreamBg relative overflow-hidden">
              <div
                className="absolute top-0 -right-8 w-[178px] h-[89px]"
                style={{
                  backgroundImage: `url(${bgImage})`,
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-textColor">
                  Edit Unit of Measurement
                </h3>
                <p className="text-dropdownText font-semibold text-sm mt-2">
                  Quantify and manage the quantities of products{" "}
                </p>
              </div>
              <div
                className="ms-auto text-3xl cursor-pointer relative z-10"
                onClick={closeModal}
              >
                &times;
              </div>
            </div>

            <form  onSubmit={handleSave} className="">
              <div className="">
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-labelColor">
                    Unit Name
                  </label>
                  <input
                    type="text"
                    name="unitName"
                    value={initialUnitData.unitName}
                    placeholder="Name"
                    onChange={handleInputChange}
                    className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-10"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1 text-labelColor">
                    Symbol
                  </label>
                  <input
                    type="text"
                  name="symbol"
                    value={initialUnitData.symbol}
                    placeholder="Symbol"
                    onChange={handleInputChange}
                    className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-labelColor">
                    Unit Quantity
                  </label>
                  <div className="relative w-full">
 <input
type="text"
name="quantityCode"
  value={initialUnitData.quantityCode}
  placeholder="Unit Quantity"
  onChange={handleInputChange}
className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-10">

</input>
                  
                  </div>
                </div>

                <div>
  <label className="block text-sm my-3 text-labelColor">
    Unit Precision
  </label>
  <div className="relative w-full">
  <input 

type="text"
name= "precision"
  value={initialUnitData.precision}
  placeholder="Unit Precision"
  onChange={handleInputChange}
  className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-10"></input>
  
   
  </div>
</div>


                <br />
                <div className="flex justify-end gap-2 mb-3">

                 
                  <Button type="submit" variant="primary" size="sm">
                    Save
                  </Button>
                   <Button  variant="secondary" size="sm">

                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default EditUnitMeasurement;
