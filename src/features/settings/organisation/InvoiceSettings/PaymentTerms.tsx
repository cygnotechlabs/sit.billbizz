import { useEffect, useRef, useState } from 'react';
import CirclePlus from '../../../../assets/icons/circleplus';
import Pen from '../../../../assets/icons/Pen';
import Trash2 from '../../../../assets/icons/Trash2';
import Button from '../../../../Components/Button';
import Modal from '../../../../Components/model/Modal';
import useApi from '../../../../Hooks/useApi';
type Props = {}
type PaymentTerm = {
    [key: string]: string;
  };
function PaymentTerms({}: Props) {
    const {}=useApi("put", 5004)
    const [isModalOpen, setModalOpen] = useState(false);
    const [paymentTerms, setPaymentTerms] = useState<PaymentTerm[]>([
        { title: 'Net 30', description: 'Payment is due within 30 days from the invoice date' },
        { title: '2/10 Net 30', description: 'A 2% discount is available if payment is made within 10 days; otherwise, the full amount is due within 30 days' },
        { title: 'Due on Receipt', description: 'Payment is due immediately upon receiving the invoice' }
      ]);
    const textAreasRef = useRef<HTMLTextAreaElement[]>([]);
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

  // Function to handle auto-resizing of textarea
  const handleInputChange = (index:number, field:string, value:string) => {
    handlePaymentInputChange(index, field, value);
    resizeTextarea(index);
  };


  const addNewRow = () => {
    setPaymentTerms([...paymentTerms, { title: '', description: '' }]);
  };
  const deleteRow = (indexToDelete:number) => {
    setPaymentTerms(paymentTerms.filter((_, index) => index !== indexToDelete));
  };
  

  

  const handlePaymentInputChange = (index: number, field: string, value: string) => {
    const updatedTerms = [...paymentTerms];
    updatedTerms[index][field] = value;
    setPaymentTerms(updatedTerms);
  };
    
  return (
    <>
    <div className=" mt-7 mb-3 flex justify-between">
              <b>Payment Terms</b>
              <Button onClick={()=>setModalOpen((prev)=>!prev)} variant="secondary" className="h-[30px] w-[80px] flex justify-center"  size="sm"><Pen color="#565148" /> <p className="text-sm font-medium">Edit</p></Button>
            </div>
            <Modal open={isModalOpen} onClose={()=>setModalOpen((prev)=>!prev)} style={{ width: "900px", padding: "0px 12px 0px 12px" }}>
      <div className="p-5 mt-3">
        <div className="mb-5 flex rounded-xl items-center overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-textColor">Edit Payment Terms</h3>
          </div>
          <div className="ms-auto text-3xl cursor-pointer relative z-10" onClick={()=>setModalOpen((prev)=>!prev)}>
            &times;
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 h-[44px] items-center justify-center bg-[#FDF8F0] border-b border-b-slate-300 ">
          <div className="col-span-4 text-center text-[14px]">Title</div>
          <div className="col-span-8  text-center text-[14px]">Description</div>
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
            <div className="col-span-8 m-3 gap-[10px] flex items-center">
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
              {
                index>2?          
              <div onClick={()=>deleteRow(index)} className="cursor-pointer"><Trash2 size={20} color='#820000'/></div>:
              <div className='ms-5'></div>
              }
            </div>
           
          </div>
        ))}
        <Button onClick={addNewRow} variant="secondary" className="h-[30px] w-[80px] m-5 flex justify-center" size="sm">
          <CirclePlus size='12px' color="#565148" />
          <p className="text-sm font-medium">Add</p>
        </Button>
        <div className="flex justify-end gap-2 mb-3">
          <Button onClick={()=>{setModalOpen((prev)=>!prev)}} variant="secondary" className='h-[38px] w-[120px] flex justify-center'>
            <p className='text-sm'>Cancel</p>
          </Button>
          <Button
            onClick={()=>{setModalOpen((prev)=>!prev)}}
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
    </>
  )
}

export default PaymentTerms