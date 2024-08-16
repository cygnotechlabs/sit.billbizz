import { useState, useEffect } from "react";
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
  _id: string;
  name: string;
  description: string;
  organizationId: string;
  createdDate: string;
  updatedDate: string;
  __v: number;
};

const BrandManager = () => {
  const { request: fetchAllBrands } = useApi("put", 5003);
  const { request: deleteBrandRequest } = useApi("delete", 5003);
  const { request: updateBrandRequest } = useApi("put", 5003);
  const { request: addBrandRequest } = useApi("post", 5003);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<BrandData | null>(null);
  const [brandData, setBrandData] = useState<BrandData[]>([]);
  const [name, setName] = useState("");
  const [count, setCount] = useState("");

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
      setSelectedBrand(brand);
      setName(brand.name);
      setCount(brand.description);
    } else {
      setSelectedBrand(null);
      setName("");
      setCount("");
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setName("");
    setCount("");
  };

  const handleDelete = async (id: string) => {
    try {
      const url = `${endponits.DELETE_BRAND(id)}`;
      const { response, error } = await deleteBrandRequest(url);
      if (!error && response) {
        setBrandData(brandData.filter((brand) => brand._id !== id));
        toast.success(`Brand with id ${id} deleted successfully.`);
      } else {
        toast.error(`Error deleting brand: ${error.message}`);
        console.error(`Error deleting brand: ${error.message}`);
      }
    } catch (error) {
      toast.error("Error in delete operation.");
      console.error("Error in delete operation", error);
    }
  };

  const handleSave = async () => {
    try {
      const isEditing = Boolean(selectedBrand);
      const brand: Partial<BrandData> = {
        organizationId: "INDORG0001",
        name: name,
        description: count,
        ...(isEditing && { _id: selectedBrand!._id }),
      };

      const url = isEditing
        ? `${endponits.UPDATE_BRAND(selectedBrand!._id)}`
        : `${endponits.ADD_BRAND}`;
      const apiCall = isEditing ? updateBrandRequest : addBrandRequest;
      const { response, error } = await apiCall(url, brand);

      if (!error && response) {
        setBrandData((prevData) =>
          isEditing
            ? prevData.map((b) =>
                b._id === selectedBrand!._id ? { ...b, ...brand } : b
              )
            : [...prevData, response.data]
        );
        toast.success(`Brand ${isEditing ? "updated" : "added"} successfully.`);
        closeModal();
      } else {
        toast.error(`Error saving brand: ${error.message}`);
        console.error(`Error saving brand: ${error.message}`);
      }
    } catch (error) {
      toast.error("Error in save operation.");
      console.error("Error in save operation", error);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal open={true} onClose={closeModal} className="w-[66%]">
        <div className="p-5 mt-3">
          <div className="mb-5 flex p-4 rounded-xl bg-CreamBg relative overflow-hidden">
            <div
              className="absolute top-0 right-12 h-full w-[212px] bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${bgImage})` }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-textColor">Manage Brand</h3>
              <p className="text-dropdownText font-semibold text-sm mt-2">
                Have an insight on the profit or loss incurred due to the change
                in <br /> exchange rates
              </p>
            </div>
            <div
              className="ms-auto text-3xl cursor-pointer relative z-10"
              onClick={closeModal}
            >
              &times;
            </div>
          </div>
          <div className="flex justify-end pr-3">
            <Button
              onClick={() => openModal()}
              variant="primary"
              className="text-sm"
              size="sm"
              style={{ height: "38px", padding: "14px" }}
            >
              <PlusCircle color="white" />
              New Brand
            </Button>
          </div>
          <br />

          <div className="grid grid-cols-3 gap-4">
            {brandData.map((brand) => (
              <div key={brand._id} className="flex justify-center mb-5">
                <div className="p-3 border w-[272px] h-[80px] border-tableBorder rounded-lg flex justify-between">
                  <div>
                    <h6 className="text-sm text-textColor font-semibold">
                      {brand.name}
                    </h6>
                    <p className="text-xs text-loremcolor">
                      {brand.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => openModal(brand)}>
                      <PencilIcon color="#4B5C79" />
                    </button>
                    <button onClick={() => handleDelete(brand._id)}>
                      <OutlineTrashIcon color="#4B5C79" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* New/Edit Brand Modal */}
      {isModalOpen && (
        <Modal
          style={{ width: "40.5%" }}
          open={isModalOpen}
          onClose={closeModal}
        >
          <div className="p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-textColor">
                {selectedBrand ? "Edit Brand" : "Add Brand"}
              </h3>
              <div
                className="ms-auto text-3xl font-normal cursor-pointer relative z-10 text-textColor"
                onClick={closeModal}
              >
                &times;
              </div>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Brand name"
                  className="border-inputBorder outline-none w-full text-sm border rounded py-2 px-3"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Count
                </label>
                <textarea
                  placeholder="Notes"
                  className="border-inputBorder outline-none w-full text-sm border rounded py-3 px-3 h-24"
                  value={count || ""}
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button onClick={closeModal} variant="fourthiary" size="lg">
                  Cancel
                </Button>
                <Button onClick={handleSave} variant="secondary" size="lg">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BrandManager;
