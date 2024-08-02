import React, { useState, useRef, useEffect } from "react";
import CheveronDownIcon from "../../assets/icons/CheveronDownIcon";

type DropdownItem = {
    text: string;
    onClick: () => void;
};

type CustomDropdownProps = {
    label: string;
    items: DropdownItem[];
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, items }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(label);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleItemClick = (item: DropdownItem) => {
        item.onClick();
        setSelectedLabel(item.text);
        setIsDropdownOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={toggleDropdown}
                className="border border-outlineButton p-2 pl-3 pr-3 rounded-lg text-sm text-outlineButton flex items-center gap-2 font-medium"
            >
                {selectedLabel} <CheveronDownIcon color="#565148" />
            </button>
            {isDropdownOpen && (
                <div className="absolute top-10 right-0 rounded-md w-56 bg-white shadow-xl z-20 pl-2 pr-2">
                    <ul className="py-1 text-dropdownText">
                        {items.map((item, index) => (
                            <>
                            <li
                                key={index}
                                onClick={() => handleItemClick(item)}
                                className="px-4 py-2 flex items-center gap-2 hover:bg-orange-100 rounded-md text-sm cursor-pointer"
                            >
                                {item.text}
                            </li>
                            <div className="pl-2 pr-2">
                  {(item.text === "Per Day" || item.text === "Monthly Salary") && (
                    <hr className="border-dropdownBorder" />
                  )}
                </div>
                            </>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
