import { useState, useEffect } from "react";
import Drawer from "../../../Components/drawer/drawer";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";

type Props = {
  id: string | undefined;
};

const CustomerHistory = ({ id }: Props) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { request: GetAllHistory } = useApi("get", 5002);

  const fetchAllAccounts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `${endponits.GET_CUSTOMER_HISTORY}/${id}`;
      const { response, error } = await GetAllHistory(url);
      if (!error && response) {
        setHistoryData(response.data);
      } else {
        setError("Failed to fetch customer history.");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      fetchAllAccounts();
    }
  }, [isDrawerOpen]);

  const formatDate = (dateString: string) => {
    try {
      const [datePart, timePart] = dateString.split(" ");

      const [day, monthStr, year] = datePart.split("/");

      const monthMap: { [key: string]: number } = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      };

      const month = monthMap[monthStr];

      const [hourStr, minuteStr] = timePart.split(":");
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      const dateObj = new Date(Number(year), month, Number(day), hour, minute);

      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date");
      }

      const formattedDate = `${String(day).padStart(2, "0")}/${String(
        month + 1
      ).padStart(2, "0")}/${year}`;

      const hours12 = hour % 12 || 12;
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedTime = `${hours12}:${minuteStr.padStart(2, "0")} ${ampm}`;

      return { formattedDate, formattedTime };
    } catch (error) {
      return { formattedDate: "Invalid Date", formattedTime: "" };
    }
  };

  const getCircleStyle = (title: string) => {
    switch (title) {
      case "Contact Added":
        return { bgColor: "bg-[#97998E]", text: "tg" };
      case "Invoice Created":
        return { bgColor: "bg-[#B9AD9B]", text: "rss" };
      default:
        return { bgColor: "bg-[#820000]", text: "" };
    }
  };

  return (
    <>
      <button onClick={toggleDrawer}>View Status History</button>

      <Drawer onClose={toggleDrawer} open={isDrawerOpen} position="right">
        <div className="p-6">
          <h1 className="text-start">Customer Status History</h1>

          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!isLoading && !error && historyData.length === 0 && (
            <p>No history available.</p>
          )}

          <div className="flex flex-col relative pb-8 px-2 my-8">
            {historyData.map((item: any, index: number) => {
              const circleStyle = getCircleStyle(item.title);
              const { formattedDate, formattedTime } = formatDate(
                item.date + " " + item.time
              );

              return (
                <div key={index} className=" flex ">
                  <div className="flex gap-3">
                    <div className="items-center">
                      <div
                        className={`w-8 h-8 z-10 ${circleStyle.bgColor} flex items-center justify-center rounded-full text-white`}
                      >
                        {item.initials}
                      </div>
                      <div className="flex items-center justify-center my-3">
                        {" "}
                        <div className="w-[2px]  left-4  bg-[#DADBDD] h-24"></div>
                      </div>
                    </div>

                    <div className="space-y-2 text-start mt-2">
                      <div className="flex space-x-3 text-[14px] ">
                        <p>{formattedDate}</p>
                        <p>{formattedTime}</p>
                      </div>
                      <p className="font-bold text-[14px] py-1">{item.title}</p>
                      <p className="text-[12px]">{item.description}</p>
                      <div className="flex space-x-4 font-bold text-[14px]">
                        <p>{item.author}</p>
                        {/* <p><u>View Details</u></p> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CustomerHistory;
