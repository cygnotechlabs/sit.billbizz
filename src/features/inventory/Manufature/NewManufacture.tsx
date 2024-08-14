import { forwardRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../../Components/Button";
import Modal from "../../../Components/model/Modal";
import PencilEdit from "../../../assets/icons/PencilEdit";
import TrashCan from "../../../assets/icons/TrashCan";
import PlusCircle from "../../../assets/icons/PlusCircle";
import bgImage from "../../../assets/Images/6.png";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";

type Manufacturer = {
  _id?: string;
  name: string;
  description: string;
  organizationId?: string;
  createdDate?: string;
};

type Props = {
  onClose: () => void;
};

const NewManufacture = forwardRef<HTMLDivElement, Props>(({ onClose }, ref) => {
  const { request: fetchAllManufacturers } = useApi("put", 5003);
  const { request: deleteManufacturerRequest } = useApi("delete", 5003);
  const { request: updateManufacturerRequest } = useApi("put", 5003);
  const { request: addManufacturerRequest } = useApi("post", 5003);

  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editableManufacturer, setEditableManufacturer] =
    useState<Manufacturer | null>(null);

  useEffect(() => {
    const loadManufacturers = async () => {
      try {
        const url = `${endponits.GET_ALL_MANUFACTURER}`;
        const body = { organizationId: "INDORG0001" };
        const { response, error } = await fetchAllManufacturers(url, body);
        if (!error && response) {
          setManufacturers(response.data);
        } else {
          toast.error("Failed to fetch manufacturers.");
        }
      } catch (error) {
        toast.error("Error fetching manufacturers data");
        console.error("Error fetching manufacturers data", error);
      }
    };

    loadManufacturers();
  }, []);

  const openModal = (manufacturer?: Manufacturer) => {
    if (manufacturer) {
      setEditableManufacturer(manufacturer);
    } else {
      setEditableManufacturer({ name: "", description: "" });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditableManufacturer(null);
  };

  const handleSave = async () => {
    try {
      const isEditing = Boolean(editableManufacturer?._id);
      const manufacturer: Partial<Manufacturer> = {
        organizationId: "INDORG0001",
        name: editableManufacturer?.name || "",
        description: editableManufacturer?.description || "",
        ...(isEditing && { _id: editableManufacturer?._id }),
      };

      const url = isEditing
        ? `${endponits.UPDATE_MANUFACTURER(editableManufacturer!._id!)}`
        : `${endponits.ADD_MANUFACTURER}`;
      const apiCall = isEditing
        ? updateManufacturerRequest
        : addManufacturerRequest;
      const { response, error } = await apiCall(url, manufacturer);

      if (!error && response) {
        setManufacturers((prevData) =>
          isEditing
            ? prevData.map((m) =>
                m._id === editableManufacturer!._id
                  ? { ...m, ...manufacturer }
                  : m
              )
            : [...prevData, response.data]
        );
        toast.success(
          `Manufacturer ${isEditing ? "updated" : "added"} successfully`
        );
        closeModal();
      } else {
        toast.error(`Error saving manufacturer: ${error.message}`);
        console.error(`Error saving manufacturer: ${error.message}`);
      }
    } catch (error) {
      toast.error("Error in save operation");
      console.error("Error in save operation", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const url = `${endponits.DELETE_MANUFACTURER(id)}`;
      const { response, error } = await deleteManufacturerRequest(url);
      if (!error && response) {
        setManufacturers(
          manufacturers.filter((manufacturer) => manufacturer._id !== id)
        );
        toast.success("Manufacturer deleted successfully");
      } else {
        toast.error(`Error deleting manufacturer: ${error.message}`);
        console.error(`Error deleting manufacturer: ${error.message}`);
      }
    } catch (error) {
      toast.error("Error in delete operation");
      console.error("Error in delete operation", error);
    }
  };

  const handleEditChange = (field: keyof Manufacturer, value: string) => {
    if (editableManufacturer) {
      setEditableManufacturer({ ...editableManufacturer, [field]: value });
    }
  };

  return (
    <div ref={ref}>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal open={true} onClose={onClose} className="">
        <div className="p-5 mt-3">
          <div className="mb-5 flex p-4 rounded-xl bg-CreamBg relative overflow-hidden h-24">
            <div
              className="absolute top-0 right-12 h-24 w-[200px] bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${bgImage})` }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-textColor">
                Manage Manufacturer
              </h3>
              <p className="text-dropdownText font-semibold text-sm mt-2">
                Have an insight on the profit or loss incurred due to the change
                in exchange rates
              </p>
            </div>
            <div
              className="ms-auto text-3xl cursor-pointer relative z-10"
              onClick={onClose}
            >
              &times;
            </div>
          </div>

          <div className="flex justify-end me-2 my-4">
            <Button
              variant="primary"
              size="sm"
              onClick={() => openModal()}
              className="text-sm"
            >
              <PlusCircle color="white" />
              New Manufacturer
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {manufacturers.map((item) => (
              <div key={item._id} className="flex p-2">
                <div className="border border-slate-200 text-textColor rounded-xl w-96 h-auto p-3 flex justify-between">
                  <div>
                    <h3 className="text-sm font-bold">{item.name}</h3>
                    <p className="text-xs text-textColor">{item.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p
                      className="cursor-pointer"
                      onClick={() => openModal(item)}
                    >
                      <PencilEdit color="currentColor" />
                    </p>
                    <p
                      className="cursor-pointer"
                      onClick={() => handleDelete(item._id!)}
                    >
                      <TrashCan color="currentColor" />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end my-3">
            <Button variant="primary" size="sm" className="text-sm">
              Save
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={isModalOpen} onClose={closeModal} style={{ width: "35%" }}>
        <div className="p-5 mt-3">
          <div className="flex p-4 rounded-xl relative overflow-hidden">
            <h3 className="text-xl font-bold text-textColor">
              {editableManufacturer?._id
                ? "Edit Manufacturer"
                : "Add Manufacturer"}
            </h3>
            <div
              className="ms-auto text-3xl cursor-pointer relative z-10"
              onClick={closeModal}
            >
              &times;
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="mb-4">
              <label className="block text-sm mb-1 text-labelColor">Name</label>
              <input
                placeholder="Sony Corporation"
                type="text"
                value={editableManufacturer?.name || ""}
                onChange={(e) => handleEditChange("name", e.target.value)}
                className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 text-zinc-700 h-10"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1 text-labelColor">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Description"
                value={editableManufacturer?.description || ""}
                onChange={(e) =>
                  handleEditChange("description", e.target.value)
                }
                className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2"
              />
            </div>

            <div className="flex justify-end gap-2 mb-3">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                variant="primary"
                size="sm"
              >
                Save
              </Button>
              <Button onClick={closeModal} variant="tertiary" size="sm">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
});

export default NewManufacture;
