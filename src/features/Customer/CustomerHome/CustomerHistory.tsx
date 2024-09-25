import { useState, useEffect } from "react";
import Drawer from "../../../Components/drawer/drawer";
// import NewspaperIcon from "../../../assets/icons/NewspaperIcon";
// import ShoppingCart from "../../../assets/icons/ShoppingCart";
// import UserRound from "../../../assets/icons/UserRound";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";

type Props = {
  id: string | undefined;  // Corrected type definition
};

const CustomerHistory = ({ id }: Props) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { request: GetAllHistory } = useApi("put", 5001);

  const fetchAllAccounts = async () => {
    if (!id) {
      setError("Customer ID is missing.");
      return;
    }

    setIsLoading(true);
    setError(null);  // Reset error
    try {
      const url = `${endponits.GET_CUSTOMER_HISTORY}/${id}`;
      const body = { organizationId: "INDORG0001" };
      const { response, error } = await GetAllHistory(url, body);
      if (!error && response) {
        setHistoryData(response.data);  // Store the response data into the state
      } else {
        setError("Failed to fetch customer history.");
      }
    } catch (error) {
    //   setError("Error fetching accounts: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // Fetch the customer history when drawer is opened
  useEffect(() => {
    if (isDrawerOpen) {
      fetchAllAccounts();
    }
  }, [isDrawerOpen]);

  // const getCircleStyle = (title: string) => {
  //   switch (title) {
  //     case 'Contact Added':
  //       return { bgColor: 'bg-[#97998E]', text: 'tg' };
  //     case 'Invoice Created':
  //       return { bgColor: 'bg-[#B9AD9B]', text: 'rss' };
  //     default:
  //       return { bgColor: 'bg-[#820000]', text: '' };  // Default style
  //   }
  // };
console.log(historyData)
  return (
    <>
      <button onClick={toggleDrawer}>View Status History</button>

      <Drawer onClose={toggleDrawer} open={isDrawerOpen} position="right">
        <h1 className="my-4">Customer Status History</h1>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && historyData.length === 0 && <p>No history available.</p>}

        {/* <div className="flex flex-col relative pb-8 px-6">
          <div className="w-[2px] absolute left-4 top-0 bg-slate-500" style={{ height: 'calc(100% - 70px)' }}></div>
          {historyData.map((item, index) => {
            const circleStyle = getCircleStyle(item.title);
            return (
              <div key={index} className="space-x-4 flex pb-8">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 z-10 ${circleStyle.bgColor} flex items-center justify-center rounded-full text-white`}>
                    {item.initials} 
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex space-x-3 text-[14px]">
                    <p>{item.date}</p>
                    <p>{item.time}</p>
                  </div>
                  <p className="font-bold">{item.title}</p>
                  <p>{item.description}</p>
                  <div className="flex space-x-4 font-bold text-[14px]">
                    <p>{item.author}</p>
                    <p><u>View Details</u></p>
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}
      </Drawer>
    </>
  );
};

export default CustomerHistory;
