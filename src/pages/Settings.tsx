import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Setting {
  title: string;
  description: string;
  imageUrl: string;
  route: string;
}

const settingsData: Setting[] = [
  {
    title: "Organization",
    description: "Manage organization settings",
    imageUrl: "url-to-organization-image",
    route: "/settings/organization/profile",
  },
  {
    title: "Taxes & Compliance",
    description: "Manage taxes and compliance settings",
    imageUrl: "url-to-taxes-image",
    route: "/settings/taxes-compliance",
  },
  {
    title: "Users & Roles",
    description: "Manage users and roles settings",
    imageUrl: "url-to-users-image",
    route: "/settings/users-roles",
  },
  {
    title: "Preferences",
    description: "Manage system preferences",
    imageUrl: "url-to-preferences-image",
    route: "/settings/preferences",
  },
  {
    title: "Sales",
    description: "Manage sales settings",
    imageUrl: "url-to-sales-image",
    route: "/settings/sales",
  },
  {
    title: "Purchases",
    description: "Manage purchases settings",
    imageUrl: "url-to-purchases-image",
    route: "/settings/purchases",
  },
  {
    title: "Items",
    description: "Manage item settings",
    imageUrl: "url-to-items-image",
    route: "/settings/items/item",
  },
  {
    title: "Online Payments",
    description: "Manage online payment settings",
    imageUrl: "url-to-online-payments-image",
    route: "/settings/online-payments",
  },
  {
    title: "Customization",
    description: "Manage customization settings",
    imageUrl: "url-to-customization-image",
    route: "/settings/customization",
  },
  {
    title: "Reminder & Notification",
    description: "Manage reminder and notification settings",
    imageUrl: "url-to-reminder-image",
    route: "/settings/reminder-notification",
  },
];

const SettingCard: React.FC<Setting> = ({
  title,
  description,
  imageUrl,
  route,
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 text-center">
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-32 object-cover rounded-t-lg"
    />
    <h3 className="mt-4 text-lg font-semibold">{title}</h3>
    <p className="text-gray-500">{description}</p>
    <Link to={route}>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        See Details
      </button>
    </Link>
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
