import { useState } from "react";
import OrganizationIcon from "../../../assets/icons/OrganizationIcon";
import SettingsIcons from "../../../assets/icons/SettingsIcon";
import Drawer from "../../../Components/drawer/drawer";
import Button from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Components/model/Modal";

type Props = {};

function Organization({}: Props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false); // State for controlling the modal

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const navigate = useNavigate();

  // Open modal for logout confirmation
  const confirmLogout = () => {
    setLogoutModalOpen(true);
  };

  // Handle actual logout action
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setLogoutModalOpen(false); // Close modal after logging out
  };

  // Close the modal without logging out
  const closeModal = () => {
    setLogoutModalOpen(false);
  };

  return (
    <>
      <button onClick={toggleDrawer}>
        <OrganizationIcon />
      </button>

      <Drawer onClose={toggleDrawer} open={isDrawerOpen} position="right">
        <div className="flex items-center justify-between p-5">
          <h5 className="text-md font-semibold text-gray-700">
            My Organizations
          </h5>
          <div className="flex gap-2 items-center">
            <div>
              <SettingsIcons size="sm" />
            </div>
            <button
              onClick={toggleDrawer}
              className="font-normal text-textColor hover:text-gray-700 text-3xl -mt-1"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {["Company branch 1", "Company branch 2", "Company branch 3"].map((branch, index) => (
            <div key={index} className="flex items-center border border-slate-200 p-4 rounded-md shadow-sm">
              <div className="mr-4">
                <OrganizationIcon />
              </div>
              <div className="flex-grow">
                <h5 className="font-bold text-sm text-gray-700">{branch}</h5>
                <p className="text-xs text-gray-700">
                  Organization ID: 43434659883
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-xs bg-yellow-100 border text-yellow-800 py-1 px-2 rounded-2xl pl-2 pr-2">
                  Trail
                </span>
              </div>
              <div className="ml-24">
                <input
                  type="radio"
                  name="selectedBranch"
                  className="h-4 w-4"
                />
              </div>
            </div>
          ))}
          <div className="flex justify-center items-center">
            <Button className="pl-10 pr-10 h-[34px] text-sm" onClick={confirmLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Drawer>

      {isLogoutModalOpen && (
        <Modal
          open
          onClose={closeModal} 
          className="rounded-lg p-8 w-[546px] h-[160px] text-[#303F58] space-y-8"
        >
          <p className="text-sm">
            Are you sure you want to log out?
          </p>
          <div className="flex justify-end gap-2 mb-3">
            <Button
              onClick={closeModal} 
              variant="secondary"
              className="pl-8 pr-8 text-sm h-10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout} 
              variant="primary"
              className="pl-8 pr-8 text-sm h-10"
            >
              Ok
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Organization;
