import { useState } from "react";
import { Link } from "react-router-dom";
import CheveronLeftIcon from "../../../assets/icons/CheveronLeftIcon";
import clock from "../../../assets/Images/clock_5844425 1.png";
import Overview from "./Overview";
import PaymentDetails from "./PaymentDetails";
import SearchCheckIcon from "../../../assets/icons/SearchCheckIcon";
import IndianRupeeIcon from "../../../assets/icons/IndianRupeeIcon";


type Props = {};

function StaffsOverview({ }: Props) {
    const [selectedTab, setSelectedTab] = useState<"overview" | "payment">("overview");

    return (
        <div className="mx-5 my-4">
            <div className="flex items-center gap-5">
                <Link to={"/staffs/home"}>
                    <div
                        style={{ borderRadius: "50%" }}
                        className="w-[40px] h-[40px] flex items-center justify-center bg-white"
                    >
                        <CheveronLeftIcon />
                    </div>
                </Link>
                <p className="text-textColor text-xl font-bold">Staff Overview</p>
            </div>
            <div className="p-6 rounded-lg flex justify-between mt-4"
                style={{
                    backgroundImage: "url('https://s3-alpha-sig.figma.com/img/fcb3/f393/a40c4dbb90673823d0e163744de9fb67?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aSXeEmG-KpgjRYllb19ZEE8jy8v4StPMpo9~kdUdbUSYfcfWVHutOBNgMGbqxwn3dxRBDsv1JYtoUxMYfJV7kkhCje61ael4G-QI~ug52hWKG0eJZe5wwrpQZ9-6kZyZuWM9fGRvNcgNx1iKDdNk0aXEw3Fx7UMxbMMFbjf24B559MHmBsivDEo~DYLssAaZBUeD5BJevwhkXWlcgoPkBndblnuwERsPN9TKqkkks4ChfjjEDCrhj7~B4tXtUQJzT-wc8AnvW7rs6IfwCUS8AL5bTDb-LCz-~kQ65dDKAtli5yX-rehadWnfsrT2CjC5~C7DsFJAQNSIr190TpqToQ__')",
                    backgroundSize: "cover",
                    backgroundPosition: "left",
                }}
            >
                <div className="flex items-center gap-4">
                    <img src={clock} alt="" />
                    <div>
                        <p className="text-[#F3F3F3] font-bold text-base">Some of the Staff Profile Haven't Completed fully</p>
                        <p className="text-[#F6F6F6] text-sm mt-2">Some of the Staff Profile Haven't Completed fully</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <p className="flex items-center text-3xl text-white cursor-pointer font-light">&times;</p>
                </div>
            </div>

            <div className="flex gap-2 mt-4 py-2 px-4 bg-white w-[50%] rounded-lg">
                <button
                    className={`px-4 py-2 rounded-lg w-[315px] text-sm font-semibold
                         ${selectedTab === "overview" ? "bg-BgSubhead text-textColor" : "text-textColor"}`}
                    onClick={() => setSelectedTab("overview")}
                ><span className="flex items-center justify-center gap-2">
                    <SearchCheckIcon color="#303F58"/> Overview
                </span>
                </button>
                <button
                    className={`px-4 py-2 rounded-lg w-[315px] text-sm font-semibold
                         ${selectedTab === "payment" ? "bg-BgSubhead text-textColor" : "text-textColor"}`}
                    onClick={() => setSelectedTab("payment")}
                >
                    <span className="flex items-center justify-center gap-2">
                <IndianRupeeIcon color="#303F58"/>   Payment Details
                    </span>
                </button>
            </div>

            <div className="mt-4 h-[100vh]">
                {selectedTab === "overview" ? <Overview/> : <PaymentDetails/>}
            </div>
        </div>
    );
}

export default StaffsOverview;
