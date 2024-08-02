import Button from "../../../Components/Button"
import emailIcon from "../../../assets/Images/Frame 629990.png"
import genderIcon from "../../../assets/Images/Frame 629990 (1).png"
import dateIcon from "../../../assets/Images/Frame 629990 (2).png"
import departmentIcon from "../../../assets/Images/Frame 629990 (3).png"
import accessIcon from "../../../assets/Images/Frame 629990 (4).png"
type Props = {}

function Overview({}: Props) {
  return (
    <div className="mt-4 flex justify-between ">
        {/* 1st card */}
      <div className="bg-white rounded-lg p-6 w-[40%] flex flex-col"> 
        <div className="rounded-lg py-4 px-[18px] flex justify-between flex-1" style={{ background: 'linear-gradient(89.66deg, #E3E6D5 -0.9%, #F7E7CE 132.22%)' }}>
          <div>
            <img
              src="https://s3-alpha-sig.figma.com/img/6d86/5fd3/670f868dab79a16d21593ad9b3a5c753?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OLTtsoditagENrynRRWCON14WMOcqDwElerVrATHQR3vE6N04e4VnxFcu5uE-BUl1xgINpNYcGFulehjB~TGAb-xPbMnKhG~WO0t8vCJVJpB7A5u6HrtDgcaEPzoDNf~HNKk1oWgpDc6S1-niLLM0Ho~Go1KBckn9wcrd-fG8G7WDofqG5q4rFD6PojHXXiZyFO4JLh9WJDjpCoCcJKTDjS9qghF5tztRL-wJMbCcZO4YntTZz24JhsuipkBNmZNn1CraiTW4Vo3jgiWgjRGFSMj8sJqZBgFfzJ6OwsxRHLL97kfkwl6-ahGmhZR6AtqnUZ-NbGLJKLwfmZODEyzPg__"
              alt=""
              className="w-14 h-14 rounded-full border-2 border-white"
            />

            <p className="text-gray-500 flex items-center mt-4">
              <span className="text-lg font-bold text-textColor flex items-center pr-4">Ashwin Madukumar </span>
              <span className="border-l-[1px] border-[#9EA9BB] h-[19px] pl-4"></span>
              <span className="text-lg text-textColor">9912</span>
            </p>
            <p className="text-base text-textColor">Marketing Manager</p>

            <div className="bg-white p-2 rounded-[4px] w-[115%] mt-4 flex items-center">
              <p className="text-textColor text-xs pr-2">Work Mode</p>
              <span className="border-l-[1px] border-[#9EA9BB] h-[14px] pl-2"></span>
              <p className="font-semibold text-textColor">Per Day</p>

              <p className="text-textColor text-xs pr-2 ms-5">Amount</p>
              <span className="border-l-[1px] border-[#9EA9BB] h-[14px] pl-2"></span>
              <p className="font-semibold text-textColor">₹800</p>
            </div>
          </div>

          <div className="flex flex-col justify-between items-end">
            <div className="flex items-center text-textColor text-[12px] font-semibold">
              <span className="w-4 h-4 bg-[#76C87A] rounded-full mr-2"></span>
              <p className="text-sm">Portal Enabled</p>
            </div>
            <Button variant="secondary" className="h-6 w-[58px] pl-4 pr-4 text-xs">Edit</Button>
          </div>
        </div>

        <div className="mt-4 bg-[#F8F8F8] rounded-lg p-4">
            <div className="flex gap-5">
            <img src={emailIcon} alt=""  className="w-11 h-11"/>
            <p>
                <span className="text-dropdownText text-sm">Mail ID</span> <br />
                <span className="text-dropdownText text-base font-semibold">aswin@cygnonex.com</span>
            </p>
            </div>
            <hr  className="mt-[14px] border-t border-[#C6CAD0]"/>

            <div className="flex gap-5 mt-[14px]">
            <img src={genderIcon} alt=""  className="w-11 h-11"/>
            <p>
                <span className="text-dropdownText text-sm">Gender</span> <br />
                <span className="text-dropdownText text-base font-semibold">Male</span>
            </p>
            </div>
            <hr  className="mt-[14px] border-t border-[#C6CAD0]"/>
            <div className="flex gap-5 mt-[14px]">
            <img src={dateIcon} alt=""  className="w-11 h-11"/>
            <p>
                <span className="text-dropdownText text-sm">Date of Joining</span> <br />
                <span className="text-dropdownText text-base font-semibold">Male</span>
            </p>
            </div>
            <hr  className="mt-[14px] border-t border-[#C6CAD0]"/>
            <div className="flex gap-5 mt-[14px]">
            <img src={departmentIcon} alt=""  className="w-11 h-11"/>
            <p>
                <span className="text-dropdownText text-sm">Department</span> <br />
                <span className="text-dropdownText text-base font-semibold">Marketing</span>
            </p>
            </div>
            <hr  className="mt-[14px] border-t border-[#C6CAD0]"/>
            <div className="flex items-center justify-between mt-[14px]">
                <div className="flex gap-5">
            <img src={accessIcon} alt=""  className="w-11 h-11"/>
            <p>
                <span className="text-dropdownText text-sm">Portal Access</span> <br />
                <span className="text-dropdownText text-base font-semibold">Enabled</span>
            </p>
                </div>
                <div>
                    <span className="text-[#820000] font-semibold text-lg">Disable</span>
                </div>
            </div>
        </div>
      </div>
        {/* 2nd card */}
      <div className="p-6 rounded-lg bg-white w-[58%]">
        <div className="flex justify-between items-center">
            <p className="text-textColor text-lg font-bold">Personal Information</p>
            <Button variant="secondary" size="sm" className="pl-7 pr-7 h-8 text-xs">Edit</Button>
        </div>
        <div className=" mt-5 flex gap-5">
            <div>
                <p className="text-dropdownText font-semibold text-sm">Date of Birth</p>
                <p className="text-textColor font-bold text-sm mt-1">13/12/1997</p>
                
                <p className="text-dropdownText mt-4 font-semibold text-sm">PAN</p>
                <p className="text-textColor font-bold text-sm mt-1">EUBRUYTYU01</p>

                <p className="text-dropdownText mt-4 font-semibold text-sm">Mobile number</p>
                <p className="text-textColor font-bold text-sm mt-1">9854679856</p>

                <p className="text-dropdownText mt-4 font-semibold text-sm">Residential Address</p>
                <p className="text-textColor font-bold text-sm mt-1">4517 Washington Ave. Manchester, Kentucky 39495</p>
            </div>
            <div>
            <p className="text-dropdownText font-semibold text-sm">Fathers' Name</p>
            <p className="text-textColor font-bold text-sm mt-1">John Abraham</p>

            <p className="text-dropdownText mt-4 font-semibold text-sm">Personal Email Address</p>
            <p className="text-textColor font-bold text-sm mt-1">aswin@gmail.com</p>
            </div>
        </div>
        <hr className="mt-4 border-t border-[#C6CAD0]"/>

        <div className="flex justify-between items-center mt-4">
            <p className="text-textColor text-lg font-bold">Payment Information</p>
            <Button variant="secondary" size="sm" className="pl-7 pr-7 h-8 text-xs">Edit</Button>
        </div>
        <div className=" mt-5 flex justify-between w-[75%]">
            <div>
                <p className="text-dropdownText font-semibold text-sm">Payment Mode</p>
                <p className="text-textColor font-bold text-sm mt-1">Bank Transfer</p>
                
                <p className="text-dropdownText mt-9 font-semibold text-sm">Account Holder Name</p>
                <p className="text-textColor font-bold text-sm mt-1">Ashwin Madukumar</p>

                <p className="text-dropdownText mt-4 font-semibold text-sm">IFSC</p>
                <p className="text-textColor font-bold text-sm mt-1">FDRL0000012</p>
            </div>
            <div>
            <p className="text-dropdownText font-semibold text-sm">Account number</p>
            <p className="text-textColor font-bold text-sm mt-1">XXXX3217</p>
            <p className="text-maroon text-sm font-bold">Show A/C No</p>

            <p className="text-dropdownText mt-4 font-semibold text-sm">Bank Name </p>
            <p className="text-textColor font-bold text-sm mt-1">SBI</p>

            <p className="text-dropdownText mt-4 font-semibold text-sm">Account Type </p>
            <p className="text-textColor font-bold text-sm mt-1">Savings</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
