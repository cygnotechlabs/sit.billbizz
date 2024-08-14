import { ChangeEvent, FormEvent, useContext, useState } from "react";
import PlusCircle from "../../../../assets/icons/PlusCircle";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/model/Modal";
import bgImage from "../../../../assets/Images/14.png";
import TaxImage from "../../../../assets/Images/Tax-bro 1.png";
import useApi from "../../../../Hooks/useApi";
import { endponits } from "../../../../Services/apiEndpoints";
import { GstResponseContext } from "../../../../context/ContextShare";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

function CreateNewTax({}: Props) {
  const initialTaxGst = {
    organizationId: "INDORG0001",
    taxType: "GST",
    gstTaxRate: {
      taxName: "",
      taxRate: "",
      cgst: "",
      sgst: "",
      igst: "",
    },
  };

  const [taxGst, setTaxGst] = useState(initialTaxGst);
  const { request: CreateTaxGst } = useApi("post", 5004);
  const { setGstResponse } = useContext(GstResponseContext)!;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof typeof taxGst.gstTaxRate;
    setTaxGst((prevTaxGst) => {
      const updatedTaxGst = { ...prevTaxGst };
      if (key === "taxRate") {
        const rate = parseFloat(value) || 0;
        updatedTaxGst.gstTaxRate.cgst = (rate / 2).toString();
        updatedTaxGst.gstTaxRate.sgst = (rate / 2).toString();
        updatedTaxGst.gstTaxRate.igst = value;
      }
      updatedTaxGst.gstTaxRate[key] = value;
      return updatedTaxGst;
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${endponits.ADD_NEW_TAX}`;
      const body = taxGst;
      const { response, error } = await CreateTaxGst(url, body);
      if (!error && response) {
        toast.success(response.data.message);
        setGstResponse((prevGstResponse: any) => ({
          ...prevGstResponse,
          ...response.data,  
        }));
        setTaxGst(initialTaxGst);
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

      <Modal open={isModalOpen} onClose={closeModal} className="w-[59.4%] px-8 py-6">
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
        <form onSubmit={onSubmit}>
          <div className="flex items-center mt-6">
            <div className="">
              <img src={TaxImage} alt="" />
            </div>
            <div className="ms-6 w-[70%]">
              <div className="text-dropdownText text-sm">
                <label htmlFor="taxName">Tax Name</label>
                <input
                  type="text"
                  name="taxName"
                  value={taxGst.gstTaxRate.taxName}
                  onChange={handleChange}
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                  placeholder="Enter tax name"
                />
              </div>
              <div className="text-dropdownText text-sm mt-4">
                <label htmlFor="taxRate">Rate</label>
                <input
                  type="text"
                  name="taxRate"
                  value={taxGst.gstTaxRate.taxRate}
                  onChange={handleChange}
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                  placeholder="Enter tax rate"
                />
              </div>
              <div className="text-dropdownText text-sm mt-4">
                <label htmlFor="cgst">CGST</label>
                <input
                  type="text"
                  name="cgst"
                  value={taxGst.gstTaxRate.cgst}
                  onChange={handleChange}
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                  placeholder="CGST"
                  readOnly
                />
              </div>
              <div className="text-dropdownText text-sm mt-4">
                <label htmlFor="sgst">SGST</label>
                <input
                  type="text"
                  name="sgst"
                  value={taxGst.gstTaxRate.sgst}
                  onChange={handleChange}
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                  placeholder="SGST"
                  readOnly
                />
              </div>
              <div className="text-dropdownText text-sm mt-4">
                <label htmlFor="igst">IGST</label>
                <input
                  type="text"
                  name="igst"
                  value={taxGst.gstTaxRate.igst}
                  onChange={handleChange}
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                  placeholder="IGST"
                  readOnly
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

export default CreateNewTax;
