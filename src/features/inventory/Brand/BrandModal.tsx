import { forwardRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import bgImage from "../../../assets/Images/Frame 6.png";
import Button from "../../../Components/Button";
import PlusCircle from "../../../assets/icons/PlusCircle";
import OutlineTrashIcon from "../../../assets/icons/OutlineTrashIcon";
import PencilIcon from "../../../assets/icons/PencilIcon";
import Modal from "../../../Components/model/Modal";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";

type BrandData = {
  _id?: string;
  name: string;
  description: string;
  organizationId?: string;
  createdDate?: string;
  updatedDate?: string;
  __v?: number;
};

type Props = {
  onClose: () => void;
};

const BrandManager = forwardRef<HTMLDivElement, Props>(({ onClose }, ref) => {
  const { request: fetchAllBrands } = useApi("put", 5003);
  const { request: deleteBrandRequest } = useApi("delete", 5003);
  const { request: updateBrandRequest } = useApi("put", 5003);
  const { request: addBrandRequest } = useApi("post", 5003);

  const [brandData, setBrandData] = useState<BrandData[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editableBrand, setEditableBrand] = useState<BrandData | null>(null);

  const closeModal = () => {
    setModalOpen(false);
    setEditableBrand(null);
  };

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const url = `${endponits.GET_ALL_BRAND}`;
        const body = { organizationId: "INDORG0001" };
        const { response, error } = await fetchAllBrands(url, body);
        if (!error && response) {
          setBrandData(response.data);
        } else {
          toast.error("Failed to fetch brand data.");
        }
      } catch (error) {
        toast.error("Error in fetching brand data.");
        console.error("Error in fetching brand data", error);
      }
    };

    loadBrands();
  }, [brandData]);

  const openModal = (brand?: BrandData) => {
    if (brand) {
      setEditableBrand(brand);
    } else {
      setEditableBrand({ name: "", description: "" });
    }
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const isEditing = Boolean(editableBrand?._id);
      const brand: Partial<BrandData> = {
        organizationId: "INDORG0001",
        name: editableBrand?.name || "",
        description: editableBrand?.description || "",
        ...(isEditing && { _id: editableBrand?._id }),
      };

      const url = isEditing
        ? `${endponits.UPDATE_BRAND}`
        : `${endponits.ADD_BRAND}`;
      const apiCall = isEditing ? updateBrandRequest : addBrandRequest;
      const { response, error } = await apiCall(url, brand);

      if (!error && response) {
        setBrandData((prevData) =>
          isEditing
            ? prevData.map((b) =>
                b._id === editableBrand!._id ? { ...b, ...brand } : b
              )
            : [...prevData, response.data]
        );

        toast.success(`Brand ${isEditing ? "updated" : "added"} successfully!`);
        closeModal();
      } else {
        toast.error(`Error saving brand: ${error?.message}`);
        console.error(`Error saving brand: ${error?.message}`);
      }
    } catch (error) {
      toast.error("Error in save operation.");
      console.error("Error in save operation", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const url = `${endponits.DELETE_BRAND(id)}`;
      const { response, error } = await deleteBrandRequest(url);
      if (!error && response) {
        setBrandData(brandData.filter((brand) => brand._id !== id));
        toast.success("Brand deleted successfully!");
      } else {
        toast.error(`Error deleting brand: ${error?.message}`);
        console.error(`Error deleting brand: ${error?.message}`);
      }
    } catch (error) {
      toast.error("Error in delete operation.");
      console.error("Error in delete operation", error);
    }
  };

  const handleEditChange = (field: keyof BrandData, value: string) => {
    if (editableBrand) {
      setEditableBrand({ ...editableBrand, [field]: value });
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
              <h3 className="text-xl font-bold text-textColor">Manage Brand</h3>
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
              Add Brand
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {brandData.map((brand) => (
              <div key={brand._id} className="flex p-2">
                <div className="border border-slate-200 text-textColor rounded-xl w-96 h-auto p-3 flex justify-between">
                  <div>
                    <h3 className="text-sm font-bold">{brand.name}</h3>
                    <p className="text-xs text-textColor">
                      {brand.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <p
                      className="cursor-pointer"
                      onClick={() => openModal(brand)}
                    >
                      <PencilIcon color="currentColor" />
                    </p>
                    <p
                      className="cursor-pointer"
                      onClick={() => handleDelete(brand._id!)}
                    >
                      <OutlineTrashIcon color="currentColor" />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <Modal open={isModalOpen} onClose={closeModal} style={{ width: "35%" }}>
        <div className="p-5 mt-3">
          <div className="flex p-4 rounded-xl relative overflow-hidden">
            <h3 className="text-xl font-bold text-textColor">
              {editableBrand?._id ? "Edit Brand" : "Add Brand"}
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
                  placeholder="Brand Name"
                  type="text"
                  value={editableBrand?.name || ""}
                  onChange={(e) => handleEditChange("name", e.target.value)}
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
                  value={editableBrand?.description || ""}
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

export default BrandManager;
