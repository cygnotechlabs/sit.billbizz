import { useEffect, useRef, useState } from 'react';
import CirclePlus from '../../../../assets/icons/circleplus';
import Pen from '../../../../assets/icons/Pen';
import Trash2 from '../../../../assets/icons/Trash2';
import Button from '../../../../Components/Button';
import Modal from '../../../../Components/model/Modal';
import useApi from '../../../../Hooks/useApi';
import { endponits } from '../../../../Services/apiEndpoints';
import toast from 'react-hot-toast';

type Props = {};
type PaymentTerm = {
    name: string;
    days: string;
    description: string;
};

function PaymentTerms({}: Props) {
    // const { request: addPaymentTerms } = useApi("post", 5004);
    // const { request: editPaymentTerms } = useApi("put", 5004);
    // const { request: deletePaymentTerms } = useApi("delete", 5004);
    const { request: getPaymentTerms } = useApi("get", 5004);

    const [isModalOpen, setModalOpen] = useState(false);
    const [paymentTerms, setPaymentTerms] = useState<PaymentTerm[]>([]);

    const textAreasRef = useRef<HTMLTextAreaElement[]>([]);

    const resizeTextarea = (index: number) => {
        const textarea = textAreasRef.current[index];
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height
            textarea.style.height = textarea.scrollHeight + 'px'; // Set height to scroll height
        }
    };

    useEffect(() => {
        paymentTerms.forEach((_, index) => {
            resizeTextarea(index);
        });
    }, [paymentTerms, isModalOpen]);

    const handleInputChange = (index: number, field: keyof PaymentTerm, value: string) => {
        const updatedTerms = [...paymentTerms];
        updatedTerms[index][field] = value;
        setPaymentTerms(updatedTerms);

        if (field === 'description') {
            resizeTextarea(index);
        }
    };

    const addNewRow = () => {
        setPaymentTerms([...paymentTerms, { name: '', days: '', description: '' }]);
    };

    const deleteRow = (indexToDelete: number) => {
        if (indexToDelete > 2) {
            setPaymentTerms(paymentTerms.filter((_, index) => index !== indexToDelete));
        } else {
            toast.error("These payment terms cannot be deleted.");
        }
    };

    const handleAddPaymentTerms = async () => {
        toast.success("Success");
        // try {
        //   const url = `${endponits.ADD_PAYMENT_TERMS}`;
        //   const apiResponse = await addPaymentTerms(url, paymentTerms)
        //   const { response, error } = apiResponse;
        //   if (!error && response) {
        //     toast.success(response.data);
        //   } else {
        //     toast.error(`API Error: ${error}`);
        //   }
        // } catch (error) {
        //   toast.error(`Error during API call: ${error}`);
        // }
      };

      const handleGetPaymentTerms = async () => {
          try {
              const url = `${endponits.GET_PAYMENT_TERMS}`;
              const body = { organizationId: "INDORG0001" };
              const { response, error } = await getPaymentTerms(url, body);
              if (!error && response) {
                  const data: PaymentTerm[] = response.data.map((item: any) => ({
                      name: item.name,
                      days: item.days,
                      description: item.description,
                  }));
  
                  setPaymentTerms(data);
              } else {
                  toast.error(`API Error: ${error}`);
              }
          } catch (error) {
              toast.error(`Error fetching invoice settings: ${error}`);
          }
      };
  
      useEffect(() => {
          handleGetPaymentTerms();
      }, []);
      return (
        <>
            <div className="mt-7 mb-3 flex justify-between">
                <b>Payment Terms</b>
                <Button onClick={() => setModalOpen((prev) => !prev)} variant="secondary" className="h-[30px] w-[80px] flex justify-center" size="sm">
                    <Pen color="#565148" /> <p className="text-sm font-medium">Edit</p>
                </Button>
            </div>
            <Modal open={isModalOpen} onClose={() => setModalOpen((prev) => !prev)} style={{ width: "970px", padding: "0px 12px 0px 12px" }}>
                <div className="p-5 mt-3">
                    <div className="mb-5 flex rounded-xl items-center overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-textColor">Edit Payment Terms</h3>
                        </div>
                        <div className="ms-auto text-3xl cursor-pointer relative z-10" onClick={() => setModalOpen((prev) => !prev)}>
                            &times;
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 h-[44px] items-center justify-center bg-[#FDF8F0] border-b border-b-slate-300">
    <div className="col-span-3 text-center text-[14px]">Title</div>
    <div className="col-span-2 text-center text-[14px]">Days</div>
    <div className="col-span-7 text-center text-[14px]">Description</div>
</div>

<div className="max-h-[330px] overflow-y-auto"> {/* 220px height is roughly 5 rows, adjust as needed */}
    {paymentTerms.map((term, index) => (
        <div className="grid grid-cols-12 border-b border-b-slate-300 gap-2" key={index}>
            <div className="col-span-3 m-3">
                <textarea
                    value={term.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    className="w-full border-slate-400 border outline-red-700 rounded p-2 font-medium resize-none overflow-hidden"
                    rows={1}
                    ref={(el) => {
                        if (el) {
                            textAreasRef.current[index] = el;
                        }
                    }}
                />
            </div>
            <div className="col-span-2 m-3">
                <textarea
                    value={term.days}
                    onChange={(e) => handleInputChange(index, 'days', e.target.value)}
                    className="w-full border-slate-400 border outline-red-700 rounded p-2 font-medium resize-none overflow-hidden"
                    rows={1}
                    ref={(el) => {
                        if (el) {
                            textAreasRef.current[index] = el;
                        }
                    }}
                />
            </div>
            <div className="col-span-7 m-3 gap-[10px] flex items-center">
                <textarea
                    value={term.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    className="w-full border-slate-400 text-[12px] border outline-red-700 rounded p-2 resize-none overflow-hidden"
                    rows={1}
                    ref={(el) => {
                        if (el) {
                            textAreasRef.current[index] = el;
                        }
                    }}
                />
                {index > 2 ? (
                    <div onClick={() => deleteRow(index)} className="cursor-pointer">
                        <Trash2 size={20} color='#820000' />
                    </div>
                ) : (
                    <div className='ms-5'></div>
                )}
            </div>
        </div>
    ))}
</div>
                    <Button onClick={addNewRow} variant="secondary" className="h-[30px] w-[80px] m-5 flex justify-center" size="sm">
                        <CirclePlus size='12px' color="#565148" />
                        <p className="text-sm font-medium">Add</p>
                    </Button>
                    <div className="flex justify-end gap-2 mb-3">
                    <Button onClick={() => setModalOpen((prev) => !prev)} variant="secondary" className='h-[38px] w-[120px] flex justify-center'>
                            <p className='text-sm'>Cancel</p>
                        </Button>
                        <Button
                            onClick={handleAddPaymentTerms}
                            variant="primary"
                            className='h-[38px] w-[120px] flex justify-center'
                        >
                            <p className='text-sm'>Save</p>
                        </Button>
                    </div>
                </div>
            </Modal>

            {paymentTerms.map((data, index) => (
                <p key={index} className="text-textColor my-3 break-words whitespace-normal">
                    <div className="font-semibold flex text-[12px] items-center">
                        {data.name} - <span className='font-normal'>{data.description}</span>
                        <p className='px-1 text-[12px] bg-[#F3E6E6] ms-2'>{data.days} Days</p>
                    </div>
                </p>
            ))}
        </>
    );
}

export default PaymentTerms;
