import bgimage from "../../../../assets/Images/Organization-banner.png";
import Button from "../../../../Components/Button";

type Props = {}

function DeliveryChallans({}: Props) {
  return (
    <div className="p-5">
      <div
        className="w-full h-[148px] bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${bgimage})` }}
      />

      <p className="text-textColor font-bold text-xl mt-4">Delivery Challans</p>

      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-bold text-textColor text-sm mb-3">Terms & Condition</p>
        <textarea
          className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none"
        />
      </div>

      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-bold text-textColor text-sm mb-3">Customer Notes</p>
        <textarea
          className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none"
        />
      </div>

      <div className="mt-4 flex justify-end">
      <Button size="sm" className="text-sm  pl-10 pr-10">Save</Button>
      </div>
    </div>
  );
}

export default DeliveryChallans;
