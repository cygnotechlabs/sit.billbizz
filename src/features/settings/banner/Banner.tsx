import bgImage from "../../../assets/Images/Group 37 (1).png";
type Props = {
  isOrganisationDetails?:boolean;
  oneOrganization?:object
}

function Banner({isOrganisationDetails,oneOrganization}: Props) {
  return (
    <div className="bg-[#F7E7CE] rounded-md  flex  h-[148px] ">
        {isOrganisationDetails&&<div className="ms-2 p-2   text-center mt-3   items-center flex">
          <div>
            <p className="bg-gray text-sm w-fit  text-yellow-50 rounded-md p-2">
              Organization
            </p>

            <div className="flex mt-1">
              <p className="mt-1 text-[#303F58]">
                <b>
                  {oneOrganization?.organizationName || "Organization Profile"}
                </b>
              </p>{" "}
              {
                <div className="ms-3 bg-white rounded-md p-1 text-textColor">
                  ID:{oneOrganization?.organizationId || 852749}
                </div>
              }
            </div>
          </div>
        </div>}

        <div className="flex ml-auto w-fit">
          <img src={bgImage} className="bottom-0 top-8 mt-auto" alt="" />
        </div>
      </div>
  )
}

export default Banner