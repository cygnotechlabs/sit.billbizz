import { ChangeEvent, FormEvent, useContext, useState } from "react";
import PlusCircle from "../../../../assets/icons/PlusCircle";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/model/Modal";
import bgImage from "../../../../assets/Images/14.png";
import TaxImage from "../../../../assets/Images/Tax-bro 1.png";
import useApi from "../../../../Hooks/useApi";
import { endponits } from "../../../../Services/apiEndpoints";
import { VatResponseContext } from "../../../../context/ContextShare";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

function CreateNewTaxVat({}: Props) {
  const initialTaxVat = {
    organizationId: "INDORG0001",
    taxType: "VAT",
    vatTaxRate: {
      taxName: "",
      taxRate: "",
    },
  };

  const [taxVat, setTaxVat] = useState(initialTaxVat);
  const { request: CreateTaxVat } = useApi("post", 5004);
  const { setVatResponse } = useContext(VatResponseContext)!;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaxVat((prevTaxVat) => ({
      ...prevTaxVat,
      vatTaxRate: {
        ...prevTaxVat.vatTaxRate,
        [name]: value,
      },
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${endponits.ADD_NEW_TAX}`;
      const body = taxVat;
      const { response, error } = await CreateTaxVat(url, body);
      if (!error && response) {
        toast.success(response.data.message);
        setVatResponse((prevVatResponse: any) => ({
          ...prevVatResponse,
          ...response.data,  
        }));
        setTaxVat(initialTaxVat);
        closeModal();
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Button onClick={openModal} className="text-sm font-medium" size="sm">
        <PlusCircle color="white" /> New Tax
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
            <h3 className="text-xl font-bold text-textColor">Create New VAT</h3>
            <p className="text-dropdownText font-semibold text-sm mt-2">
              Fill in the details to add a new VAT tax rate.
            </p>
          </div>
          <div
            className="ms-auto text-3xl cursor-pointer relative z-10"
            onClick={closeModal}
          >
            &times;
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="flex items-center mt-6">
            <div>
              <img src={TaxImage} alt="Tax" />
            </div>
            <div className="ms-6 w-[70%]">
              <div className="text-dropdownText text-sm">
                <label htmlFor="taxName">Tax Name</label>
                <input
                  type="text"
                  name="taxName"
                  value={taxVat.vatTaxRate.taxName}
                  onChange={handleChange}
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                  placeholder="Enter tax name"
                  required
                />
              </div>
              <div className="text-dropdownText text-sm mt-4">
                <label htmlFor="taxRate">Rate</label>
                <input
                  type="text"
                  name="taxRate"
                  value={taxVat.vatTaxRate.taxRate}
                  onChange={handleChange}
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                  placeholder="Enter tax rate"
                  required
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
            <Button
              variant="primary"
              className="pl-10 pr-10 h-[38px]"
              size="sm"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default CreateNewTaxVat;
