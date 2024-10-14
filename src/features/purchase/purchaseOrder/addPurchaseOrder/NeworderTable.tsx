import { useEffect, useRef, useState } from "react";
import { newPurchaseOrderTableHead } from "../../../../assets/constants";
import TrashCan from "../../../../assets/icons/TrashCan";
import ChevronDown from "../../../../assets/icons/CehvronDown";
import SearchBar from "../../../../Components/SearchBar";
import { PurchaseOrder } from "./PurchaseOrderBody";
import { endponits } from "../../../../Services/apiEndpoints";
import useApi from "../../../../Hooks/useApi";
import PlusCircle from "../../../../assets/icons/PlusCircle";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

type Row = {
  itemName: string;
  itemImage?: string;
    itemId: string;
  itemQuantity: string;
  itemSellingPrice: string;
  itemDiscount: string;
  itemAmount: string;
  itemCgst: string;
  itemSgst: string;
  itemIgst: string;
  itemDiscountType: string;
  itemStock:string;
};

type Props = {
  purchaseOrderState?: PurchaseOrder;
  isIntraState?:Boolean;
  setPurchaseOrderState?: (value: any) => void;
  oneOrganization?:any
};

const NewOrderTable = ({
  purchaseOrderState,
  setPurchaseOrderState,
  isIntraState,
  oneOrganization
}: Props) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [openDropdownType, setOpenDropdownType] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [items, setItems] = useState<any>([]);
  const { request: getAllItemsRequest } = useApi("get", 5003);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [rows, setRows] = useState<Row[]>([
    {
      itemName: "",
      itemImage: "",
      itemId: "",
      itemQuantity: "",
      itemSellingPrice: "",
      itemDiscount: "",
      itemAmount: "",
      itemSgst: "",
      itemCgst: "",
      itemIgst: "",
      itemDiscountType: "percentage",
      itemStock:"",
    },
  ]);

  const toggleDropdown = (id: number | null, type: string | null, row: Row) => {
    if (!row.itemName) {
      setOpenDropdownId((prevId) => (prevId === id ? null : id));
      setOpenDropdownType(type);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdownId(null);
      setOpenDropdownType(null);
    }
  };

  useEffect(() => {
    if (openDropdownId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  const addRow = () => {
    const newRow: any = {
      itemName: "",
      itemImage: "",
      itemId: "",
      itemQuantity: "",
      itemSellingPrice: "",
      itemDiscount: "",
      itemAmount: "",
      itemSgst: 0,
      itemCgst: 0,
      itemIgst: 0,
      itemDiscountType: "percentage",
    };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
  };

  const handleItemSelect = (item: any, index: number) => {
    setOpenDropdownId(null);
    setOpenDropdownType(null);

  
  
    const newRows = [...rows];
    newRows[index].itemName = item.itemName;
    newRows[index].itemImage = item.itemImage;
    newRows[index].itemSellingPrice = item.sellingPrice || "0";
    newRows[index].itemQuantity = "1";
    newRows[index].itemStock = item.reorderPoint;
    newRows[index].itemId = item._id;
    const sellingPrice = parseFloat(newRows[index].itemSellingPrice);
    const discountedPrice = calculateDiscountPrice(sellingPrice, newRows[index].itemDiscount, newRows[index].itemDiscountType);
    
    const { itemAmount, cgstAmount, sgstAmount, igstAmount } = calculateTax(discountedPrice, items, index, isIntraState as boolean);
  
    newRows[index].itemAmount = itemAmount;
    newRows[index].itemCgst = cgstAmount;
    newRows[index].itemSgst = sgstAmount;
    newRows[index].itemIgst = igstAmount;
  
    setRows(newRows);
    
    setPurchaseOrderState?.((prevData: any) => {
      const updatedItem = { ...newRows[index] };
      delete updatedItem.itemImage; 
  
      const updatedItemTable = prevData.itemTable.map((row: any, idx: number) => {
        return idx === index ? updatedItem : row; 
      });
  
      return {
        ...prevData,
        itemTable: updatedItemTable,
      };
    });
  };
  
  const calculateDiscountPrice = (totalSellingPrice: number, discountValue: string, discountType: string) => {
    let discount = parseFloat(discountValue) || 0;
  
    if (discountType === "percentage") {
      if (discount > 100) {
        discount = 100;
        toast.error("Discount cannot exceed 100%");
      }
      return totalSellingPrice - (totalSellingPrice * discount) / 100;
    } else {
      if (discount > totalSellingPrice) {
        discount = totalSellingPrice;
        toast.error("Discount cannot exceed the selling price");
      }
      return totalSellingPrice - discount;
    }
  };
  
  const calculateTax = (discountedPrice: number, items: any, index: number, isIntraState: boolean) => {
    const cgstPercentage = items[index]?.cgst || 0;
    const sgstPercentage = items[index]?.sgst || 0;
    const igstPercentage = items[index]?.igst || 0;
  
    if (!isIntraState) {
      const cgstAmount = ((discountedPrice * cgstPercentage) / 100).toFixed(2);
      const sgstAmount = ((discountedPrice * sgstPercentage) / 100).toFixed(2);
      return {
        itemAmount:discountedPrice.toFixed(2),
        cgstAmount,
        sgstAmount,
        igstAmount: "0.00",
      };
    } else {
      const igstAmount = ((discountedPrice * igstPercentage) / 100).toFixed(2);
      return {
        itemAmount: discountedPrice .toFixed(2),
        cgstAmount: "0.00",
        sgstAmount: "0.00",
        igstAmount,
      };
    }
  };

  const handleRowChange = (index: number, field: keyof Row, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
  
    const quantity = parseFloat(newRows[index].itemQuantity) || 0;
    const stock = parseFloat(newRows[index].itemStock) || 0; 
    const sellingPrice = parseFloat(newRows[index].itemSellingPrice) || 0;
  
    if (quantity > stock) {
      toast.error("Quantity exceeds available stock!"); 
      return;
    }
  
    const totalSellingPrice = quantity * sellingPrice;
  
    const discountedPrice = calculateDiscountPrice(totalSellingPrice, newRows[index].itemDiscount, newRows[index].itemDiscountType);
  
    const { itemAmount, cgstAmount, sgstAmount, igstAmount } = calculateTax(discountedPrice, items, index, isIntraState as boolean);
  
    newRows[index].itemAmount = itemAmount;
    newRows[index].itemCgst = cgstAmount;
    newRows[index].itemSgst = sgstAmount;
    newRows[index].itemIgst = igstAmount;
  
    setRows(newRows);
  
    setPurchaseOrderState?.((prevData: any) => {
      const updatedItem = { ...newRows[index] };
      delete updatedItem.itemImage; 
  
      const updatedItemTable = prevData.itemTable.map((row: any, idx: number) => {
        return idx === index ? updatedItem : row; 
      });
  
      return {
        ...prevData,
        itemTable: updatedItemTable,
      };
    });
  };


useEffect(() => {
  const updatedRows = rows.map((row, index) => {
      const discountedPrice = parseFloat(row.itemAmount) || 0; 
      const taxDetails = calculateTax(discountedPrice, items, index, isIntraState as boolean);
      return {
          ...row,
          itemAmount: taxDetails.itemAmount,
          itemCgst: taxDetails.cgstAmount,
          itemSgst: taxDetails.sgstAmount,
          itemIgst: taxDetails.igstAmount,
      };
  });

  setRows(updatedRows);
}, [purchaseOrderState?.destinationOfSupply, purchaseOrderState?.sourceOfSupply, items, isIntraState]);
  
  
  
  
  const getAllItems = async () => {
    try {
      const url = `${endponits.GET_ALL_ITEM}`;
      const apiResponse = await getAllItemsRequest(url);
      // console.log(apiResponse, "api response");
      const { response, error } = apiResponse;

      if (!error && response) {
        setItems(response.data);
        // console.log(response);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    } else {
      const newRows = [
        {
          itemName: "",
          itemQuantity: "",
          itemSellingPrice: "",
          itemDiscount: "",
          itemCgst: "0",
          itemSgst: "0",
          itemIgst: "0",
          itemAmount: "0",
          itemImage: "",
          itemId: "",
          itemDiscountType: "",
          itemStock: "",
        },
      ];
      setRows(newRows);
    }
  };
  
  


  const calculateTotalSGST = () => {
    return rows.reduce((total, row) => {
      const sgst = !isIntraState ? parseFloat(row.itemSgst) || 0 : 0;
      return total + sgst;
    }, 0);
  };

  // Function to calculate total CGST
  const calculateTotalCGST = () => { 
    return rows.reduce((total, row) => {
      // console.log(row.itemCgst,"cgst");

      const cgst = !isIntraState ? parseFloat(row.itemCgst) || 0 : 0;
      return total + cgst;

    }, 0);
  };

  // Function to calculate total IGST
  const calculateTotalIGST = () => {
    return rows.reduce((total, row) => {
      const igst = isIntraState ? parseFloat(row.itemIgst) || 0 : 0;
      return total + igst;
    }, 0);
  };

  // Function to calculate total item quantity
  const calculateTotalQuantity = () => {
    return rows.reduce((total, row) => {
      const quantity = parseFloat(row.itemQuantity) || 0; 
      return total + quantity; 
    }, 0);
  };

  const calculateDiscount = () => {
    if (purchaseOrderState?.discountType !== "Transaction Line") {
      return rows.reduce((total, row) => {
        const discount = parseFloat(row.itemDiscount) || 0; 
        const quantity = parseFloat(row.itemQuantity) || 0; 
        const sellingPrice = parseFloat(row.itemSellingPrice) || 0; 
        
        const totalSellingPrice = sellingPrice * quantity;

        if (row.itemDiscountType === "percentage") {
          return total + (totalSellingPrice * discount) / 100; 
          
        } else {
          return total + discount; 
        }
      }, 0);

    }
    
    return 0; 
  };
  
  
// Function to calculate the total subtotal
const calculateTotalSubtotal = () => {
  return rows.reduce((total, row) => {
    const itemQuantity = parseFloat(row.itemQuantity) || 0;  
    const itemPrice = parseFloat(row.itemSellingPrice) || 0;       
    const subtotal = itemQuantity * itemPrice;              
    return total + subtotal;                                 
  }, 0);
};


  useEffect(() => {
    const totalQuantity = calculateTotalQuantity();
    const totalSGST = calculateTotalSGST();
    const totalCGST = calculateTotalCGST();
    const totalIGST = calculateTotalIGST();
    const totalSellingPrice = calculateTotalSubtotal();
    const totalDiscount =calculateDiscount();

    console.log(totalDiscount,"jsdgh");
    

    setPurchaseOrderState?.((prevData: any) => ({
      ...prevData,
      totalItem: totalQuantity, 
      sgst: totalSGST,             
      cgst: totalCGST,             
      igst: totalIGST,    
      subTotal: totalSellingPrice,    
      totalItemDiscount:totalDiscount,     
    }));
  }, [rows, setPurchaseOrderState]);
  
  const filteredItems = () => {
    return items.filter((item:any) => {
      // Check if the item is already selected in the rows
      const isSelected = rows.find(row => row.itemId === item._id);
      // Only include items that are not selected
      return !isSelected && item.itemName.toLowerCase().includes(searchValue.toLowerCase());
    });
  };

  useEffect(() => {
    if (purchaseOrderState?.discountType === "Transaction Line") {
      setRows((prevData: any) => {
        // Ensure prevData is an array before mapping
        if (Array.isArray(prevData)) {
          return prevData.map((item) => ({
            ...item,
            itemDiscountType: "percentage", 
            itemDiscount: ""
          }));
        }
        return []; // Return empty array if prevData is not an array
      });
    }
  }, [purchaseOrderState?.discountType]);
  
  
  
  
  
  



  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div>
      <div className="rounded-lg border-2 border-tableBorder mt-5">
        <table className="min-w-full bg-white rounded-lg relative pb-4 border-dropdownText">
          <thead className="text-[12px] text-center text-dropdownText">
            <tr className="bg-lightPink">
              {newPurchaseOrderTableHead.map((item, index) => {
                if (
                  item === "Discount" &&
                  purchaseOrderState?.discountType === "Transaction Line"
                ) {
                  return null;
                }
                return (
                  <th
                    className="py-2 px-4 font-medium border-b border-tableBorder relative"
                    key={index}
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-dropdownText text-center text-[13px] ">
            {rows.map((row: any, index: number) => (
              <tr key={index}>
                <td className="border-y py-3 px-2 border-tableBorder">
                  <div
                    className="relative w-full"
                    onClick={() => toggleDropdown(index, "searchProduct", row)}
                  >
                    {row.itemName ? (
                      <div className="cursor-pointer gap-2 grid grid-cols-12 appearance-none items-center justify-center h-9 text-zinc-400 bg-white text-sm">
                          <div className="flex items-start col-span-4">
                            <img
                              className="rounded-full h-10 w-10 "
                              src={row.itemImage}
                              alt=""
                            />
                          </div>
                          <div className="col-span-8  text-start">
                            <p className="text-textColor">{row.itemName}</p>
                          </div>
                      </div>
                    ) : (
                      <div className="cursor-pointer flex appearance-none items-center justify-center h-9 text-zinc-400 bg-white text-sm">
                        <p>Type or click</p>
                        <ChevronDown color="currentColor" />
                      </div>
                    )}
                  </div>
                  {openDropdownId === index &&
                    openDropdownType === "searchProduct" && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-10 bg-white shadow rounded-md mt-1 p-2 w-[40%] space-y-1"
                      >
                        <SearchBar
                          searchValue={searchValue}
                          onSearchChange={setSearchValue}
                          placeholder="Select Item"
                        />
                        {items.length > 0 ? (
                          filteredItems().map((item: any, idx: number) => (
                            <div
                              key={idx}
                              className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointer border border-slate-400 rounded-lg bg-lightPink"
                              onClick={() => handleItemSelect(item, index)} 
                            >
                              <div className="col-span-2 flex justify-center">
                                <img
                                  className="rounded-full h-10"
                                  src={item.itemImage}
                                  alt=""
                                />
                              </div>
                              <div className="col-span-10 flex">
                                <div className="text-start">
                                  <p className="font-bold text-sm text-black">
                                    {item.itemName}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Rate: RS.{item.sellingPrice}
                                  </p>
                                </div>
                                <div className="ms-auto text-2xl cursor-pointer relative -mt-2 pe-2">
                                  &times;
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center border-slate-400 border rounded-lg">
                            <p className="text-[red] text-sm py-4">Items Not Found!</p>
                          </div>
                        )}
                        <div>
                      <Link to={"/inventory/Item/new"}>
                          <button
            className="bg-darkGreen text-darkRed rounded-lg py-4 px-6 flex items-center text-sm font-bold border-slate-400 border gap-2 w-full hover:bg-lightRed"
          >
            <PlusCircle color="darkRed" />
         <p>   Add New Item</p>
          </button>
                      </Link>
                        </div>
                      </div>
                    )}
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <input
                    type="text"
                    placeholder="0"
                    className="w-[50px]  focus:outline-none "
                    value={row.itemQuantity}
                    onChange={(e) =>
                      handleRowChange(index, "itemQuantity", e.target.value)
                    }
                  />
                <div className="text-start text-[10px]">  <p>Stock OnHand:<b className="text-[12px]">{row.itemStock}</b> </p></div>
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <input
                    type="text"
                    placeholder="0"
                    className="w-[50px]  focus:outline-none text-center"
                    value={row.itemSellingPrice}
                    onChange={(e) =>
                      handleRowChange(index, "itemSellingPrice", e.target.value)
                    }
                    disabled
                  />
                </td>
                  <td className="py-2.5 px-4 border-y border-tableBorder">
                    <input
                    disabled
                      type="text"
                      placeholder="0"
                      className="w-[50px]  focus:outline-none text-center"
                      value={!isIntraState ? (parseFloat(row.itemCgst) + parseFloat(row.itemSgst)).toFixed(2) : row.itemIgst }
                    
                    />
                  </td>
                {purchaseOrderState?.discountType !== "Transaction Line" && (

                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <div className="flex items-center justify-center gap-2 w-full">
                    <input
                      type="text"
                      placeholder="0"
                      className="w-[50px]  focus:outline-none text-center"
                      value={row.itemDiscount}
                      onChange={(e) =>
                        handleRowChange(index, "itemDiscount", e.target.value)
                      }
                    />
                    <div className="relative">
                      <select
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            "itemDiscountType",
                            e.target.value
                          )
                        }
                        value={row.itemDiscountType}
                        className="text-xs appearance-none w-[60px] p-1 text-zinc-400 bg-white border border-inputBorder rounded-lg"
                      >
                        <option value="percentage">%</option>
                        <option value={oneOrganization.baseCurrency}>{oneOrganization.baseCurrency}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown color="gray" height={15} width={15} />
                      </div>
                    </div>
                  </div>
                </td>
                                )}

                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <input
                    disabled
                    type="text"
                    placeholder="0"
                    className="w-[50px]  focus:outline-none text-center"
                    value={row.itemAmount}
                    onChange={(e) =>
                      handleRowChange(index, "itemAmount", e.target.value)
                    }
                  />
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <div
                    className="text-center flex justify-center gap-2"
                    onClick={() => removeRow(index)}
                  >
                    <TrashCan color="darkRed" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-[60%] mt-6">
        <button
        type="button"
          className="bg-darkGreen text-darkRed rounded-lg py-2 px-6 flex items-center text-sm font-bold"
          onClick={addRow}
        >
          <PlusCircle color="darkRed" />
          Add Item
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={true} />

    </div>
  );
};

export default NewOrderTable;
