import AvaragePurchase from "../../accountant/Dashboard/AvaragePurchase";
import CustomersRetentionRate from "../../accountant/Dashboard/CustomersRetentionRate";
import RepeatPurchaseRate from "../../accountant/Dashboard/RepeatPurchaseRate";
import TopCustomers from "../../accountant/Dashboard/TopCustomers";

import Cards from "./Cards";

type Props = {};

function DashboardHome({}: Props) {
  return (
    <>
      <div className="pl-5 pr-5 w-[100%]">
        <Cards/>
      </div>
      <div className="p-5">
        <div className="w-[100%] p-3 bg-gray-100"></div>
        <div className="flex pl-3 pr-3 items-center gap-5">
          <div className="w-[80%]"></div>
        </div>
      </div>
     
      <div>
      <div className="grid grid-cols-3 gap-5">
          <div className="flex justify-center ">
            <TopCustomers />
          </div>
          <div className="col-span-2 flex justify-center">
            <CustomersRetentionRate />
          </div>
          <div className="col-span-2 flex justify-center ">
            <RepeatPurchaseRate />
          </div>
          <div className=" flex justify-center">
            <AvaragePurchase />
          </div>
        </div>
      </div>

      </>
  );
}
 

export default DashboardHome;
