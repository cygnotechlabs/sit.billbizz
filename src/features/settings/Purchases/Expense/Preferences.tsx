import CehvronDown from "../../../../assets/icons/CehvronDown";

type Props = {};

const Preferences = ({}: Props) => {
  return (
    <div>
      <div className="bg-white rounded-lg p-5 my-4">
        <div className="flex text-textColor  items-center gap-4">
          <p className="mt-2">Default Mileage Account</p>{" "}
          <div className="relative w-60 mt-3 ">
            <select
              name=""
              id=""
              className="block appearance-none w-full text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
            >
              <option value="">Fuel/Mileage Expenses</option>

             
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <CehvronDown color="gray" />
            </div>
          </div>
        </div>
        <div className="flex text-textColor  items-center gap-4">
          <p className="mt-2">Default Unit</p>{" "}
         
        </div>
      </div>
    </div>
  );
};

export default Preferences;
