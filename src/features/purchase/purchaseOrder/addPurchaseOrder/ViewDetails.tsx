import { useState } from "react"
import ScanEye from "../../../../assets/icons/ScanEye";


function viewDetails (){
    const [viewDatils,setViewDetails]=useState <boolean>(false)

    return(
        <>
                   {
            viewDatils ? 
<>
              <button onClick={()=>setViewDetails(false)} className="flex items-center text-textColor font-semibold text-sm"><ScanEye/> View Less Details</button>
              <div className="grid grid-cols-2 gap-4 my-4 text-textColor text-sm">
              <div className="text-sm">
              <label htmlFor="" className="">
               Other Expense Amount
                <input
                  name=""
                  id=""
                  placeholder=""
                  className="border-inputBorder w-full text-sm border rounded  p-2 h-9 mt-2 "
                />
              </label>
            </div>
            <div className="text-sm">
              <label htmlFor="" className="">
               Other Expense Reason
                <input
                  name=""
                  id=""
                  placeholder=""
                  className="border-inputBorder w-full text-sm border rounded  p-2 h-9 mt-2 "
                />
              </label>
            </div>
            <div className="text-sm">
              <label htmlFor="" className="">
              Fright Amount
                <input
                  name=""
                  id=""
                  placeholder=""
                  className="border-inputBorder w-full text-sm border rounded  p-2 h-9 mt-2 "
                />
              </label>
            </div>
            <div className="text-sm">
              <label htmlFor="" className="">
              Rount Off Amount
                <input
                  name=""
                  id=""
                  placeholder=""
                  className="border-inputBorder w-full text-sm border rounded  p-2 h-9 mt-2 "
                />
              </label>
            </div>
            <div className="text-sm">
              <label htmlFor="" className="">
               Vehicle Number
                <input
                  name=""
                  id=""
                  placeholder=""
                  className="border-inputBorder w-full text-sm border rounded  p-2 h-9 mt-2 "
                />
              </label>
            </div>

              </div>

  
</>            :<><button onClick={()=>setViewDetails(true)} className="flex items-center text-textColor font-semibold text-sm"><ScanEye/>View More</button></>
           }
        </>
    )
}
export default viewDetails