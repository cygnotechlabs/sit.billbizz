import { useState } from "react";
import PlusCircle from "../../../../assets/icons/PlusCircle";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/model/Modal";
import bgImage from "../../../../assets/Images/14.png";
import CehvronDown from "../../../../assets/icons/CehvronDown";

type Props = {};

function AddAddress({}: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openModal = (editing: boolean) => {
    setModalOpen(true);
    setIsEditing(editing);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex gap-4">
        <Button
          variant="secondary"
          size="sm"
          className="text-sm font h-8"
          onClick={() => openModal(true)}
        >
          Change Address
        </Button>
        <Button
          onClick={() => openModal(false)}
          variant="secondary"
          size="sm"
          className="text-sm font h-8"
        >
          <PlusCircle color="#565148" /> Add New Address
        </Button>
      </div>

      <Modal open={isModalOpen} onClose={closeModal} className="w-[43.4%] p-6">
        <div className="mb-5 flex p-4 rounded-lg bg-CreamBg relative overflow-hidden">
          <div
            className="absolute top-0 -right-8 w-[178px] h-[89px]"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-textColor">
              {isEditing ? "Edit Address" : "New Address"}
            </h3>
          </div>
          <div
            className="ms-auto text-3xl font-light cursor-pointer relative z-10"
            onClick={closeModal}
          >
            &times;
          </div>
        </div>

        <form>
          {/* Form Fields */}
          <div className="text-dropdownText text-sm">
            <label htmlFor="">Attention</label>
            <input
              type="text"
              className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
              placeholder="Value"
            />
          </div>
          <div className="text-dropdownText text-sm mt-3">
            <label htmlFor="">Street 1</label>
            <input
              type="text"
              className="pl-2 pb-7 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-16 p-2"
              placeholder="Value"
            />
          </div>
          <div className="text-dropdownText text-sm mt-3">
            <label htmlFor="">Street 2</label>
            <input
              type="text"
              className="pl-2 pb-7 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-16 p-2"
              placeholder="Value"
            />
          </div>
          <div className="text-dropdownText text-sm mt-3">
            <label htmlFor="">City</label>
            <input
              type="text"
              className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-7 p-2"
              placeholder="Value"
            />
          </div>

          <div className="flex justify-between items-center gap-5">
            <div className="w-[50%]">
              <div className="text-dropdownText text-sm mt-3">
                <label htmlFor="">State/Province</label>
                <input
                  type="text"
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-7 p-2"
                  placeholder="Value"
                />
              </div>
              <div className="text-dropdownText text-sm mt-3">
                <label htmlFor="">Country / Region</label>
                <div className="relative w-full mt-1">
                  <select
                    className="block appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="currency"
                  >
                    <option value="INR" className="text-gray">
                      Indian
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[50%]">
              <div className="text-dropdownText text-sm mt-4">
                <label htmlFor="">ZIP/Postal Code</label>
                <input
                  type="text"
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                  placeholder="Value"
                />
              </div>
              <div className="text-dropdownText text-sm mt-3">
                <label htmlFor="">Phone</label>
                <input
                  type="text"
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                  placeholder="Value"
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
        </form>
      </Modal>
    </div>
  );
}

export default AddAddress;
