import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../../Components/Button";
import Modal from "../../../Components/model/Modal";
import bgImage from "../../../assets/Images/Frame 6.png";
import PencilEdit from "../../../assets/icons/PencilEdit";
import PlusCircle from "../../../assets/icons/PlusCircle";
import TrashCan from "../../../assets/icons/TrashCan";
import SearchBar from "../../../Components/SearchBar";
import CehvronDown from "../../../assets/icons/CehvronDown";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";

type Category = {
  _id?: string;
  name: string;
  description: string;
  organizationId?: string;
  createdDate?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  page?: string;
};

function Category({ isOpen, onClose, page }: Props) {
  const { request: fetchAllCategories } = useApi("put", 5003);
  const { request: getCategoryRequest } = useApi("get", 5003);
  const { request: deleteCategoryRequest } = useApi("delete", 5003);
  const { request: updateCategoryRequest } = useApi("put", 5003);
  const { request: addCategoryRequest } = useApi("post", 5003);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddCategoryModal, setIsAddCategoryModal] = useState(false);
  const [isEditCategoryModal, setIsEditCategoryModal] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [editableCategory, setEditableCategory] = useState<Category | null>(
    null
  );
  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    description: "",
    organizationId: "INDORG0001",
    createdDate: new Date().toISOString(),
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const url = `${endponits.GET_ALL_CATEGORIES}`;
        const organizationId = { organizationId: "INDORG0001" };
        const { response, error } = await fetchAllCategories(
          url,
          organizationId
        );
        if (error) {
          toast.error("Error in fetching categories data.");
          console.error("Error in fetching categories data", error);
        } else if (response) {
          setCategories(response.data);
        }
      } catch (error) {
        toast.error("Error in fetching categories data.");
        console.error("Error in fetching categories data", error);
      }
    };

    loadCategories();
  }, []);

  const getCategory = async (id: string) => {
    try {
      const url = `${endponits.GET_CATEGORY(id)}`;
      const { response, error } = await getCategoryRequest(url);
      if (error) {
        toast.error(`Error fetching category: ${error.message}`);
        console.error(`Error fetching category: ${error.message}`);
      } else if (response) {
        setEditableCategory(response.data);
        setIsEditCategoryModal(true);
      }
    } catch (error) {
      toast.error("Error in fetching category data.");
      console.error("Error in fetching category data", error);
    }
  };

  const openAddModal = () => {
    setEditableCategory(null);
    setNewCategory({
      name: "",
      description: "",
      organizationId: "INDORG0001",
      createdDate: new Date().toISOString(),
    });
    setIsAddCategoryModal(true);
  };

  const openEditModal = (category: Category) => {
    getCategory(category._id!);
  };

  const closeAddModal = () => {
    setIsAddCategoryModal(false);
  };

  const closeEditModal = () => {
    setIsEditCategoryModal(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const url = `${endponits.DELETE_CATEGORY(id)}`;
      const { response, error } = await deleteCategoryRequest(url);
      if (error) {
        toast.error(`Error deleting category: ${error.message}`);
        console.error(`Error deleting category: ${error.message}`);
      } else if (response) {
        setCategories(categories.filter((category) => category._id !== id));
        toast.success(`Category with id ${id} deleted successfully.`);
      }
    } catch (error) {
      toast.error("Error in delete operation.");
      console.error("Error in delete operation", error);
    }
  };

  const handleSave = async () => {
    try {
      const isEditing = Boolean(editableCategory);
      const category: Partial<Category> = isEditing
        ? {
            ...editableCategory,
            organizationId: "INDORG0001",
            createdDate: editableCategory?.createdDate,
          }
        : newCategory;

      const url = isEditing
        ? `${endponits.UPDATE_CATEGORY(editableCategory?._id ?? "")}`
        : `${endponits.ADD_CATEGORY}`;
      const apiCall = isEditing ? updateCategoryRequest : addCategoryRequest;
      const { response, error } = await apiCall(url, category);

      if (error) {
        toast.error(`Error saving category: ${error.message}`);
        console.error(`Error saving category: ${error.message}`);
      } else if (response) {
        setCategories((prevData) =>
          isEditing
            ? prevData.map((c) =>
                c._id === editableCategory!._id ? { ...c, ...category } : c
              )
            : [...prevData, response.data]
        );
        toast.success(
          `Category ${isEditing ? "updated" : "added"} successfully.`
        );
        closeEditModal();
        closeAddModal();
      }
    } catch (error) {
      toast.error("Error in save operation.");
      console.error("Error in save operation", error);
    }
  };

  const handleEditChange = (field: keyof Category, value: string) => {
    if (editableCategory) {
      setEditableCategory({ ...editableCategory, [field]: value });
    } else {
      setNewCategory({ ...newCategory, [field]: value });
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} className="w-[65%]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-5 mt-3">
        <div className="mb-5 flex p-4 rounded-xl bg-CreamBg relative overflow-hidden h-24">
          <div
            className="absolute top-0 right-12 h-24 w-[200px] bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-textColor">
              Manage Category
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

        <div className="flex">
          {page === "expense" && (
            <div className="grid grid-flow-col items-center gap-3 ">
              <div className="w-96">
                <SearchBar
                  placeholder="Search Name or Mobile"
                  searchValue={searchValue}
                  onSearchChange={setSearchValue}
                />
              </div>
              <div>
                <div className="relative w-full items-center justify-center flex">
                  <select className="block appearance-none w-full h-10  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" className="text-gray">
                      All Category
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex ml-auto me-2 my-4">
            <Button variant="primary" size="xl" onClick={openAddModal}>
              <PlusCircle color="white" />
              <p className="text-sm">Add Category</p>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {categories.map((item) => (
            <div key={item._id} className="flex p-2">
              <div className="border border-slate-200 text-textColor rounded-xl w-96 h-auto p-3 flex justify-between">
                <div>
                  <h3 className="text-sm font-bold">{item.name}</h3>
                  <p className="text-xs text-textColor">{item.description}</p>
                </div>
                <div className="flex space-x-2">
                  <p
                    className="cursor-pointer"
                    onClick={() => openEditModal(item)}
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

        {page !== "expense" && (
          <div className="flex justify-end gap-2 my-3">
            <Button className="flex justify-center" variant="primary" size="sm">
              Save
            </Button>
          </div>
        )}

        {/* Add/Edit Category Modal */}
        <Modal
          open={isAddCategoryModal || isEditCategoryModal}
          onClose={closeAddModal}
          style={{ width: "40.5%" }}
        >
          <div className="p-6 space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-textColor">
                {editableCategory ? "Edit Category" : "Add Category"}
              </h3>
              <div
                className="ms-auto text-3xl cursor-pointer relative z-10"
                onClick={closeAddModal}
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
                <label className="block text-sm mb-1 text-labelColor">
                  Name
                </label>
                <input
                  type="text"
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  value={editableCategory?.name || newCategory.name || ""}
                  placeholder="Electronics"
                  className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 text-zinc-700 h-10"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1 text-labelColor">
                  Description
                </label>
                <textarea
                  value={
                    editableCategory?.description ||
                    newCategory.description ||
                    ""
                  }
                  onChange={(e) =>
                    handleEditChange("description", e.target.value)
                  }
                  placeholder="Notes"
                  className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2 mb-3">
                <Button
                  className="flex justify-center"
                  onClick={closeAddModal}
                  variant="tertiary"
                  size="lg"
                >
                  Cancel
                </Button>
                <Button
                  className="flex justify-center"
                  variant="primary"
                  size="lg"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </Modal>
  );
}

export default Category;
