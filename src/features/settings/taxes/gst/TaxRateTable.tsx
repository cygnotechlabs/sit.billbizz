import { useState } from "react";
import SearchBar from "../../../../Components/SearchBar";
import Button from "../../../../Components/Button";
import ListIcon from "../../../../assets/icons/ListIcon";
import PencilIcon from "../../../../assets/icons/PencilIcon";
import TrashCan from "../../../../assets/icons/TrashCan";
import Modal from "../../../../Components/model/Modal";
import bgImage from "../../../../assets/Images/14.png";
import TaxImage from "../../../../assets/Images/Tax-bro 1.png";
import ViewTaxDetails from "./ViewTaxDetails";

type TaxRate = {
  id: string;
  name: string;
  rate: string;
  cgst: string;
  sgst: string;
  igst: string;
};

const initialTaxData: TaxRate[] = [
  { id: "001", name: "GST30", rate: "30%", cgst: "15%", sgst: "15%", igst: "30%" },
  { id: "002", name: "GST60", rate: "60%", cgst: "30%", sgst: "30%", igst: "60%" },
];

type Props = {};

function TaxRateTable({ }: Props) {
  const [search, setSearch] = useState<string>("");
  const [taxData, setTaxData] = useState<TaxRate[]>(initialTaxData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTaxRate, setCurrentTaxRate] = useState<TaxRate | null>(null);
  const [selectedTaxRate, setSelectedTaxRate] = useState<TaxRate | null>(null);

  const filteredTaxRates = taxData.filter((taxRate) =>
    taxRate.name.toLowerCase().includes(search.toLowerCase())
  );

  const tableHeaders = ["Tax Name", "Rate", "CGST", "SGST", "IGST", "Action"];

  const handleEditClick = (taxRate: TaxRate) => {
    setCurrentTaxRate(taxRate);
    setIsModalOpen(true);
  };

  const handleViewClick = (taxRate: TaxRate) => {
    setSelectedTaxRate(taxRate);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (currentTaxRate) {
      setTaxData(prevData =>
        prevData.map(rate => rate.id === currentTaxRate.id ? currentTaxRate : rate)
      );
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-5">
        <div className="w-[89%]">
          <SearchBar placeholder="Search Taxes" onSearchChange={setSearch} searchValue={search} />
        </div>
        <Button variant="secondary" size="sm">
          <ListIcon color="#565148" />{" "}
          <p className="text-sm font-medium text-outlineButton">Sort By</p>
        </Button>
      </div>
      <div className="max-h-[25rem] overflow-y-auto mt-3">
        <table className="min-w-full bg-white mb-5">
          <thead className="text-[12px] text-center text-textColor sticky top-0 z-10">
            <tr style={{ backgroundColor: "#F9F7F0" }}>
              <th className="py-3 px- border-b border-tableBorder">
                <input type="checkbox" className="form-checkbox w-4 h-4" />
              </th>
              {tableHeaders.map((heading, index) => (
                <th className="py-2 px-4 font-medium border-b border-tableBorder" key={index}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-dropdownText text-center text-[13px]">
            {filteredTaxRates.map((item) => (
              <tr key={item.id} className="relative">
                <td className=" border-y border-tableBorder">
                  <input type="checkbox" className="form-checkbox w-4 h-4" />
                </td>
                <td className="py-2.5 border-y border-tableBorder">{item.name}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.rate}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.cgst}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.sgst}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.igst}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <div className="flex justify-center cursor-pointer gap-3">
                    <div onClick={() => handleViewClick(item)}>
                      <ViewTaxDetails taxRate={selectedTaxRate} />
                    </div>
                    <div onClick={() => handleEditClick(item)}>
                      <PencilIcon color="#3C7FBC" />
                    </div>
                    <div>
                      <TrashCan color="red" />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentTaxRate && (
       <Modal open onClose={() => setIsModalOpen(false)} className="w-[59.4%] px-8 py-6">
       <div className="mb-5 flex p-4 rounded-xl bg-CreamBg relative overflow-hidden">
         <div
           className="absolute top-0 -right-8 w-[178px] h-[89px]"
           style={{
             backgroundImage: `url(${bgImage})`,
             backgroundRepeat: "no-repeat",
           }}
         ></div>
         <div className="relative z-10">
           <h3 className="text-xl font-bold text-textColor">Edit Tax Rate</h3>
           <p className="text-dropdownText font-semibold text-sm mt-2">
             Modify the existing tax details as necessary.
           </p>
         </div>
         <div
           className="ms-auto text-3xl cursor-pointer relative z-10"
           onClick={() => setIsModalOpen(false)}
         >
           &times;
         </div>
       </div>
     
       <div className="flex items-center mt-6">
         <div className="">
           <img src={TaxImage} alt="Tax" />
         </div>
         <div className="ms-6 w-[70%]">
           <div className="text-dropdownText text-sm">
             <label htmlFor="">Tax Name</label>
             <input
               type="text"
               value={currentTaxRate?.name || ""}
               onChange={(e) =>
                 setCurrentTaxRate({ ...currentTaxRate, name: e.target.value })
               }
               className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
               placeholder="Enter tax name"
             />
           </div>
           <div className="text-dropdownText text-sm mt-4">
             <label htmlFor="">Rate</label>
             <input
               type="text"
               value={currentTaxRate?.rate || ""}
               onChange={(e) =>
                 setCurrentTaxRate({ ...currentTaxRate, rate: e.target.value })
               }
               className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
               placeholder="Enter tax rate"
             />
           </div>
           <div className="text-dropdownText text-sm mt-4">
             <label htmlFor="">CGST</label>
             <input
               type="text"
               value={currentTaxRate?.cgst || ""}
               onChange={(e) =>
                 setCurrentTaxRate({ ...currentTaxRate, cgst: e.target.value })
               }
               className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
               placeholder="CGST"
             />
           </div>
           <div className="text-dropdownText text-sm mt-4">
             <label htmlFor="">SGST</label>
             <input
               type="text"
               value={currentTaxRate?.sgst || ""}
               onChange={(e) =>
                 setCurrentTaxRate({ ...currentTaxRate, sgst: e.target.value })
               }
               className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
               placeholder="SGST"
             />
           </div>
           <div className="text-dropdownText text-sm mt-4">
             <label htmlFor="">IGST</label>
             <input
               type="text"
               value={currentTaxRate?.igst || ""}
               onChange={(e) =>
                 setCurrentTaxRate({ ...currentTaxRate, igst: e.target.value })
               }
               className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
               placeholder="IGST"
             />
           </div>
         </div>
       </div>
     
       <div className="flex justify-end items-center mt-6 gap-2">
         <Button
           variant="secondary"
           onClick={() => setIsModalOpen(false)}
           className="pl-10 pr-10 h-[38px]"
           size="sm"
         >
           Cancel
         </Button>
         <Button
           variant="primary"
           onClick={handleFormSubmit}
           className="pl-10 pr-10 h-[38px]"
           size="sm"
         >
           Save
         </Button>
       </div>
     </Modal>
     
      )}
    </div>
  );
}

export default TaxRateTable;
