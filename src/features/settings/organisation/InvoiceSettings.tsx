import { useEffect, useRef, useState } from 'react';
import ChevronRight from '../../../assets/icons/ChevronRight';
import CirclePlus from '../../../assets/icons/circleplus';
import Pen from '../../../assets/icons/Pen';
import Plus from '../../../assets/icons/Plus';
import facebooklogo from "../../../assets/Images/facebook logo.svg";
import instagramLogo from "../../../assets/Images/instagram logo.svg";
import linkedinlog from "../../../assets/Images/linkedin logo.svg";
import QrCode from "../../../assets/Images/qr-code.svg";
import Qrsign from "../../../assets/Images/sign.svg";
import twitterLogo from "../../../assets/Images/twitter-logo.png";
import xMark from "../../../assets/Images/x.svg";
import Button from '../../../Components/Button';
import Modal from '../../../Components/model/Modal';
import Banner from '../banner/Banner';
type Props = {}
type PaymentTerm = {
  [key: string]: string;
};

function InvoiceSettings({}: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddPlaceHolderOpen,setAddPlaceHolderOpen]=useState(false)
  const [isSeePreviewOpen,setSeePreviewOpen]=useState(false)
  const [isOrganisationAddressOpen,setOrganisationAddressOpen]=useState(false)
  

  const organizationDetails = [
    "${ORGANIZATION.CITY} ${ORGANIZATION.STATE} ${ORGANIZATION.POSTAL_CODE}",
    "${ORGANIZATION.COUNTRY}",
    "${ORGANIZATION.GSTNO_LABEL} ${ORGANIZATION.GSTNO_VALUE}",
    "${ORGANIZATION.PHONE}",
    "${ORGANIZATION.EMAIL}",
    "${ORGANIZATION.WEBSITE}"
  ];

  const organisationAddress=[
    "Street Adress 1",
    "Fax",
    "Street Adress 1",
    "Phone Label",
    "Organization Name",
    "City",
    "Email",
    "State/Province",
    "Website",
    "Country",
    "Zip/Postal Code",
    "Fax Label"
  ]
  const previewList=[
    "Kerala",
    "India",
    "GSTIN 32f4565464",
    "6233494546",
    "Dheeraj@"
  ]
  const textAreasRef = useRef<HTMLTextAreaElement[]>([]);

  // Function to handle auto-resizing of textarea
  const handleInputChange = (index:number, field:string, value:string) => {
    handleChange(index, field, value);
    resizeTextarea(index);
  };


  const addNewRow = () => {
    setPaymentTerms([...paymentTerms, { title: '', description: '' }]);
  };


  const [paymentTerms, setPaymentTerms] = useState<PaymentTerm[]>([
    { title: 'Net 30', description: 'Payment is due within 30 days from the invoice date' },
    { title: '2/10 Net 30', description: 'A 2% discount is available if payment is made within 10 days; otherwise, the full amount is due within 30 days' },
    { title: 'Due on Receipt', description: 'Payment is due immediately upon receiving the invoice' }
  ]);

  const handleChange = (index: number, field: string, value: string) => {
    const updatedTerms = [...paymentTerms];
    updatedTerms[index][field] = value;
    setPaymentTerms(updatedTerms);
  };
  

  const openModal = (editModal?:boolean,placeholder?:boolean,seePreview?:boolean) => {
    setModalOpen(editModal ||false);
    setAddPlaceHolderOpen(placeholder ||false)
    setSeePreviewOpen(seePreview ||false)
  };

  const closeModal = (editModal?:boolean,placeholder?:boolean,seePreview?:boolean) => {
    console.log(placeholder);
    
    setModalOpen(editModal ||false);
    setAddPlaceHolderOpen(placeholder || false)
    setSeePreviewOpen(seePreview ||false)
  };

  const resizeTextarea = (index:number) => {
    const textarea = textAreasRef.current[index];
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = textarea.scrollHeight + 'px'; // Set height to scroll height
    }
  };

   
  // Initial resize of textareas
  useEffect(() => {
    paymentTerms.forEach((_, index) => {
      resizeTextarea(index);
    });
  }, [paymentTerms]);

  return (
    <div className='m-4 '>
      <Banner/>
      {/* Org Adresss format */}
      <div className='space-y-4 text-sm text-[#303F58]'>
      <div className='grid  grid-cols-12 mt-5 '>
        <div className='col-span-7 h-14 flex items-center px-5 rounded-lg justify-between bg-white'>
          <p className='font-bold'>Organizational Address Format</p>
          <p onClick={() => setOrganisationAddressOpen((prev) => !prev)}>
              <ChevronRight color='#303F58' className={`transition-transform duration-500 ${isOrganisationAddressOpen?"rotate-90":""} ease-in-out cursor-pointer`} />
            </p>
        </div>
       <div
            className={`col-span-7 rounded-lg bg-white overflow-hidden transition-max-height duration-500 ease-in-out  ${
              isOrganisationAddressOpen ? 'mt-5 space-y-3' : 'max-h-0'
            }`}
            style={{ minHeight: isOrganisationAddressOpen ? '225px' : '0'}}
          >
            <div className='m-4 space-y-3'>
          <div onClick={()=>openModal(false,true,false)} className='text-[#820000] flex items-center space-x-1 font-bold text-sm cursor-pointer'>
          <p >Insert Placeholders</p><CirclePlus color='#820000' size='14'/>

          </div>
          <Modal  open={isAddPlaceHolderOpen} onClose={()=>closeModal(false,false,false)} style={{ width: "497px", padding: "12px" }}>
           <div className='grid grid-cols-2 gap-2'>
             {
               organisationAddress.map(address=>(
                <div className='p-2  rounded hover:bg-[#F3E6E6] cursor-pointer'>{address}</div>
               ))
             }
             
           </div>
          </Modal>
          <div className='p-3  bg-[#F4F4F4]'>
            {
              organizationDetails.map((data)=>(
                <p className='text-[12px]'>{data}</p>
              ))
            }
          </div>
          <p onClick={()=>openModal(false,false,true)} className='text-center text-[#820000] text-[14px] font-bold cursor-pointer'>See Preview</p>
          <Modal  open={isSeePreviewOpen} onClose={()=>closeModal(false,false,false)} style={{ width: "298px", padding: "12px" }}>
            <div className='flex justify-between'>
              <div className='space-y-1'>
                {
                  previewList.map(list=>(
                    <p>{list}</p>
                  ))
                }
              </div>
              <p onClick={()=>closeModal(false,false,false)} className='text-[20px] cursor-pointer'>&times;</p>
            </div>
          </Modal>
        </div>
        </div>
        </div>
        
      
        {/* QR code Location*/}
        
        <div className='space-y-3'>
        <p className='font-bold'>QR code Location</p>
          <div>
            <div className="  rounded-md  p-5  bg-white grid grid-cols-12 gap-4 cursor-pointer">
              <div className="col-span-10 flex ">
                <div className="w-20 h-20 rounded-md flex items-center justify-center bg-[#F7E7CE]">
                  {/* {qrCode ? (
                    <img src={URL.createObjectURL(qrCode)} alt="" />
                  ) : (
                    <img src={QrCode} alt="" />
                  )} */}
                  <img src={QrCode} alt="" />
                </div>
                <div className="ms-3 flex items-center  h-full">
                  <div className='space-y-2'>
                    <p>
                      <b>Upload Organization's Location QR Code</b>
                    </p>
                    <p>
                      Upload or configure the location of your QR code on the
                      invoice
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <div className="bg-darkRed text-white items-center justify-center rounded-full flex h-8 w-8">
                  <Plus color="white" />
                </div>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              // onChange={(e) => handleFileChange(e, "qrLocation")}
            />
          </div>
          <div className='flex items-center space-x-2'>
          <input type="checkbox" id='customCheckbox' />
          <label className='text-[14px]'>Display QR Code in Invoice</label>
          </div>
        </div>
        {/* QR code Payment */}
        <div className='space-y-3'>
        <p className='font-bold'>QR code Payment</p>
          <div>
            <div className="  rounded-md  p-5  bg-white grid grid-cols-12 gap-4 cursor-pointer">
              <div className="col-span-10 flex ">
                <div className="w-20 h-20 rounded-md flex items-center justify-center bg-[#F7E7CE]">
                  {/* {qrCode ? (
                    <img src={URL.createObjectURL(qrCode)} alt="" />
                  ) : (
                    <img src={QrCode} alt="" />
                  )} */}
                  <img src={QrCode} alt="" />
                </div>
                <div className="ms-3 flex items-center  h-full">
                  <div className='space-y-2'>
                    <p>
                       <b>Upload Payment Based QR Code</b>
                    </p>
                    <p>
                      Upload or configure the location of your QR code on the
                      invoice
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <div className="bg-darkRed text-white items-center justify-center rounded-full flex h-8 w-8">
                  <Plus color="white" />
                </div>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              // onChange={(e) => handleFileChange(e, "qrLocation")}
            />
          </div>
          <div className='flex items-center space-x-2'>
          <input type="checkbox" id='customCheckbox' />
          <label className='text-[14px]'>Display QR Code in Invoice</label>
          </div>
        </div>
        {/* Invoice signatory */}
        <div className='space-y-3'>
        <p className='font-bold'>Invoice Signatory</p>
          <div>
            <div className="  rounded-md  p-5  bg-white grid grid-cols-12 gap-4 cursor-pointer">
              <div className="col-span-10 flex ">
                <div className="w-20 h-20 rounded-md flex items-center justify-center bg-[#F7E7CE]">
                  {/* {qrCode ? (
                    <img src={URL.createObjectURL(qrCode)} alt="" />
                  ) : (
                    <img src={QrCode} alt="" />
                  )} */}
                  <img src={Qrsign} alt="" />
                </div>
                <div className="ms-3 flex items-center  h-full">
                  <div className='space-y-2'>
                    <p>
                      <b>Upload Organisation Digital Signature</b>
                    </p>
                    <p>
                      Upload or configure the location of your QR code on the
                      invoice
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <div className="bg-darkRed text-white items-center justify-center rounded-full flex h-8 w-8">
                  <Plus color="white" />
                </div>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              // onChange={(e) => handleFileChange(e, "qrLocation")}
            />
          </div>
          <div className='flex items-center space-x-2'>
          <input type="checkbox" id='customCheckbox' />
          <label className='text-[14px]'>Display QR Code in Invoice</label>
          </div>
        </div>
        <p className=" my-4">
            <b>Add Social Media</b>
          </p>
          <div className="  rounded-md  p-5 bg-white ">
            <div className="grid grid-cols-2 gap-4 ">
              <div>
                <label htmlFor="" className="text-slate-600">
                  {" "}
                  Twitter
                </label>
                <div className="flex gap-2 items-center justify-center">
                  <div className="flex items-center justify-center align-middle  bg-slate-100 p-2 h-10 rounded-md mt-2 ">
                    {" "}
                    <img width={25} src={twitterLogo} alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="Add Twitter Link"
                    className="pl-4 mt-3 text-sm w-[100%] rounded-md text-start bg-white border border-slate-300 h-[39px] p-2"
                    // value={inputData.twitter}
                    name="twitter"
                    // onChange={handleInputChange}
                  />
                  <img src={xMark} className="mt-3" alt="" />
                </div>
                <div className='flex items-center space-x-2 mt-3'>
          <input type="checkbox" id='customCheckbox' />
          <label className='text-[14px]'>Display QR Code in Invoice</label>
                </div>
              </div>

              <div>
                <label className="text-slate-600">Instagram</label>
                <div className="flex gap-2 items-center justify-center">
                  <div className="flex items-center justify-center bg-slate-100 p-2 h-10 rounded-md mt-2 ">
                    {" "}
                    <img src={instagramLogo} alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="Add Instagram Link"
                    className="pl-4 mt-3 text-sm w-[100%] rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
                    // value={inputData.insta}
                    name="insta"
                    // onChange={handleInputChange}
                  />
                  <img src={xMark} className="mt-3" alt="" />
                </div>
                <div className='flex items-center space-x-2 mt-3'>
          <input type="checkbox" id='customCheckbox' />
          <label className='text-[14px]'>Display QR Code in Invoice</label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="" className="text-slate-600">
                  Linkedin
                </label>

                <div className="flex gap-2 items-center justify-center">
                  <div className="flex items-center justify-center bg-slate-100 p-2 h-10 rounded-md mt-2 ">
                    {" "}
                    <img src={linkedinlog} alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="Add Linkedin Link"
                    className="pl-4 mt-3 text-sm w-[100%] rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
                    // value={inputData.linkedin}
                    name="linkedin"
                    // onChange={handleInputChange}
                  />
                  <img src={xMark} className="mt-3" alt="" />
                </div>
                <div className='flex items-center space-x-2 mt-3'>
          <input type="checkbox" id='customCheckbox' />
          <label className='text-[14px]'>Display QR Code in Invoice</label>
                </div>
              </div>

              <div>
                <label className="text-slate-600">Facebook</label>

                <div className="flex gap-2 items-center justify-center">
                  <div className="flex items-center justify-center bg-slate-100 p-2 h-10 rounded-md mt-2 ">
                    {" "}
                    <img src={facebooklogo} alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="Add Facebook Link"
                    className="pl-4 mt-3 text-sm w-[100%] rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
                    // value={inputData.facebook}
                    name="facebook"
                    // onChange={handleInputChange}
                  />
                  <div></div>
                  <img src={xMark} className="mt-3" alt="" />

                  
                </div>
                <div className='flex items-center space-x-2 mt-3'>
          <input type="checkbox" id='customCheckbox' />
          <label className='text-[14px]'>Display QR Code in Invoice</label>
                </div>
              </div>
            </div>
           
          </div>
          <p className=" my-4">
            <b>Add Payment Information</b>
          </p>
          <div className="bg-white  rounded-md mt-4 p-5">
            <p className=" my-4">
              <b>Enter Bank account Details</b>
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-slate-600">Account Holder Name</label>

                <input
                  type="text"
                  placeholder="Enter Account Holder Name"
                  className="pl-4 text-sm w-[100%] mt-3 rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
                  // value={inputData.accountHolderName}
                  name="accountHolderName"
                  // onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-slate-600">Bank Name</label>

                <input
                  type="text"
                  placeholder="Enter Bank Name"
                  className="pl-4 mt-3 text-sm w-[100%] rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
                  // value={inputData.bankName}
                  name="bankName"
                  // onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-slate-600">Account Number</label>
                <input
                  type="rating"
                  placeholder="Enter Account Number"
                  className="pl-4 mt-3 text-sm w-[100%] rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
                  // value={inputData.accNum}
                  name="accNum"
                  // onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-slate-600">IFSC Code </label>
                <input
                  type="text"
                  placeholder="Enter IFSC Code"
                  className="pl-4 text-sm mt-3 w-[100%] rounded-md text-start bg-white border border-slate-300  h-[39px] p-2"
                  // value={inputData.ifsc}
                  name="ifsc"
                  // onChange={handleInputChange}
                />
              </div>
            </div>

            <div className=" mt-7 mb-3 flex justify-between">
              <b>Payment Terms</b>
              <Button onClick={()=>openModal(true,false,false)} variant="secondary" className="h-[30px] w-[80px] flex justify-center"  size="sm"><Pen color="#565148" /> <p className="text-sm font-medium">Edit</p></Button>
            </div>
            <Modal open={isModalOpen} onClose={()=>closeModal()} style={{ width: "900px", padding: "0px 12px 0px 12px" }}>
      <div className="p-5 mt-3">
        <div className="mb-5 flex rounded-xl items-center overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-textColor">Edit Payment Terms</h3>
          </div>
          <div className="ms-auto text-3xl cursor-pointer relative z-10" onClick={()=>closeModal()}>
            &times;
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 h-[44px] items-center justify-center bg-[#FDF8F0] border-b border-b-slate-300 ">
          <div className="col-span-5 text-center text-[14px]">Title</div>
          <div className="col-span-7 text-center text-[14px]">Description</div>
        </div>
        {paymentTerms.map((term, index) => (
          <div className="grid grid-cols-12 border-b border-b-slate-300 gap-2" key={index}>
            <div className="col-span-4 m-3">
              <textarea
                value={term.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                className="w-full border-slate-400 border outline-red-700 rounded p-2 font-bold resize-none overflow-hidden "
                rows={2}
                ref={(el) => {
                  if (el) {
                    textAreasRef.current[index] = el;
                  }
                }}
              />
            </div>
            <div className="col-span-8 m-3">
              <textarea
                value={term.description}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                className="w-full border-slate-400 text-[12px] border outline-red-700 rounded  p-2 resize-none overflow-hidden "
                rows={2}
                ref={(el) => {
                  if (el) {
                    textAreasRef.current[index] = el;
                  }
                }}
              />
            </div>
          </div>
        ))}
        <Button onClick={addNewRow} variant="secondary" className="h-[30px] w-[80px] m-5 flex justify-center" size="sm">
          <CirclePlus size='12px' color="#565148" />
          <p className="text-sm font-medium">Add</p>
        </Button>
        <div className="flex justify-end gap-2 mb-3">
          <Button onClick={()=>{closeModal()}} variant="secondary" className='h-[38px] w-[120px] flex justify-center'>
            <p className='text-sm'>Cancel</p>
          </Button>
          <Button
            onClick={()=>{closeModal()}}
            variant="primary"
            className='h-[38px] w-[120px] flex justify-center'
          >
            <p className='text-sm'>Save</p>
          </Button>
        </div>
      </div>
    </Modal>

            {paymentTerms.map((data,index)=>(
              <p key={index} className="text-textColor my-3 break-words whitespace-normal">
              <span className="font-semibold">{data.title} -</span> {data.description}
            </p>
            ))}
            <div/>
      </div>
    </div>
    <div className="flex my-4 gap-4">
            <Button
              variant="primary"
              className='h-[38px] w-[120px] flex justify-center' 
              // onClick={(e) => handleCreateOrganization(e)}
            >
      
              <p className='text-sm'>Save</p>
            </Button>

            <Button variant="secondary" className='h-[38px] w-[120px] flex justify-center'  >
              {" "}
              <p className='text-sm'>Cancel</p>
            </Button>
          </div>
   </div>
  )
}

export default InvoiceSettings