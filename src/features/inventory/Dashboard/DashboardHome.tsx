import BarCharts from "./Barcharts";
import Cards from "./Cards";

type Props = {};

function DashboardHome({}: Props) {
  return (
    <>
      <div className="pl-5 pr-5 w-[100%]">
        <Cards />
      </div>
      <div className="p-5">
        <div className="w-[100%] p-3 bg-gray-100"></div>
        <div className="flex pl-3 pr-3 items-center gap-5">
          <div className="w-[80%]"></div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="">
          <BarCharts />
        </div>
        <div className="">
          <BarCharts />
        </div>
      </div>
      <div>
        <div className="">
          <BarCharts />
        </div>
        <div className="">
          <BarCharts />
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
