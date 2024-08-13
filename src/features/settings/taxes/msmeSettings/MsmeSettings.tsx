import { ChangeEvent, FormEvent, useState } from "react";
import Banner from "../../banner/Banner";
import CehvronDown from "../../../../assets/icons/CehvronDown";
import Button from "../../../../Components/Button";
import useApi from "../../../../Hooks/useApi";
import { endponits } from "../../../../Services/apiEndpoints";

type Props = {}

function MsmeSettings({ }: Props) {
    const initialMsmeSettings = {
        organizationId: "INDORG0001",
        msmeType: "",
        msmeRegistrationNumber: ""
    };
    const [msmeSettings, setMsmeSettings] = useState(initialMsmeSettings);
    const { request: CreateMsme } = useApi("post", 5004);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setMsmeSettings((prevMsme) => ({
            ...prevMsme,
            [name]: value,
        }));
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const url = `${endponits.ADD_NEW_TAX}`;
            const body = msmeSettings;
            const { response, error } = await CreateMsme(url, body);
            if (!error && response) {
                setMsmeSettings(initialMsmeSettings);
                alert("MSME Settings Updated");
                console.log(initialMsmeSettings);
                
            } else {
                console.log("Error:", error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const [isGstRegistered, setIsGstRegistered] = useState(false);
    const handleToggle = () => {
        setIsGstRegistered(!isGstRegistered);
    };

    return (
        <div className="p-5">
            <Banner />

            <p className="text-textColor font-bold mt-4">GST Settings</p>
            <div className="p-6 mt-4 rounded-lg" style={{
                background: 'linear-gradient(89.66deg, #E3E6D5 -0.9%, #F7E7CE 132.22%)',
            }}>
                <div className="flex justify-between items-center">
                    <p className="text-base text-dropdownText">Is your business MSME registered?</p>
                    <label className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" className="sr-only" checked={isGstRegistered} onChange={handleToggle} />
                            <div className={`w-11 h-6 rounded-full shadow-inner transition-colors ${isGstRegistered ? 'bg-checkBox' : 'bg-dropdownBorder'}`}></div>
                            <div className={`dot absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${isGstRegistered ? 'transform translate-x-full left-2' : 'left-1'}`}></div>
                        </div>
                        <div className="ml-3 text-textColor text-sm">{isGstRegistered ? 'Yes' : 'Yes'}</div>
                    </label>
                </div>
            </div>

            {isGstRegistered && (
                <div className="p-6 rounded-lg bg-white mt-4">
                    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="msmeType" className="block mb-1 text-[#495160] text-sm">
                                    MSME/Udyam Registration Type
                                </label>
                                <div className="relative">
                                    <select
                                        name="msmeType"
                                        value={msmeSettings.msmeType}
                                        onChange={handleChange}
                                        className="block appearance-none h-9 mt-2 text-zinc-400 bg-white border border-inputBorder 
                                            text-sm pl-2 pr-8 rounded-md w-full
                                            focus:outline-none focus:bg-white focus:border-gray-500"
                                    >
                                        <option value="" className="text-gray">
                                            Select the Registration Type
                                        </option>
                                        <option value="Micro" className="text-gray">
                                            Micro
                                        </option>
                                        <option value="Small" className="text-gray">
                                            Small
                                        </option>
                                        <option value="Medium" className="text-gray">
                                            Medium
                                        </option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <CehvronDown color="gray" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="msmeRegistrationNumber" className="text-[#495160] text-sm">
                                    MSME/Udyam Registration Number
                                </label>
                                <input
                                    type="text"
                                    name="msmeRegistrationNumber"
                                    value={msmeSettings.msmeRegistrationNumber}
                                    onChange={handleChange}
                                    className="pl-2 text-sm w-full mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2"
                                    placeholder="Enter the Registration Number"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button variant="primary" className="pl-10 pr-10 h-[38px] text-sm" size="sm">
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default MsmeSettings;
