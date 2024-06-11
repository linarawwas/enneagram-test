const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.post("/", questionController.createQuestion);
router.get("/", questionController.getAllQuestions);
router.get("/:id", questionController.getQuestionById);
router.put("/:id", questionController.updateQuestion);
router.delete("/:id", questionController.deleteQuestion);
router.post('/add-many', questionController.addManyQuestions);

module.exports = router;
