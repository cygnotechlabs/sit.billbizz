import CehvronDown from "../../../../assets/icons/CehvronDown";
import MailIcon from "../../../../assets/icons/MailIcon";
import PrinterIcon from "../../../../assets/icons/PrinterIcon";
import Upload from "../../../../assets/icons/Upload";
import Button from "../../../../Components/Button";
import companyLogo from "../../../../assets/Images/Vector@2x.png";

type Props = {};

function Statement({}: Props) {
  const tableHead = [
    "Date",
    "Transaction",
    "Details",
    "Amount",
    "Payment",
    "Balance",
  ];
  return (
    <div>
      <div className="bg-[#F6F6F6] flex px-4 py-[24px]">
        <div className="flex gap-8">
          <div className="space-y-1">
            <h1 className="text-lg">Vendor Statement For Office Stocks</h1>
            <p>From 01/01/2024 To 12/12/2024</p>
          </div>
          <div className="bg-white border rounded-lg flex items-center justify-center h-8 px-8 text-xs top-0">
            This Month <CehvronDown color={"currentColor"} />
          </div>
        </div>
        <div className="flex ml-auto h-9 gap-2 text-sm">
          <Button variant="secondary" size="sm">
            XLS
            <Upload className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="sm">
            PDF
            <Upload className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="sm">
            <PrinterIcon color={"currentColor"} height={18} width={18} />
            Print
          </Button>
          <Button variant="primary" size="sm">
            <MailIcon color={"white"} />
            Send Mail
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-center items-center">
          <div className="bg-white drop-shadow-2xl w-[595px]  p-8 pl-[24px] pr-[24px]">
            <div className="flex justify-between items-center mb-8 mt-1">
              <div>
                <img
                  src={companyLogo}
                  alt="Company Logo"
                  className="h-[49px] w-[71px]"
                />
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold text-textColor">
                  Statement of Accounts
                </h2>
                <p className="text-sm  text-dropdownText mt-[5px]">
                  01/06/2024 To 25/08/2024
                </p>
                <h3 className="font-normal text-xs mt-[14px] text-pdftext">
                  ElectroTech Solution
                </h3>
                <p className="font-normal text-xs text-pdftext">
                  electrotech@gmail.com | +91 9654675465
                </p>
              </div>
            </div>

            <div>
              <div className="mb-8 mt-8">
                <h3 className="font-normal text-xs text-pdftext">Bill to</h3>
                <p className="text-pdftext text-sm font-bold mt-2">
                  Office Stock
                </p>
                <p className="font-normal text-xs text-pdftext mt-2">
                  officestock@gmail.com | +91 9654675465
                </p>
                <p className="font-normal text-xs text-pdftext mt-2">
                  4140 Parker Rd. Allentown,
                  <br />
                  New Mexico 31134
                </p>
              </div>
            </div>

            <div className="border border-slate-300 text-[#0A2540] w-[60%] rounded-md ">
              <p className="text-sm font-bold border-b border-slate-300 p-2">
                Account Summary
              </p>
              <div className="text-xs pe-10 space-y-2 border-b border-slate-300 mx-2 my-3">
                <div className="flex">
                  <p>Opening Balance</p>
                  <p className="ml-auto">&#8377;0.00</p>
                </div>

                <div className="flex">
                  <p>Billed Amount</p>
                  <p className="ml-auto">&#8377;0.00</p>
                </div>
                <div className="flex pb-3">
                  <p>Amount Paid</p>
                  <p className="ml-auto">&#8377;0.00</p>
                </div>
              </div>
              <div className="flex text-xs pe-12 ps-2 mt-3 mb-4">
                <p>Balance Due</p>
                <p className="ml-auto">&#8377;0.00</p>
              </div>
            </div>

            <table className="border border-slate-300 w-full mb-7  mt-10 ">
              <thead className="border-b border-slate-300 rounded-md">
                <tr className="text-start">
                  {tableHead.map((item, index) => (
                    <th
                      className="font-bold text-[10px] text-pdftext ps-4 text-start py-2"
                      key={index}
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-[10px] text-pdftext font-medium pt-4 pb-6 px-2">
                    01/01/2024
                  </td>
                  <td className="text-[10px] text-pdftext font-medium pt-4 pb-6 px-2">
                   
                  </td>
                  <td className="text-[10px] text-pdftext font-medium pt-4 pb-6 px-2">
                    
                  </td>
                  <td className="text-[10px] text-pdftext font-medium pt-4 pb-6 px-2 text-center">
                   0.00
                  </td>
                  <td className="text-[10px] text-pdftext font-medium pt-4 pb-6 px-2">
                  
                  </td>
                  <td className="text-[10px] text-pdftext font-medium pt-4 pb-6 px-2 text-center">
                   0.00
                  </td>
                 
                </tr>
              </tbody>
            </table>


            <div className="flex justify-end mt-8">
              <div className="w-[58.4%] p-4 border bg-pdfbg flex justify-between border-dropdownBorder rounded">
                <h4 className="text-pdftext text-xs font-normal">
                  Balance Due
                </h4>
                <p className="ttext-pdftext text-xs font-normal">&#8377; 0.00</p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Statement;
