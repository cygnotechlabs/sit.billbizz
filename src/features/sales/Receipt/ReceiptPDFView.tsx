import companyLogo from "../../../assets/Images/Vector@2x.png";


type Props = {};

const ReceiptPDFView = ({}: Props) => {
   
    
  return (
    <div className="">
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
                Customer Receipt
              </h2>
              <p className="text-sm font-bold text-dropdownText mt-[5px]">
                CR-0001
              </p>
              <h3 className="font-normal text-xs mt-[14px] text-pdftext">
                ElectroTech Solution
              </h3>
              <p className="font-normal text-xs text-pdftext">
                electrotech@gmail.com | +91 9654675465
              </p>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="mb-8 mt-8 space-y-3">
              <div className="flex">
                {" "}
                <p className="font-normal text-xs text-pdftext">Payment Date</p>
                <p className="font-normal text-xs text-pdftext ml-auto">
                  16/07/2024
                </p>
              </div>
              <div className="flex">
                {" "}
                <p className="font-normal text-xs text-pdftext">Reference Number</p>
                <p className="font-normal text-xs text-pdftext ml-auto">
                 
                </p>
              </div>
              <div className="flex">
                {" "}
                <p className="font-normal text-xs text-pdftext">Payment Mode</p>
                <p className="font-normal text-xs text-pdftext ml-auto">
                 Cash
                </p>
              </div>
              <div className="flex">
                {" "}
                <p className="font-normal text-xs text-pdftext">Ammount Received in words</p>
                <p className="font-normal text-xs text-pdftext ml-auto ps-5">
                  Thousand only
                </p>
              </div>
            </div>
            <div
              className="mb-8 mt-8  flex items-center justify-center"
              style={{}}
            >
             <div className="text-center bg-gradient-to-r from-[#E3E6D5] to-[#F7E7CE] px-[44px] py-4 rounded-md text-pdftext">
                  <p>Ammout received</p>
                  <p className="font-bold text-lg">&#8377; 1000</p>
             </div>
            </div>
          </div>

          <table className="w-full mb-7 border border-dropdownBorder">
            <thead className="border-b border-dropdownBorder ">
              <tr className="font-bold text-[10px] text-pdftext ">
                <th className="text-left ps-1.5 py-2 ">Invoice Number</th>
                <th className="text-left ps-1.5 py-2 ">Invoice Date</th>
                <th className="text-left ps-1.5 py-2">Invoice Price</th>
                <th className="text-left ps-1.5 py-2">Payment Amount</th>
              </tr>
            </thead>
            <tbody className="h-[56px]">
              <tr className="text-[10px] text-left ">
                <td className="ps-2 text-left">INV-0004</td>
                <td className="ps-2 text-left">28/06/2024</td>
                <td className="ps-2 text-left">50,000.00</td>
                <td className="ps-2 text-left">40000.00</td>
              </tr>
            </tbody>
          </table>

         
          <div className="mb-8 mt-8">
                    <h3 className="font-normal text-xs text-[#0A2540]">Bill to</h3>
                    <p className="text-pdftext text-sm font-bold mt-2">MR Aman Rasheedh</p>
                    <p className="font-normal text-xs text-pdftext mt-2">aman@gmail.com | +91 9654675465</p>
                    <p className="font-normal text-xs text-pdftext mt-2">4140 Parker Rd. Allentown,<br />New Mexico 31134</p>
                </div>

          <div className="w-[50%] mt-[64px] gap-4 mb-[55.5px] flex justify-center items-center">
            <p className="text-pdftext text-xs font-normal">Signature</p>
            <div className="border-t  border-[0.5px] border-loremcolor w-full "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPDFView;
