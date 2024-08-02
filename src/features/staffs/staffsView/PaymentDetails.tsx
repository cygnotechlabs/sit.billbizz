import bagIcon from "../../../assets/Images/bagIcon.png"
type Props = {}

function PaymentDetails({}: Props) {
  return (
    <div className="mt-4">
      <div className="bg-white rounded-lg p-6 w-[67%] flex flex-col gap-4"> 
        <div className="rounded-lg py-4 px-[18px] flex items-center gap-4" style={{ background: 'linear-gradient(89.66deg, #E3E6D5 -0.9%, #F7E7CE 132.22%)' }}>
          <img
            src="https://s3-alpha-sig.figma.com/img/6d86/5fd3/670f868dab79a16d21593ad9b3a5c753?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OLTtsoditagENrynRRWCON14WMOcqDwElerVrATHQR3vE6N04e4VnxFcu5uE-BUl1xgINpNYcGFulehjB~TGAb-xPbMnKhG~WO0t8vCJVJpB7A5u6HrtDgcaEPzoDNf~HNKk1oWgpDc6S1-niLLM0Ho~Go1KBckn9wcrd-fG8G7WDofqG5q4rFD6PojHXXiZyFO4JLh9WJDjpCoCcJKTDjS9qghF5tztRL-wJMbCcZO4YntTZz24JhsuipkBNmZNn1CraiTW4Vo3jgiWgjRGFSMj8sJqZBgFfzJ6OwsxRHLL97kfkwl6-ahGmhZR6AtqnUZ-NbGLJKLwfmZODEyzPg__"
            alt=""
            className="w-14 h-14 rounded-full border-2 border-white"
          />
          <div>
            <div className="flex items-center">
              <p className="text-lg font-bold text-textColor">Ashwin Madukumar</p>
              <span className="border-l-[1px] border-[#9EA9BB] h-4 mx-4"></span>
              <p className="text-lg text-textColor">9912</p>
            </div>
            <p className="text-base text-textColor">Marketing Manager</p>
          </div>
        </div>
        
        <div className="bg-[#F8F9FA] rounded-lg p-4">
          <div className="flex items-center gap-4 ">
            <div className=" rounded-full bg-white flex items-center justify-center">
            <img src={bagIcon} alt="" />
            </div>
            <div>
              <p className="text-base  text-dropdownText">Work Mode</p>
              <p className="text-base font-bold text-dropdownText">Hourly</p>
            </div>
          </div>
          <hr className="mt-[14px] border-t border-[#C6CAD0]"/>
          <div className="flex justify-between items-center mt-[14px]">
            <p className="text-base text-dropdownText">Amount</p>
            <p className="text-xl font-bold text-dropdownText">₹800</p>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default PaymentDetails
