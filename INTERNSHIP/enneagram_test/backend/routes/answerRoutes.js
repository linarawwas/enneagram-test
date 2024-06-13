const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answerController");

// Create a new answer
router.post("/", answerController.createAnswer);

router.post("/many", answerController.createManyAnswers);

router.get("/user/:userId", answerController.getAnswersByUserId);

// Get all categories
router.get("/", answerController.getAllAnswers);

// Get a single answer by ID
router.get("/:id", answerController.getAnswerById);

// Update a answer by ID
router.put("/:id", answerController.updateAnswer);

// Delete a answer by ID
router.delete("/all", answerController.deleteAllAnswers);

router.delete("/:id", answerController.deleteAnswer);

module.exports = router;
