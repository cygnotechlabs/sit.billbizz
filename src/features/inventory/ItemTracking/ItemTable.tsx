import { useEffect, useRef, useState } from "react";
import { itemTrackingHead } from "../../../assets/constants/inventory";
import Pen from "../../../assets/icons/Pen";
import Eye from "../../../assets/icons/Eye";
import Delete from "../../../assets/icons/Delete";
import { Link } from "react-router-dom";
import Modal from "../../../Components/model/Modal";
import Button from "../../../Components/Button";

type Props = {};

const ItemTable = ({}: Props) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const data = [
    {
      date: "12/05/2020",
      itemName: "iphone",
      operation: "Purchase",
      unitQuantity: "10",
      stakeholder: "Pheobe Buffay",
    },
    {
      date: "12/05/2020",
      itemName: "Samsung Galaxy",
      operation: "Sale",
      unitQuantity: "20",
      stakeholder: "Monica Geller",
    },
    {
      date: "12/05/2020",
      itemName: "iphone 15 pro",
      operation: "Purchase",
      unitQuantity: "9",
      stakeholder: "Rachel Green",
    },
  ];

  const toggleDropdown = (index: number | null) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      toggleDropdown(null);
    }
  };

  useEffect(() => {
    if (openDropdownIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownIndex]);

  const openModal = (item: any) => { // Adjust type as necessary
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="bg-white p-5 mt-7 rounded-lg relative">
      <div className="rounded-lg border-2 border-tableBorder">
        <table className="min-w-full bg-white relative pb-4">
          <thead className="text-[12px] text-center text-dropdownText">
            <tr className="bg-lightPink">
              {itemTrackingHead.map((item, index) => (
                <th
                  className="py-2 px-4 font-medium border-b border-tableBorder relative"
                  key={index}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-dropdownText text-center text-[13px] relative">
            {data.map((item, index) => (
              <tr className="relative" key={index}>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.date}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.itemName}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.operation}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.unitQuantity}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder">{item.stakeholder}</td>
                <td className="cursor-pointer relative py-1.5 px-4 border-y items-center flex justify-center border-tableBorder">
                  <div>
                    <button
                      className="flex items-center gap-2 border py-1 px-4 rounded-lg"
                      onClick={() => openModal(item)}
                    >
                      View
                    </button>
                  </div>
                  {openDropdownIndex === index && (
                    <div
                      ref={dropdownRef}
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                    >
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link to={"/inventory/unit/unit-conversion"}>
                          <button
                            className="flex px-4 py-2 text-sm text-gray-700 hover:bg-red-100 w-full border-y border-stone-100 gap-2"
                            role="menuitem"
                          >
                            <Eye color="currentColor" />
                            View Unit Conversion
                          </button>
                        </Link>
                        <button
                          className="flex px-4 py-2 text-sm text-gray-700 hover:bg-red-100 border-y border-stone-100 w-full relative gap-2"
                          role="menuitem"
                        >
                          <Delete color="currentColor" />
                          Delete Measurement
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal open={isModalOpen} onClose={closeModal} style={{ width: "80%" }}>
        {selectedItem ? (
          <div className="px-8 py-6 bg-white rounded-lg">
            {/* Modal Header */}
            <div className="flex justify-between mb-2">
              <p className="text-textColor font-bold text-xl">Item Tracking Info</p>
              <div className="text-3xl font-light cursor-pointer relative z-10" onClick={closeModal}>
                &times;
              </div>
            </div>

            <div className="flex gap-6">
              {/* Left Section (Image and Actions) */}
              <div className="p-6 rounded-lg bg-[#F3F3F3] w-[35%] h-[50%] flex flex-col items-center justify-center">
                <img
                  src={selectedItem?.itemImage || "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"}
                  alt="Item image"
                  className="rounded-lg text-xs"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"; // Fallback in case image fails to load
                  }}
                />

                <div className="mt-6 flex gap-2">
                  <Button onClick={() => {}} variant="tertiary" className="text-xs font-medium h-[32px]">
                    <Pen color="#585953" /> Change image
                  </Button>
                  <Button variant="tertiary" className="text-xs font-medium h-[32px]">
                    <Delete color="#585953" /> Delete
                  </Button>
                </div>
              </div>

              {/* Right Section (Item Info) */}
              <div className="w-full">
                {/* Item Details */}
                <div className="p-3 bg-[#F3F3F3] rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-textColor text-2xl">{selectedItem.itemName || "N/a"}</p>
                      <p className="text-dropdownText text-base font-normal">{selectedItem.sku || "N/A"}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="tertiary" className="text-xs font-medium h-[32px] pl-3 pr-5" onClick={() => {}}>
                        <Pen color="#585953" /> Edit
                      </Button>
                      <div>...</div>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div className="p-2 bg-[#F3F3F3] rounded-lg mt-4">
                  <button className="px-4 py-2 rounded-lg w-[185px] text-sm font-semibold bg-BgSubhead text-textColor">
                    <span className="flex items-center justify-center gap-2">
                      <span>Icon</span> Overview
                    </span>
                  </button>
                </div>

                {/* Purchase and Sales Information */}
                <div className="bg-[#FDF8F0] rounded-lg mt-4 px-6 py-4">
                  {/* Item Details */}
                  <div className="grid grid-cols-2 gap-y-4">
                    {/* Labels */}
                    <div className="text-dropdownText font-normal text-sm space-y-4">
                      <p>Item Type</p>
                      <p>Date</p>
                      <p>Unit Quantity</p>
                      <p>Stakeholder</p>
                    </div>

                    {/* Values */}
                    <div className="font-medium text-sm space-y-4">
                      <p>{selectedItem?.itemType || "N/A"}</p>
                      <p>{selectedItem?.date || "N/A"}</p>
                      <p>{selectedItem?.unitQuantity || "N/A"}</p>
                      <p>{selectedItem?.stakeholder ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  {/* Purchase and Sales Info */}
                  <div className="grid grid-cols-2 gap-y-4 mt-6">
                    {/* Labels */}
                    <div className="col-span-2 text-left font-bold text-lg mb-4">
    <p>Purchase Information</p>
  </div>
                    <div className="text-dropdownText font-normal text-sm space-y-4">
                      <p>Cost Price</p>
                
                      <p>Purchase Account</p>
                    </div>

                    {/* Values */}
                    <div className="font-medium text-sm space-y-4">
                  
                      <p>{selectedItem?.costPrice || "Rs 30,000.00"}</p>
                      <p>{selectedItem?.purchaseAccount || "N/A"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-4 mt-6">
                    {/* Labels */}
                    <div className="col-span-2 text-left font-bold text-lg mb-4">
    <p>Information</p>
  </div>
                    <div className="text-dropdownText font-normal text-sm space-y-4">
                      <p>Cost Price</p>
                
                
                    </div>

                    {/* Values */}
                    <div className="font-medium text-sm space-y-4">
               
                      <p>{selectedItem?.costPrice || "Rs 50,000.00"}</p>
                   
                    </div>
                  </div>

                </div>

               
              </div>
            </div>
          </div>
        ) : (
          <div>No item selected</div>
        )}
      </Modal>
    </div>
  );
};

export default ItemTable;
