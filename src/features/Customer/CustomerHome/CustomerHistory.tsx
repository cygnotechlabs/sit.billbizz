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
        console.log(response);
        
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

  const formatDateTime = (dateString: string) => {
    const [datePart, timePart] = dateString.split(" ");
    const [hoursString, minutes] = timePart.split(":"); 
    let period = "AM";
    
    let hours = parseInt(hoursString);
  
    if (hours >= 12) {
      period = "PM";
      hours = hours > 12 ? hours - 12 : hours; 
    } else if (hours === 0) {
      hours = 12; 
    }
  
    const formattedTime = `${hours}:${minutes} ${period}`;
    
    return { date: datePart, time: formattedTime }; 
  };
  
  

  return (
    <>
      <button onClick={toggleDrawer}>View Status History</button>

      <Drawer onClose={toggleDrawer} open={isDrawerOpen} position="right">
        <div className="p-6  ">
          <h1 className="text-start">Customer Status History</h1>

          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!isLoading && !error && historyData.length === 0 && (
            <p>No history available.</p>
          )}

          <div className="flex flex-col relative pb-8 px-2 my-8 h-96 overflow-x-scroll hide-scrollbar">
            {historyData.map((item: any, index: number) => {
              const circleStyle = getCircleStyle(item.title);
              const { date, time } = formatDateTime(item.date);

              return (
                <div key={index} className="flex">
                  <div className="flex gap-3">
                    <div className="items-center">
                      <div
                        className={`w-8 h-8 z-10 ${circleStyle.bgColor} flex items-center justify-center rounded-full text-white`}
                      >
                        {item.initials}
                      </div>
                      <div className="flex items-center justify-center my-3">
                        <div className="w-[2px] left-4 bg-[#DADBDD] h-14"></div>
                      </div>
                    </div>

                    <div className="space-y-2 text-start mt-2">
                      <div className="flex space-x-3 text-[14px]">
                        <p>{date}</p>
                        <p>{time}</p>
                      </div>
                      <p className="font-bold text-[14px] py-1">{item.title}</p>
                      <p className="text-[12px]">{item.description}</p>
                      <div className="flex space-x-4 font-bold text-[14px]">
                        <p>{item.author}</p>
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
