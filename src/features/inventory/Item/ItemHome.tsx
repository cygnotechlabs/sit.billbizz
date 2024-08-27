import PlusCircle from "../../../assets/icons/PlusCircle";
import Button from "../../../Components/Button";
import Items from "./Items";
import ItemTable from "./ItemTable";
import { Link } from "react-router-dom";
type Props = {};

function ItemHome({}: Props) {
  return (
    <div className="m-7">
      <div className="flex justify-between items-center">
        <div>
          <h1>Item</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur. Commodo enim odio fringilla
            egestas consectetur amet.
          </p>
        </div>
       <Link to={"/inventory/Item/new"}>
          <Button variant="primary" size="xl">
            <PlusCircle color="white" />
            <p className="text-sm font-medium">Add Item</p>
          </Button>
       </Link>
      </div>
      <div className="flex flex-col mt-4 gap-2 bg-white rounded-lg p-6">
        <div>
          <Items />
        </div>
        <div>
          <ItemTable />
        </div>
      </div>
    </div>
  );
}

export default ItemHome;
