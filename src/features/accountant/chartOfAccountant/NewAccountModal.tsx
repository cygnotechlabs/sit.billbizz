import { useState } from "react";
import Button from "../../../Components/Button";
import CirclePlus from "../../../assets/icons/circleplus";
import CashImage from "../../../assets/Images/CashImage.png";
import bgImage from "../../../assets/Images/Frame 6.png";
import chartOfAcc from "../../../assets/constants/chartOfAcc";
import Modal from "../../../Components/model/Modal";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";
import CehvronDown from "../../../assets/icons/CehvronDown";

type Props = {};

function NewAccountModal({}: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { request: NewAccount } = useApi("post", 5001);
  const [formValues, setFormValues] = useState({
    organizationId: "INDORG0001",
    accountName: "",
    accountCode: "",
    accountSubhead: "",
    accountHead: "",
    accountGroup: "",
    description: "",
    bankAccNum: "", // Added bank fields to the form state
    bankIfsc: "",
    bankCurrency: "",
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
    try {
      const url = `${endponits.Add_NEW_ACCOUNT}`;
      const body = formValues;
      const { response, error } = await NewAccount(url, body);
      closeModal();
      if (!error && response) {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const accountCategories = {
    Asset: {
      Asset: [
        "Asset",
        "Current asset",
        "Cash",
        "Bank", // Bank category
        "Fixed asset",
        "Stock",
        "Payment Clearing",
        "Sundry Debtors",
      ],
      Equity: ["Equity"],
      Income: ["Income", "Other Income"],
    },
    Liability: {
      Liabilities: [
        "Current Liability",
        "Credit Card",
        "Long Term Liability",
        "Other Liability",
        "Overseas Tax Payable",
        "Sundry Creditors",
      ],
      Expenses: ["Expense", "Cost of Goods Sold", "Other Expense"],
    },
  };

  const headGroup = (accountSubhead: any) => {
    for (const [group, heads] of Object.entries(accountCategories)) {
      for (const [head, subheads] of Object.entries(heads)) {
        if (subheads.includes(accountSubhead)) {
          return { accountHead: head, accountGroup: group };
        }
      }
    }
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "accountSubhead") {
      const result = headGroup(value);
      if (result) {
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          [name]: value,
          accountHead: result.accountHead,
          accountGroup: result.accountGroup,
        }));
      } else {
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          [name]: value,
          accountHead: "",
          accountGroup: "",
        }));
      }
    } else {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <Button onClick={openModal} variant="primary">
        <CirclePlus color="white" size="16" />
        <p className="text-sm">New Account</p>
      </Button>
      <Modal open={isModalOpen} onClose={closeModal} className="w-[68%]">
        <div className="p-5 mt-3">
          <div className="mb-5 flex p-4 rounded-xl bg-CreamBg relative overflow-hidden">
            <div
              className="absolute top-0 right-16 w-[178px] h-[89px]"
              style={{ backgroundImage: `url(${bgImage})` }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-textColor">Create Account</h3>
              <p className="text-dropdownText font-semibold text-sm mt-2">
                Start your journey with us—create your account in moments!
              </p>
            </div>
            <div
              className="ms-auto text-3xl cursor-pointer relative z-10"
              onClick={closeModal}
            >
              &times;
            </div>
          </div>

          <form className="flex justify-between" onSubmit={onSubmit}>
            <div>
              <img src={CashImage} alt="Cash" />
            </div>
            <div className="w-[65%]">
              <div className="mb-4">
                <label className="block text-sm text-labelColor mb-1">
                  Account Type
                </label>
                <select
                  name="accountSubhead"
                  value={formValues.accountSubhead}
                  onChange={handleChange}
                  className="w-full border border-inputBorder rounded p-1.5 pl-2 text-sm"
                  onClick={() => headGroup(formValues.accountSubhead)}
                >
                  {chartOfAcc.map((item, index) => (
                    <optgroup
                      className="text-maroon"
                      key={index}
                      label={item.head}
                    >
                      {item.subhead.map((subitem, subindex) => (
                        <option
                          className="text-black option-spacing"
                          key={subindex}
                          value={subitem}
                        >
                          {subitem}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Conditionally render the Bank fields when "Bank" is selected */}
              {formValues.accountSubhead === "Bank" && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1 text-labelColor">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="bankAccNum"
                      value={formValues.bankAccNum}
                      onChange={handleChange}
                      placeholder="Enter Account Number"
                      className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-labelColor">
                      IFSC
                    </label>
                    <input
                      type="text"
                      name="bankIfsc"
                      value={formValues.bankIfsc}
                      onChange={handleChange}
                      placeholder="Enter IFSC"
                      className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2"
                    />
                  </div>
                  <div>
                  <label className="block text-sm mb-1 text-labelColor">
                    Currency
                  </label>
                  <div className="relative">
                    <div className="relative w-full">
                      <select
                        name="bankCurrency"
                        value={formValues.bankCurrency}
                        onChange={handleChange}
                        className="block appearance-none w-full text-zinc-400 bg-white border border-slate-200 text-sm h-[39px] pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      >
                        <option value="" className="text-gray">
                          Select currency
                        </option>
                        <option value="INR" className="text-slate-300">
                          INR
                        </option>
                        <option value="INR" className="text-slate-300">
                          USD
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <CehvronDown color="gray" />
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm mb-1 text-labelColor">
                  Account Name
                </label>
                <input
                  type="text"
                  name="accountName"
                  value={formValues.accountName}
                  onChange={handleChange}
                  placeholder="Enter Account Name"
                  className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1 text-labelColor">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  className="border-inputBorder w-full text-sm border rounded p-2 pt-5 pl-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1 text-labelColor">
                  Account Code
                </label>
                <input
                  type="text"
                  name="accountCode"
                  value={formValues.accountCode}
                  onChange={handleChange}
                  placeholder="Enter Account Code"
                  className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2"
                />
              </div>
              <br />
              <div className="flex justify-end gap-2">
                <Button
                  onClick={closeModal}
                  type="button"
                  variant="secondary"
                  className="rounded"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="rounded">
                  Add Account
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default NewAccountModal;
