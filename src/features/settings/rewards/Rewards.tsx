import { useState } from "react";
import Banner from "../banner/Banner";

type Props = {};

function Rewards({}: Props) {
  const [selected, setSelected] = useState<string>("Cashback System");
  const [isGstRegistered, setIsGstRegistered] = useState(false);

  const handleToggle = () => {
    setIsGstRegistered(!isGstRegistered);
  };

  return (
    <div className="p-5">
      <Banner />
      <p className="text-textColor font-bold text-xl mt-4">Rewards</p>
      <div
        className="p-6 rounded-xl mt-4 text-white"
        style={{
          background: "linear-gradient(89.66deg, #000000 0%, #820000 100%)",
        }}
      >
        <p className="font-medium text-xl mt-20">Activate Your Reward Card</p>
        <p className="mt-2 text-sm">
          Enable your reward card to start earning points and <br /> enjoy
          special benefits today
        </p>
      </div>

      <div
        className="p-6 mt-4 rounded-lg"
        style={{
          background:
            "linear-gradient(89.66deg, #E3E6D5 -0.9%, #F7E7CE 132.22%)",
        }}
      >
        <div className="flex justify-between items-center">
          <p className="text-sm text-dropdownText">Enable Rewards?</p>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={isGstRegistered}
                onChange={handleToggle}
              />
              <div
                className={`w-11 h-6 rounded-full shadow-inner transition-colors ${
                  isGstRegistered ? "bg-checkBox" : "bg-dropdownBorder"
                }`}
              ></div>
              <div
                className={`dot absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                  isGstRegistered
                    ? "transform translate-x-full left-2"
                    : "left-1"
                }`}
              ></div>
            </div>
            <div className="ml-3 text-textColor text-sm">
              {isGstRegistered ? "Yes" : "Yes"}
            </div>
          </label>
        </div>
      </div>
      <div>
        {isGstRegistered && (
          <>
            <div className="p-6 rounded-lg bg-white mt-4">
              <p className="text-textColor font-bold">
                Choose Your Reward System You Prefer
              </p>

              <div className="flex items-start gap-[22px] text-[#495160] mt-4">
                <div className="flex gap-2 items-center">
                  <div className="grid place-items-center">
                    <input
                      id="Cashback System"
                      type="radio"
                      name="rewardType"
                      className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                        selected === "Cashback System"
                          ? "border-8 border-neutral-400"
                          : "border-1 border-neutral-400"
                      }`}
                      onChange={() => setSelected("Cashback System")}
                      checked={selected === "Cashback System"}
                    />
                    <div
                      className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                        selected === "Cashback System"
                          ? "bg-neutral-100"
                          : "bg-transparent"
                      }`}
                    />
                  </div>
                  <label
                    htmlFor="Cashback System"
                    className="text-start text-sm"
                  >
                    Cashback System
                  </label>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="grid place-items-center">
                    <input
                      id="Reward Point"
                      type="radio"
                      name="rewardType"
                      className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                        selected === "Reward Point"
                          ? "border-8 border-neutral-400"
                          : "border-1 border-neutral-400"
                      }`}
                      onChange={() => setSelected("Reward Point")}
                      checked={selected === "Reward Point"}
                    />
                    <div
                      className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                        selected === "Reward Point"
                          ? "bg-neutral-100"
                          : "bg-transparent"
                      }`}
                    />
                  </div>
                  <label htmlFor="Reward Point" className="text-start text-sm">
                    Reward Point System
                  </label>
                </div>
              </div>

              {/* Conditional Rendering */}
              <div className="mt-4">
                {selected === "Cashback System" && (
                <div className="text-dropdownText text-sm mt-4">
                <label htmlFor="">Percentage %</label><br />
                <input
                  type="text"
                  className="pl-2 text-sm w-[43%] mt-1 rounded-[4px] text-start bg-white border border-slate-300 h-9 p-2"
                  placeholder="Enter Percentage"
                />
              </div>
                )}
                {selected === "Reward Point" && (
                 <div>

                 </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Rewards;
