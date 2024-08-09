import { useState } from "react";
import PlusCircle from "../../../../assets/icons/PlusCircle";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/model/Modal";
import bgImage from "../../../../assets/Images/14.png";

type Props = {};

const taxes = [
  { id: 1, label: "CGST0", percentage: "0%" },
  { id: 2, label: "CGST14", percentage: "14%" },
  { id: 3, label: "CGST2.5", percentage: "2.5%" },
  { id: 4, label: "CGST6", percentage: "6%" },
  { id: 5, label: "CGST9", percentage: "9%" },
  { id: 6, label: "IGST 20", percentage: "4%" },
  { id: 7, label: "IGST0", percentage: "0%" },
  { id: 8, label: "IGST12", percentage: "12%" },
  { id: 9, label: "IGST18", percentage: "18%" },
];

function NewTaxGroup({}: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTaxes, setSelectedTaxes] = useState<number[]>([]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedTaxes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <Button
        onClick={openModal}
        variant="secondary"
        className="text-sm font-medium"
        size="sm"
      >
        <PlusCircle color="#565148" /> New Tax Group
      </Button>

      <Modal open={isModalOpen} onClose={closeModal} className="p-8 w-[55.5%]">
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
              Create New Tax Group
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

        <form>
          <div className="text-dropdownText text-sm mb-5">
            <label htmlFor="taxGroupName">Tax Group Name</label>
            <input
              type="text"
              id="taxGroupName"
              className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
              placeholder="Value"
            />
          </div>

          <div className="text-sm text-dropdownText">
            <label>Associate Taxes</label>
            <table className="w-full mt-2">
              <tbody>
                {taxes.map((tax) => (
                  <tr key={tax.id} className="h-10 border-b border-[#EAECF0]">
                    <td className="w-6 pr-9">
                    <input type="checkbox" className="form-checkbox w-5 h-5"  checked={selectedTaxes.includes(tax.id)}
                        onChange={() => handleCheckboxChange(tax.id)} />
                    </td>
                    <td className="text-left">{tax.label}</td>
                    <td className="w-1/3 text-right">{tax.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <Button
              variant="primary"
              className="pl-10 pr-10 h-[38px]"
              size="sm"
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default NewTaxGroup;
