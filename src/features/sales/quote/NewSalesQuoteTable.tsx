import { useEffect, useRef, useState } from "react";
import { newPurchaseOrderTableHead } from "../../../assets/constants";
import TrashCan from "../../../assets/icons/TrashCan";
import ChevronDown from "../../../assets/icons/CehvronDown";
import SearchBar from "../../../Components/SearchBar";
import { endponits } from "../../../Services/apiEndpoints";
import useApi from "../../../Hooks/useApi";
import PlusCircle from "../../../assets/icons/PlusCircle";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { SalesQuote } from "../../../Types/SalesQuote";

type Row = {
  itemId: string;
  itemImage?: string,
  itemName: string;
  quantity: string;
  sellingPrice: string;
  taxPreference: string;
  taxGroup: string;
  cgst: string;
  sgst: string;
  igst: string;
  cgstAmount: string;
  sgstAmount: string;
  igstAmount: string;
  vatAmount: string;
  itemTotaltax: string;
  discountType: string;
  discountAmount: string;
  amount: string;
  itemStock: string;
};

type Props = {
  salesQuoteState?: SalesQuote;
  isIntraState?: Boolean;
  setSalesQuoteState?: (value: any) => void;
  oneOrganization?: any;
};

const NewSalesQuoteTable = ({
  salesQuoteState,
  setSalesQuoteState,
  isIntraState,
  oneOrganization,
}: Props) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [openDropdownType, setOpenDropdownType] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [items, setItems] = useState<any>([]);
  const { request: getAllItemsRequest } = useApi("get", 5003);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [rows, setRows] = useState<Row[]>([
    {
      itemId: "",
      itemImage: "",
      itemName: "",
      quantity: "",
      sellingPrice: "",
      taxPreference: "",
      taxGroup: "",
      cgst: "",
      sgst: "",
      igst: "",
      cgstAmount: "",
      sgstAmount: "",
      igstAmount: "",
      vatAmount: "",
      itemTotaltax: "",
      discountType: "percentage",
      discountAmount: "",
      amount: "",
      itemStock: "",
    },
  ]);
  console.log(rows, "rows");


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
      itemId: "",
      itemImage: "",
      itemName: "",
      quantity: "",
      sellingPrice: "",
      taxPreference: "",
      taxGroup: "",
      cgst: "",
      sgst: "",
      igst: "",
      cgstAmount: "",
      sgstAmount: "",
      igstAmount: "",
      vatAmount: "",
      itemTotaltax: "",
      discountType: "percentage",
      discountAmount: "",
      amount: "",
      itemStock: "",
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
    newRows[index].sellingPrice = item.sellingPrice || "0";
    newRows[index].quantity = "1";
    newRows[index].itemStock = item.reorderPoint;
    newRows[index].itemId = item._id;
    const sellingPrice = parseFloat(newRows[index].sellingPrice);
    const discountedPrice = calculateDiscountPrice(
      sellingPrice,
      newRows[index].discountAmount,
      newRows[index].discountType
    );

    const { itemAmount, cgstAmount, sgstAmount, igstAmount } = calculateTax(
      discountedPrice,
      items,
      index,
      isIntraState as boolean
    );

    newRows[index].amount = itemAmount;
    newRows[index].cgst = cgstAmount;
    newRows[index].sgst = sgstAmount;
    newRows[index].igst = igstAmount;



    setRows(newRows);

    setSalesQuoteState?.((prevData: any) => {
      const updatedItem = { ...newRows[index] };
      delete updatedItem.itemImage;

      const updatedItemTable = prevData.items?.map(
        (row: any, idx: number) => {
          return idx === index ? updatedItem : row;
        }
      );

      return {
        ...prevData,
        items: updatedItemTable,
      };
    });
  };

  const calculateDiscountPrice = (
    totalSellingPrice: number,
    discountValue: string,
    discountType: string
  ) => {
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

  const calculateTax = (
    discountedPrice: number,
    items: any,
    index: number,
    isIntraState: boolean
  ) => {
    const cgstPercentage = items[index]?.cgst || 0;
    const sgstPercentage = items[index]?.sgst || 0;
    const igstPercentage = items[index]?.igst || 0;


    if (!isIntraState) {
      const cgstAmount = ((discountedPrice * cgstPercentage) / 100).toFixed(2);
      const sgstAmount = ((discountedPrice * sgstPercentage) / 100).toFixed(2);
      return {
        itemAmount: discountedPrice.toFixed(2),
        cgstAmount,
        sgstAmount,
        igstAmount: "0.00",
      };
    } else {
      const igstAmount = ((discountedPrice * igstPercentage) / 100).toFixed(2);
      return {
        itemAmount: discountedPrice.toFixed(2),
        cgstAmount: "0.00",
        sgstAmount: "0.00",
        igstAmount,
      };
    }
  };

  const handleRowChange = (index: number, field: keyof Row, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };

    const quantity = parseFloat(newRows[index].quantity) || 0;
    const stock = parseFloat(newRows[index].itemStock) || 0;
    const sellingPrice = parseFloat(newRows[index].sellingPrice) || 0;

    if (quantity > stock) {
      toast.error("Quantity exceeds available stock!");
      return;
    }

    const totalSellingPrice = quantity * sellingPrice;

    const discountedPrice = calculateDiscountPrice(
      totalSellingPrice,
      newRows[index].discountAmount,
      newRows[index].discountType
    );

    const { itemAmount, cgstAmount, sgstAmount, igstAmount } = calculateTax(
      discountedPrice,
      items,
      index,
      isIntraState as boolean
    );

    newRows[index].amount = itemAmount;
    newRows[index].cgst = cgstAmount;
    newRows[index].sgst = sgstAmount;
    newRows[index].igst = igstAmount;

    setRows(newRows);

    setSalesQuoteState?.((prevData: any) => {
      const updatedItem = { ...newRows[index] };
      delete updatedItem.itemImage;

      const updatedItemTable = prevData.items?.map(
        (row: any, idx: number) => {
          return idx === index ? updatedItem : row;
        }
      );

      return {
        ...prevData,
        items: updatedItemTable,
      };
    });
  };


  useEffect(() => {
    const updatedRows = rows.map((row, index) => {
      const discountedPrice = parseFloat(row.amount) || 0;
      const taxDetails = calculateTax(
        discountedPrice,
        items,
        index,
        isIntraState as boolean
      );
      return {
        ...row,
        itemAmount: taxDetails.itemAmount,
        itemCgst: taxDetails.cgstAmount,
        itemSgst: taxDetails.sgstAmount,
        itemIgst: taxDetails.igstAmount,
      };
    });

    setRows(updatedRows);
  }, [
    salesQuoteState?.placeOfSupply,
    items,
    isIntraState,
  ]);

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
          itemId: "",
          itemImage: "",
          itemName: "",
          quantity: "",
          sellingPrice: "",
          taxPreference: "",
          taxGroup: "",
          cgst: "0",
          sgst: "0",
          igst: "0",
          cgstAmount: "",
          sgstAmount: "",
          igstAmount: "",
          vatAmount: "",
          itemTotaltax: "",
          discountType: "percentage",
          discountAmount: "",
          amount: "0",
          itemStock: "",
        },
      ];
      setRows(newRows);
    }
  };

  const calculateTotalSGST = () => {
    return rows.reduce((total, row) => {
      const sgst = !isIntraState ? parseFloat(row.sgst) || 0 : 0;
      return total + sgst;
    }, 0);
  };

  // Function to calculate total CGST
  const calculateTotalCGST = () => {
    return rows.reduce((total, row) => {
      // console.log(row.itemCgst,"cgst");

      const cgst = !isIntraState ? parseFloat(row.cgst) || 0 : 0;
      return total + cgst;
    }, 0);
  };

  // Function to calculate total IGST
  const calculateTotalIGST = () => {
    return rows.reduce((total, row) => {
      const igst = isIntraState ? parseFloat(row.igst) || 0 : 0;
      return total + igst;
    }, 0);
  };

  // Function to calculate total item quantity
  const calculateTotalQuantity = () => {
    return rows.reduce((total, row) => {
      const quantity = parseFloat(row.quantity) || 0;
      return total + quantity;
    }, 0);
  };

  const calculateDiscount = () => {
    return rows.reduce((total, row) => {
      const discount = parseFloat(row.discountAmount) || 0;
      const quantity = parseFloat(row.quantity) || 0;
      const sellingPrice = parseFloat(row.sellingPrice) || 0;

      const totalSellingPrice = sellingPrice * quantity;

      if (row.discountType === "percentage") {
        return total + (totalSellingPrice * discount) / 100;
      } else {
        return total + discount;
      }
    }, 0);

    return 0;
  };

  // Function to calculate the total subtotal
  const calculateTotalSubtotal = () => {
    return rows.reduce((total, row) => {
      const itemQuantity = parseFloat(row.quantity) || 0;
      const itemPrice = parseFloat(row.sellingPrice) || 0;
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
    const totalDiscount = calculateDiscount();

    console.log(totalDiscount, "jsdgh");

    setSalesQuoteState?.((prevData: any) => ({
      ...prevData,
      totalItem: totalQuantity,
      sgst: totalSGST,
      cgst: totalCGST,
      igst: totalIGST,
      subTotal: totalSellingPrice,
      totalItemDiscount: totalDiscount,
    }));
  }, [rows, setSalesQuoteState]);

  const filteredItems = () => {
    return items.filter((item: any) => {
      const isSelected = rows.find((row) => row.itemId === item._id);
      return (
        !isSelected &&
        item.itemName.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  };



  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div>
      <div className="rounded-lg border-2 border-tableBorder mt-5">
        <table className="min-w-full bg-white rounded-lg relative pb-4 border-dropdownText">
          <thead className="text-[12px] text-center text-dropdownText">
            <tr className="bg-lightPink">
              {newPurchaseOrderTableHead.map((item, index) => (
                <th
                  className="py-2 px-4 font-medium border-b border-tableBorder relative"
                  key={index}
                >
                  {item}
                </th>
              ))}

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
                            <p className="text-[red] text-sm py-4">
                              Items Not Found!
                            </p>
                          </div>
                        )}
                        <div>
                          <Link to={"/inventory/Item/new"}>
                            <button className="bg-darkGreen text-darkRed rounded-lg py-4 px-6 flex items-center text-sm font-bold border-slate-400 border gap-2 w-full hover:bg-lightRed">
                              <PlusCircle color="darkRed" />
                              <p> Add New Item</p>
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-[50px]  focus:outline-none "
                    value={row.quantity}
                    onChange={(e) =>
                      handleRowChange(index, "quantity", e.target.value)
                    }
                  />
                  <div className="text-start text-[10px]">
                    {" "}
                    <p>
                      Stock OnHand:
                      <b className="text-[12px]">{row.itemStock}</b>{" "}
                    </p>
                  </div>
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <input
                    type="text"
                    placeholder="0"
                    className="w-[50px]  focus:outline-none text-center"
                    value={row.sellingPrice}
                    onChange={(e) =>
                      handleRowChange(index, "sellingPrice", e.target.value)
                    }
                    disabled
                  />
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <input
                    disabled
                    type="text"
                    placeholder="0"
                    className="w-[50px] focus:outline-none text-center"
                    value={
                      !isIntraState
                        ? parseFloat(row.cgst) + parseFloat(row.sgst) === 0
                          ? "nil"
                          : (parseFloat(row.cgst) + parseFloat(row.sgst)).toFixed(2)
                        : parseFloat(row.igst) === 0 
                          ? "nil"
                          : row.igst
                    }
                  />

                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <div className="flex items-center justify-center gap-2 w-full">
                    <input
                      type="text"
                      placeholder="0"
                      className="w-[50px]  focus:outline-none text-center"
                      value={row.discountAmount}
                      onChange={(e) =>
                        handleRowChange(index, "discountAmount", e.target.value)
                      }
                    />
                    <div className="relative">
                      <select
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            "discountType",
                            e.target.value
                          )
                        }
                        value={row.discountType}
                        className="text-xs appearance-none w-[60px] p-1 text-zinc-400 bg-white border border-inputBorder rounded-lg"
                      >
                        <option value="percentage">%</option>
                        <option value="currency">
                          {oneOrganization?.baseCurrency}
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown color="gray" height={15} width={15} />
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-2.5 px-4 border-y border-tableBorder">
                  <input
                    disabled
                    type="text"
                    placeholder="0"
                    className="w-[50px]  focus:outline-none text-center"
                    value={row.amount}
                    onChange={(e) =>
                      handleRowChange(index, "amount", e.target.value)
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
      <div className="w-[60%] mt-0">
        <button
          type="button"
          className="bg-darkGreen text-darkRed rounded-lg py-2 px-1 flex items-center text-sm font-bold"
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

export default NewSalesQuoteTable;