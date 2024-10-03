import React from 'react';


const TopProducts: React.FC = () => {
  return (
    <div className="bg-white rounded-lg w-full px-8 py-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[16px] font-bold">Total Purchase by Supplier</h3>



        <select
          className="border border-[#565148] h-8 pl-3 pr-4 rounded-md bg-[#FEFDFA]  text-xs font-semibold text-gray-800"
          style={{ color: "#585953" }}
        >
          <option>Select Supplier</option>
          <option>Other</option>
          <option>Other</option>
          <option>Other</option>
        </select>
      </div>
      


    </div>
  );
};

export default TopProducts;
