const { User } = require("../models");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getNonAdminUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        isAdmin: false,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};
exports.getUserInfo = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const userInfo = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  };

  res.json(userInfo);
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
