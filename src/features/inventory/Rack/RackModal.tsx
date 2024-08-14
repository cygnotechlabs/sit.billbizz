import { forwardRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import PencilEdit from "../../../assets/icons/PencilEdit";
import PlusCircle from "../../../assets/icons/PlusCircle";
import TrashCan from "../../../assets/icons/TrashCan";
import bgImage from "../../../assets/Images/6.png";
import Button from "../../../Components/Button";
import Modal from "../../../Components/model/Modal";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";

type Rack = {
  _id?: string;
  rackName: string;
  description: string;
  organizationId?: string;
  rackStatus?: string;
  createdDate?: string;
};

type Props = {
  onClose: () => void;
};

const RackModal = forwardRef<HTMLDivElement, Props>(({ onClose }, ref) => {
  const { request: fetchAllRacks } = useApi("put", 5003);
  const { request: deleteRackRequest } = useApi("delete", 5003);
  const { request: updateRackRequest } = useApi("put", 5003);
  const { request: addRackRequest } = useApi("post", 5003);

  const [racks, setRacks] = useState<Rack[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editableRack, setEditableRack] = useState<Rack | null>(null);
  const closeModal = () => {
    setModalOpen(false);
    setEditableRack(null);
  };
  useEffect(() => {
    const loadRacks = async () => {
      try {
        const url = `${endponits.GET_ALL_RACK}`;
        const organizationId = { organizationId: "INDORG0001" };
        const { response, error } = await fetchAllRacks(url, organizationId);
        if (!error && response) {
          setRacks(response.data);
        } else {
          toast.error("Failed to fetch racks data.");
        }
      } catch (error) {
        toast.error("Error fetching racks data.");
        console.error("Error fetching racks data", error);
      }
    };

    loadRacks();
  }, [closeModal]);

  const openModal = (rack?: Rack) => {
    if (rack) {
      setEditableRack(rack);
    } else {
      setEditableRack({ rackName: "", description: "" });
    }
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const isEditing = Boolean(editableRack?._id);
      const rack: Partial<Rack> = {
        organizationId: "INDORG0001",
        rackName: editableRack?.rackName || "",
        description: editableRack?.description || "",
        rackStatus: editableRack?.rackStatus || "Active",
        ...(isEditing && { _id: editableRack?._id }),
      };

      const url = isEditing
        ? `${endponits.UPDATE_RACK}`
        : `${endponits.ADD_RACK}`;
      const apiCall = isEditing ? updateRackRequest : addRackRequest;
      const { response, error } = await apiCall(url, rack);

      if (!error && response) {
        setRacks((prevData) =>
          isEditing
            ? prevData.map((r) =>
                r._id === editableRack!._id ? { ...r, ...rack } : r
              )
            : [...prevData, response.data]
        );

        toast.success(`Rack ${isEditing ? "updated" : "added"} successfully!`);
        closeModal();
      } else {
        toast.error(`Error saving rack: ${error?.message}`);
        console.error(`Error saving rack: ${error?.message}`);
      }
    } catch (error) {
      toast.error("Error in save operation.");
      console.error("Error in save operation", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const url = `${endponits.DELETE_RACK(id)}`;
      const { response, error } = await deleteRackRequest(url);
      if (!error && response) {
        setRacks(racks.filter((rack) => rack._id !== id));
        toast.success("Rack deleted successfully!");
      } else {
        toast.error(`Error deleting rack: ${error?.message}`);
        console.error(`Error deleting rack: ${error?.message}`);
      }
    } catch (error) {
      toast.error("Error in delete operation.");
      console.error("Error in delete operation", error);
    }
  };

  const handleEditChange = (field: keyof Rack, value: string) => {
    if (editableRack) {
      setEditableRack({ ...editableRack, [field]: value });
    }
  };

  return (
    <div ref={ref}>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal open={true} onClose={onClose}>
        <div className="p-5 mt-3">
          <div className="mb-5 flex p-4 rounded-xl bg-CreamBg relative overflow-hidden h-24">
            <div
              className="absolute top-0 right-12 h-24 w-[200px] bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${bgImage})` }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-textColor">Manage Rack</h3>
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
              Add Rack
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {racks.map((item) => (
              <div key={item._id} className="flex p-2">
                <div className="border border-slate-200 text-textColor rounded-xl w-96 h-auto p-3 flex justify-between">
                  <div>
                    <h3 className="text-sm font-bold">{item.rackName}</h3>
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
              {editableRack?._id ? "Edit Rack" : "Add Rack"}
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
            <div className="">
              <div className="mb-4">
                <label className="block text-sm mb-1 text-labelColor">
                  Name
                </label>
                <input
                  placeholder="Rack A1"
                  type="text"
                  value={editableRack?.rackName || ""}
                  onChange={(e) => handleEditChange("rackName", e.target.value)}
                  className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 text-zinc-700 h-10 "
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-1 text-labelColor">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Description"
                  value={editableRack?.description || ""}
                  onChange={(e) =>
                    handleEditChange("description", e.target.value)
                  }
                  className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 "
                />
              </div>

              <div className="flex justify-end gap-2 mb-3">
                <Button type="submit" variant="primary" size="sm">
                  Save
                </Button>
                <Button onClick={closeModal} variant="tertiary" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
});

export default RackModal;
