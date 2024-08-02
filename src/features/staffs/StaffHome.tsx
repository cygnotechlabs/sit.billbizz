import PlusCircle from "../../assets/icons/PlusCircle"
import Button from "../../Components/Button"
import StaffsDetailCards from "./StaffsDetailCards"
import StaffsFilterCards from "./StaffsFilterCards"
import StaffsTable from "./StaffsTable"

type Props = {}

function StaffHome({}: Props) {
  return (
    <>
    <div className="mx-5 my-4 flex items-center relative">
        <div>
          <h3 className="font-bold text-xl text-textColor">Staffs</h3>
          <p className="text-sm text-dropdownText mt-1">
          Lorem ipsum dolor sit amet consectetur. Commodo enim odio
          </p>
        </div>
        <div className="ml-auto gap-3 flex items-center">
          <Button variant="secondary"  size="sm">
            <PlusCircle color="#565148"/><p className="text-sm">Add Department</p>
          </Button>
          <Button variant="secondary"  size="sm">
            <PlusCircle color="#565148"/><p className="text-sm">Add Designation</p>
          </Button>
          <Button variant="primary"  size="sm">
            <PlusCircle color="white"/><p className="text-sm">Add Staff</p>
          </Button>
          </div>
          </div>
            <div className="mt-5">
                <StaffsDetailCards/>
            </div>
            <div className="px-7 mt-4">
      <div className="bg-white p-5 rounded-xl ">
      <div className="w-[100%] p-3 bg-gray-100">
        <StaffsFilterCards/>
      </div>
      <div className="mt-2 px-3">
        <StaffsTable/>
            </div>
        </div>
      </div>

          </>
  )
}

export default StaffHome