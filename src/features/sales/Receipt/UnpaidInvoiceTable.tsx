

type Props = {};

const UnpaidInvoiceTable = ({}: Props) => {
  const head = [
    "Date",
    "Due Date",
    "Invoice Number",
    "Invoice Amount",
    "Amount Due",
    "Payment",
  ];
  const data = [
    {
      date: "31/05/2024",
      dueDate: "31/05/2024",
      invoiceNumber: "INV001",
      invoiceAmount: 1000,
      amountDue: 1000,
      payment: 15,
    },
    {
      date: "31/05/2024",
      dueDate: "31/05/2024",
      invoiceNumber: "INV002",
      invoiceAmount: 2000,
      amountDue: 2000,
      payment: 15,
    },
  ];
  return (
    <>
      <div className="rounded-lg border-2 border-tableBorder mt-5">
        <table className="min-w-full bg-white rounded-lg relative mb-4 border-dropdownText ">
          <thead className="text-[12px] text-center text-dropdownText">
            <tr className="bg-lightPink ">
              {head.map((item, index) => (
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
            {data.map((item) => (
              <tr className="relative">
                <td className="py-2.5 px-4 border-y border-tableBorder  justify-center mt-4 gap-2">{item.date}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder ">{item.dueDate}</td>
                <td className="py-2.5 px-4 border-y border-tableBorder ">{item.invoiceNumber}</td>

                <td className="py-2.5 px-4 border-y border-tableBorder relative">
                  {item.invoiceAmount}
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder relative">
                  {item.amountDue}
                </td>
                <td className="py-2.5 px-4 border-y border-tableBorder relative">
                  <div className="border border-slate-300 text-start rounded-md ps-1 gap-2">
                    {item.payment}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex my-4 justify-end text-textColor gap-8 w-full text-sm">
        <p>Total</p>
        <p className="font-semibold">200.00</p>
      </div>
    </>
  );
};

export default UnpaidInvoiceTable;
