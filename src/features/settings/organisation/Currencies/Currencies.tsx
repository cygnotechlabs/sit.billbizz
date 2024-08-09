import CurrencyTable from "./CurrencyTable";
import Button from "../../../../Components/Button";
import PlusCircle from "../../../../assets/icons/PlusCircle";
import Banner from "../../banner/Banner";

type Props = {};

const Currencies: React.FC<Props> = () => {
  return (
    <div className="px-3 pt-3 overflow-y-scroll hide-scrollbar">
      <Banner />
      <div className="p-2 flex items-center ">
        <p className="font-bold">Currencies</p>

        <div className="ml-auto flex gap-4 items-center">
          <Button variant="primary" size="sm">
            <PlusCircle color={"white"} />
            New Currency
          </Button>
        </div>
      </div>
      <div className="bg-white p-3">
        {" "}
        <CurrencyTable />
      </div>
    </div>
  );
};

export default Currencies;
