import { useState } from "react";
import PlusCircle from "../../../../assets/icons/PlusCircle"
import Button from "../../../../Components/Button"
import Modal from "../../../../Components/model/Modal"
import bgImage from "../../../../assets/Images/14.png";
import TaxImage from "../../../../assets/Images/Tax-bro 1.png"

type Props = {}

function CreateNewTaxVat({}: Props) {
    const [isModalOpen, setModalOpen] = useState(false);
  
    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
  return (
    <div>
         <Button onClick={openModal}  className="text-sm font-medium" size="sm"><PlusCircle color="white" />
          New Tax
          </Button>

          <Modal open={isModalOpen} onClose={closeModal} className="w-[60.4%] p-8">
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
              Create New Tax 
            </h3>
            <p className="text-dropdownText font-semibold text-sm mt-2">
              Open a new bank account swiftly and securely.
            </p>
          </div>
          <div
            className="ms-auto text-3xl cursor-pointer relative z-10"
            onClick={closeModal}
          >
            &times;
          </div>
        </div>
        <div className="flex  items-center mt-6">
            <div className="">
                <img src={TaxImage} alt="" />
            </div>
            <div className="ms-6 w-[70%]">
            <div className="text-dropdownText text-sm">
            <label htmlFor="">Tax Name</label>
            <input
              type="text"
              className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
              placeholder="Value"
            />
          </div>
            <div className="text-dropdownText text-sm mt-4">
            <label htmlFor="">Rate</label>
            <input
              type="text"
              className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
              placeholder="Cash"
            />
          </div>
            </div>
        </div>
        <div className="flex justify-end items-center mt-6 gap-2">
            <Button
              variant="secondary"
              onClick={closeModal}
              className="pl-10 pr-10 h-[38px]"
              size="sm"
            >
              Cancel
            </Button>
            <Button variant="primary" className="pl-10 pr-10 h-[38px]" size="sm">
              Save
            </Button>
          </div>
                </Modal>
    </div>
  )
}

export default CreateNewTaxVat