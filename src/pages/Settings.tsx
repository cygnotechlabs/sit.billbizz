import React, { useState } from "react";

interface Setting {
  title: string;
  description: string;
  imageUrl: string;
}

const settingsData: Setting[] = [
  {
    title: "Organization",
    description: "Lorem ipsum dolor sit amet consectetur.",
    imageUrl: "url-to-organization-image",
  },
  {
    title: "Taxes & Compliance",
    description: "Lorem ipsum dolor sit amet consectetur.",
    imageUrl: "url-to-taxes-image",
  },
  {
    title: "Users & Roles",
    description: "Lorem ipsum dolor sit amet consectetur.",
    imageUrl: "url-to-users-image",
  },
  {
    title: "Preferences",
    description: "Lorem ipsum dolor sit amet consectetur.",
    imageUrl: "url-to-preferences-image",
  },
  {
    title: "Sales",
    description: "Lorem ipsum dolor sit amet consectetur.",
    imageUrl: "url-to-sales-image",
  },
  {
    title: "Purchases",
    description: "Lorem ipsum dolor sit amet consectetur.",
    imageUrl: "url-to-purchases-image",
  },
  {
    title: "Items",
    description: "Lorem ipsum dolor sit amet consectetur.",
    imageUrl: "url-to-items-image",
  },
  {
    title: "Online Payments",
    description: "Lorem ipsum dolor sit amet consectetur.",
    imageUrl: "url-to-online-payments-image",
  },
  {
    title: "Customization",
    description: "Lorem ipsum dolor sit amet consectetur.",
    imageUrl: "url-to-customization-image",
  },
  {
    title: "Reminder & Notification",
    description: "Lorem ipsum dolor sit amet consectetur.",
    imageUrl: "url-to-reminder-image",
  },
];

const SettingCard: React.FC<Setting> = ({ title, description, imageUrl }) => (
  <div className="bg-white rounded-lg shadow-md p-4 text-center">
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-32 object-cover rounded-t-lg"
    />
    <h3 className="mt-4 text-lg font-semibold">{title}</h3>
    <p className="text-gray-500">{description}</p>
    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
      See Details
    </button>
  </div>
);

const Settings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSettings = settingsData.filter((setting) =>
    setting.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Settings</h1>
        <input
          type="text"
          placeholder="Search in Settings"
          className="border border-gray-300 rounded-lg py-2 px-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Close
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSettings.map((setting) => (
          <SettingCard key={setting.title} {...setting} />
        ))}
      </div>
    </div>
  );
};

export default Settings;
