import { useState } from "react";
import ListIcon from "../../../assets/icons/ListIcon";
import PlusCircle from "../../../assets/icons/PlusCircle";
import Button from "../../../Components/Button";
import SearchBar from "../../../Components/SearchBar";
import Banner from "../banner/Banner";
import Ellipsis from "../../../assets/icons/Ellipsis";
import Pen from "../../../assets/icons/Pen";
import Modal from "../../../Components/model/Modal";
import CustomiseColmn from "./CustomiseColmn ";
import bgImage from "../../../assets/Images/14.png";

// Define the data types
type Column = {
  id: string;
  label: string;
  visible: boolean;
};

type SeriesData = {
  seriesName: string;
  vendorPayment: string;
  retainerInvoice: string;
  purchaseOrder: string;
  creditNote: string;
};

type SeriesModalData = {
  module: string;
  prefix: string;
  startingNumber: string;
  preview: string;
};

function TransactionNumber() {
  const initialData: SeriesData[] = [
    { seriesName: "Default Transaction Series", vendorPayment: "VP-0001", retainerInvoice: "RET-0001", purchaseOrder: "PO-0001", creditNote: "CN-0001" },
    { seriesName: "Data series", vendorPayment: "VO-0001", retainerInvoice: "ROT-0002", purchaseOrder: "YU-0001", creditNote: "AC-0001" },
  ];

  const initialModalData: SeriesModalData[] = [
    { module: "Credit Note", prefix: "CN-", startingNumber: "0001", preview: "CN-0001" },
    { module: "Customer Payment", prefix: "CP", startingNumber: "0001", preview: "CP-0001" },
    { module: "Purchase Order", prefix: "PO-", startingNumber: "0001", preview: "PO-0001" },
    { module: "Sales Order", prefix: "SO-", startingNumber: "0001", preview: "SO-0001" },
    { module: "Vendor Payment", prefix: "VP-", startingNumber: "0001", preview: "VP-0001" },
    { module: "Retainer Invoice", prefix: "RI-", startingNumber: "0001", preview: "RI-0001" },
    { module: "Bill Of Supply", prefix: "BS-", startingNumber: "0001", preview: "BS-0001" },
    { module: "Invoice", prefix: "IN-", startingNumber: "0001", preview: "IN-0001" },
    { module: "Delivery Challan", prefix: "DC-", startingNumber: "0001", preview: "DC-0001" },
  ];

  const initialColumns: Column[] = [
    { id: "seriesName", label: "Series Name", visible: true },
    { id: "vendorPayment", label: "Vendor Payment", visible: true },
    { id: "retainerInvoice", label: "Retainer Invoice", visible: true },
    { id: "purchaseOrder", label: "Purchase Order", visible: true },
    { id: "creditNote", label: "Credit Note", visible: true },
    { id: "actions", label: "Actions", visible: true },
  ];

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("New Transaction Number Series");
  const [modalAction, setModalAction] = useState<string>("Create"); // "Create" or "Edit"
  const [editData, setEditData] = useState<SeriesData | null>(null);

  const [data, setData] = useState<SeriesData[]>(initialData);
  console.log(setData);

  const [modalData] = useState<SeriesModalData[]>(initialModalData);
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [search, setSearch] = useState<string>("");

  const openModal = (action: string, seriesData?: SeriesData) => {
    if (action === "Edit" && seriesData) {
      setEditData(seriesData);
      setModalTitle("Edit Transaction Number Series");
      setModalAction("Edit");
    } else {
      setEditData(null);
      setModalTitle("New Transaction Number Series");
      setModalAction("Create");
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-5">
      <Banner />
      <div className="mt-5 flex gap-7 rounded-[40px] bg-[#EAEBEB] p-3">
        <button
          className="px-4 py-2 rounded-[40px] text-sm bg-white font-semibold text-dropdownText"
        >
          Transaction Number Series
        </button>
      </div>

      <div className="flex justify-between mt-4">
        <p className="text-textColor font-bold text-lg">Transaction Number Series</p>
        <div className="flex gap-4">
          <Button className="text-sm font-medium" onClick={() => openModal("Create")} size="sm">
            <PlusCircle color="white" /> New Series
          </Button>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="px-8 py-4 w-[52.5%]"
      >
        <div className="mb-5">
          <div className="mb-5 flex p-4 rounded-xl bg-CreamBg relative overflow-hidden">
            <div
              className="absolute top-0 -right-8 w-[178px] h-[89px]"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-textColor">{modalTitle}</h3>
            </div>
            <div
              className="ms-auto text-3xl cursor-pointer relative z-10"
              onClick={closeModal}
            >
              &times;
            </div>
          </div>
          <form>
            <div className="text-dropdownText text-sm mb-5 flex items-center gap-2">
              <label htmlFor="seriesName" className="font-semibold">Series Name</label>
              <input
                type="text"
                id="seriesName"
                className="pl-2 text-sm w-[40%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                placeholder="Series Name"
                defaultValue={editData ? editData.seriesName : ""}
              />
            </div>

            <table className="min-w-full bg-white mb-5">
              <thead className="text-[12px] text-left text-dropdownText">
                <tr style={{ backgroundColor: "#F9F7F0" }}>
                  <th className="py-2 px-4 font-medium border-b border-tableBorder">Module</th>
                  <th className="py-2 px-4 font-medium border-b border-tableBorder">Prefix</th>
                  <th className="py-2 px-4 font-medium border-b border-tableBorder">Starting Number</th>
                  <th className="py-2 px-4 font-medium border-b border-tableBorder">Preview</th>
                </tr>
              </thead>
              <tbody className="text-dropdownText text-left text-[13px]">
                {modalData.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2.5 px-4 border-y border-tableBorder">{item.module}</td>
                    <td className="py-2.5 px-4 border-y border-tableBorder"> {item.prefix}</td>
                    <td className="py-2.5 px-4 border-y border-tableBorder">{item.startingNumber}</td>
                    <td className="py-2.5 px-4 border-y border-tableBorder">{item.preview}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end items-center mt-6 gap-2">
              <Button
                variant="secondary"
                onClick={closeModal}
                className="pl-10 pr-10 h-[38px] text-sm"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="pl-10 pr-10 h-[38px] text-sm"
                size="sm"
              >
                {modalAction === "Edit" ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <div className="bg-white rounded-lg p-5 mt-3">
        <div className="flex justify-between items-center">
          <div className="w-[89%]">
            <SearchBar
              placeholder="Search"
              onSearchChange={setSearch}
              searchValue={search}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <ListIcon color="#565148" />{" "}
              <p className="text-sm font-medium text-outlineButton">Sort By</p>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="min-w-full bg-white mb-5">
            <thead className="text-[12px] text-center text-dropdownText">
              <tr style={{ backgroundColor: "#F9F7F0" }}>
                {columns.map(
                  (col) =>
                    col.visible && (
                      <th key={col.id} className="py-2 px-4 font-medium border-b border-tableBorder">
                        {col.label}
                      </th>
                    )
                )}
                {/* CustomiseColmn as the last column header */}
                <th className="py-2 px-4 font-medium border-b border-tableBorder">
                  <div className="flex justify-center">
                    <CustomiseColmn columns={columns} setColumns={setColumns} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-dropdownText text-center text-[13px]">
              {data
                .filter((item) =>
                  item.seriesName.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, index) => (
                  <tr key={index}>
                    {columns.map(
                      (col) =>
                        col.visible && (
                          <td key={col.id} className="py-2.5 px-4 border-y border-tableBorder">
                            {col.id === "seriesName" && item.seriesName}
                            {col.id === "vendorPayment" && item.vendorPayment}
                            {col.id === "retainerInvoice" && item.retainerInvoice}
                            {col.id === "purchaseOrder" && item.purchaseOrder}
                            {col.id === "creditNote" && item.creditNote}
                            {col.id === "actions" && (
                              <Button
                                variant="secondary"
                                className="h-7 pr-3.5 text-xs font-medium"
                                onClick={() => openModal("Edit", item)}
                              >
                                <Pen color="#565148" /> Edit
                              </Button>
                            )}
                          </td>
                        )
                    )}
                    <td className="py-2.5 px-5 border-y border-tableBorder">
                      <div className="flex justify-center">
                        <Ellipsis height={16} />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionNumber;
