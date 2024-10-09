
import ItemTable from "./ItemTable";


 
type Props = {};

const ItemTrackingHome = ({}: Props) => {
  return (
    <>
      <div className="mx-5 my-4  h-[100vh]  gap-3">
        <div className="flex">
          <div>
            <h1 className="font-bold text-lg">
              Item Tracking
            </h1>
            <p className="text-sm text-gray mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              cumque rerum, sequi fugit ullam eius aspernatur
            </p>
          </div>
          <div className="ml-auto flex items-center">

            <div className="ms-5">
        
            </div>
          </div>
        </div>
  <ItemTable/>

      </div>{" "}

    </>
  );
};

export default ItemTrackingHome;
