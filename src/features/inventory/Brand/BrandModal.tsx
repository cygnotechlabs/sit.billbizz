import { forwardRef, useState, useEffect } from "react";
import bgImage from "../../../assets/Images/Frame 6.png";
import NewBrandModal from "./NewBrandModal";
import Button from "../../../Components/Button";
import PlusCircle from "../../../assets/icons/PlusCircle";
import OutlineTrashIcon from "../../../assets/icons/OutlineTrashIcon";
import PencilIcon from "../../../assets/icons/PencilIcon";
import Modal from "../../../Components/model/Modal";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";

type BrandCardProps = {
  name: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
};

const BrandCard = ({ name, description, onEdit, onDelete }: BrandCardProps) => (
  <div className="p-3 border w-[272px] h-[80px] border-tableBorder rounded-lg flex justify-between">
    <div>
      <h6 className="text-sm text-textColor font-semibold">{name}</h6>
      <p className="text-xs text-loremcolor">{description}</p>
    </div>
    <div className="flex space-x-2">
      <button onClick={onEdit}>
        <PencilIcon color="#4B5C79" />
      </button>
      <button onClick={onDelete}>
        <OutlineTrashIcon color="#4B5C79" />
      </button>
    </div>
  </div>
);

type BrandModalProps = {
  onClose: () => void;
};

type BrandData = {
  _id: string;
  name: string;
  description: string;
  organizationId: string;
  createdDate: string;
  updatedDate: string;
  __v: number;
};

const BrandModal = forwardRef<HTMLDivElement, BrandModalProps>(
  ({ onClose }, ref) => {
    const { request: fetchAllBrands } = useApi("put", 5003);
    const { request: deleteBrandRequest } = useApi("delete", 5003);
    const { request: updateBrandRequest } = useApi("put", 5003);
    const { request: addBrandRequest } = useApi("post", 5003);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<BrandData | null>(null);
    const [brandData, setBrandData] = useState<BrandData[]>([]);

    useEffect(() => {
      const loadBrands = async () => {
        try {
          const url = `${endponits.GET_ALL_BRAND}`;
          const body = { organizationId: "INDORG0001" };
          const { response, error } = await fetchAllBrands(url, body);
          if (!error && response) {
            setBrandData(response.data);
          }
        } catch (error) {
          console.error("Error in fetching brand data", error);
        }
      };

      loadBrands();
    }, []);

    const openEditModal = (brand: BrandData) => {
      setSelectedBrand(brand);
      setEditModalOpen(true);
    };

    const openAddModal = () => {
      setSelectedBrand(null);
      setEditModalOpen(true);
    };

    const closeEditModal = () => {
      setEditModalOpen(false);
    };

    const handleDelete = async (id: string) => {
      try {
        const url = `${endponits.DELETE_BRAND(id)}`;
        const { response, error } = await deleteBrandRequest(url);
        if (!error && response) {
          setBrandData(brandData.filter((brand) => brand._id !== id));
          console.log(`Brand with id ${id} deleted successfully`);
        } else {
          console.error(`Error deleting brand: ${error.message}`);
        }
      } catch (error) {
        console.error("Error in delete operation", error);
      }
    };

    const handleSave = async (data: { name: string; description: string }) => {
      try {
        const isEditing = Boolean(selectedBrand);
        const brand: Partial<BrandData> = {
          organizationId: "INDORG0001",
          name: data.name,
          description: data.description,
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
          closeEditModal();
          onClose();
        } else {
          console.error(`Error saving brand: ${error.message}`);
        }
      } catch (error) {
        console.error("Error in save operation", error);
      }
    };

    const mapBrandDataToTitleCount = (
      brand: BrandData
    ): { title: string; count: string } => ({
      title: brand.name,
      count: brand.description,
    });

    return (
      <div ref={ref}>
        <Modal open={true} onClose={onClose} className="w-[66%]">
          <div className="p-5 mt-3">
            <div className="mb-5 flex p-4 rounded-xl bg-CreamBg relative overflow-hidden">
              <div
                className="absolute top-0 right-12 h-full w-[212px] bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${bgImage})` }}
              ></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-textColor">
                  Manage Brand
                </h3>
                <p className="text-dropdownText font-semibold text-sm mt-2">
                  Have an insight on the profit or loss incurred due to the
                  change in <br /> exchange rates
                </p>
              </div>
              <div
                className="ms-auto text-3xl cursor-pointer relative z-10"
                onClick={onClose}
              >
                &times;
              </div>
            </div>
            <div className="flex justify-end pr-3">
              <Button
                onClick={openAddModal}
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
                  <BrandCard
                    name={brand.name}
                    description={brand.description}
                    onEdit={() => openEditModal(brand)}
                    onDelete={() => handleDelete(brand._id)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end pr-3">
              <Button variant="primary" size="sm" className="text-sm">
                Save
              </Button>
            </div>
          </div>
        </Modal>
        {isEditModalOpen && (
          <NewBrandModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            initialData={
              selectedBrand ? mapBrandDataToTitleCount(selectedBrand) : null
            }
            onSave={handleSave}
          />
        )}
      </div>
    );
  }
);

export default BrandModal;
