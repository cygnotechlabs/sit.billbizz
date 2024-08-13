const Organization = require('../database/model/organization')
const Categories = require("../database/model/categories");

// Add a new category
exports.addCategory = async (req, res) => {
    console.log("add category:", req.body);
    const {
        organizationId,
        name,
        description,
        createdDate
    } 
    = req.body;

    try {
        
        // Check if an Organization already exists
    const existingOrganization = await Organization.findOne({ organizationId });
 
    if (!existingOrganization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }
 
        // Check if a category with the same name already exists within the same organization
        const existingCategoryByName = await Categories.findOne({ name, organizationId });

        if (existingCategoryByName) {
            console.log("Category with name already exists:", existingCategoryByName);
            return res.status(409).json({
                message: "A category with this name already exists in the given organization.",
            });
        }

        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        // Create a new category
        const newCategory = new Categories({
            organizationId,
            name,
            description,
            createdDate:formattedDate
            
        });

        // Save the category to the database
        const savedCategory = await newCategory.save();

        // Send response
        res.status(201).json(savedCategory);
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(400).json({ error: error.message });
    }
};

// Get all categories by organizationId
exports.getAllCategories = async (req, res) => {
    const organizationId = req.params.id;
    try {
        // Check if an Organization already exists
        const existingOrganization = await Organization.findOne({ organizationId });
    
        if (!existingOrganization) {
        return res.status(404).json({
            message: "No Organization Found.",
        });
        }
        const allCategories = await Categories.find( organizationId );
        res.status(200).json(allCategories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Get a single category by ID
exports.getACategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        // Check if an Organization already exists
        const existingOrganization = await Organization.findOne({ organizationId });
    
        if (!existingOrganization) {
        return res.status(404).json({
            message: "No Organization Found.",
        });
        }
        const category = await Categories.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Update a category by ID, ensuring the new name does not conflict
exports.updateCategory = async (req, res) => {
    console.log("Received request to update category:", req.body);
    
    try {
        const categoryId = req.params.id;
        const {
            organizationId,
            name,
            description,
            updatedDate,
        } = req.body;

        // Find the current category by its ID
        const currentCategory = await Categories.findById(categoryId);

        if (!currentCategory) {
            console.log("Category not found with ID:", categoryId);
            return res.status(404).json({ message: "Category not found" });
        }

        // Check if the new name already exists in the same organizationId, excluding the current category being updated
        if (currentCategory.name !== name) {
            const existingCategoryByName = await Categories.findOne({
                name,
                organizationId,
                _id: { $ne: categoryId } // Exclude the current category from the check
            });

            if (existingCategoryByName) {
                console.log("Category with name already exists:", existingCategoryByName);
                return res.status(409).json({
                    message: "A category with this name already exists in the given organization.",
                });
            }
        }

        const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
      const year = currentDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

        // Update the category
        const updatedCategory = await Categories.findByIdAndUpdate(
            categoryId,
            {
                organizationId,
                name,
                description,
                updatedDate:formattedDate
            },
            { new: true, runValidators: true }
        );
        // Check if an Organization already exists
    const existingOrganization = await Organization.findOne({ organizationId });
 
    if (!existingOrganization) {
      return res.status(404).json({
        message: "No Organization Found.",
      });
    }
 
        if (!updatedCategory) {
            console.log("Category not found with ID:", categoryId);
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
        console.log("Category updated successfully:", updatedCategory);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        // Check if an Organization already exists
        const existingOrganization = await Organization.findOne({ organizationId });
    
        if (!existingOrganization) {
        return res.status(404).json({
            message: "No Organization Found.",
        });
        }
        const deletedCategory = await Categories.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully', deletedCategory });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
