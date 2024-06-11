const { Category } = require("../models"); // Assuming your Category model file is in the models directory

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await Category.create({ name });
    if (!category) {
      return res.status(500).json({ error: "Failed to create category" });
    }

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Import the UUID library
const { v4: uuidv4 } = require('uuid');

// Create many categories
exports.addManyCategories = async (req, res) => {
  try {
    const { categories } = req.body;

    // Assign UUIDs to each category
    const categoriesWithIds = categories.map(category => ({
      id: uuidv4(), // Generate UUID
      name: category.name // Keep the category name
    }));

    // Bulk create the categories with UUIDs
    const createdCategories = await Category.bulkCreate(categoriesWithIds);

    res.status(201).json(createdCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCategory = await Category.update(
      { name },
      { where: { id: req.params.id } }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
