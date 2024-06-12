const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();
const userController = require("../controllers/userController");
// Route to get user info from the token
router.get("/me", authMiddleware.authenticateToken, userController.getUserInfo);
router.get("/", userController.getAllUsers);
router.get("/non-admin", userController.getNonAdminUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
