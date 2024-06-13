// controllers/answerController.js
const { Op } = require('sequelize');
const {Answer} = require('../models');
const {Question} = require('../models');
const {Category} = require('../models');

exports.getAnswersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const answers = await Answer.findAll({
      where: { userId },
      include: [
        {
          model: Question,
          as: 'question',
          include: [
            {
              model: Category,
              as: 'category',
            },
          ],
        },
      ],
    });

    const groupedAnswers = {};

    answers.forEach((answer) => {
      const category = answer.question.category.name;
      const questionText = answer.question.text;
      const grade = answer.grade;

      if (!groupedAnswers[category]) {
        groupedAnswers[category] = [];
      }

      groupedAnswers[category].push({ questionText, grade });
    });

    res.status(200).json(groupedAnswers);
  } catch (error) {
    console.error("Error fetching answers by user ID:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
};

// Create a new answer
exports.createAnswer = async (req, res) => {
  try {
    const answer = await Answer.create(req.body);
    res.status(201).json(answer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all answers
exports.getAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.findAll();
    res.status(200).json(answers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get answer by ID
exports.getAnswerById = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (answer) {
      res.status(200).json(answer);
    } else {
      res.status(404).json({ error: "Answer not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update answer
exports.updateAnswer = async (req, res) => {
  try {
    const [updated] = await Answer.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedAnswer = await Answer.findByPk(req.params.id);
      res.status(200).json(updatedAnswer);
    } else {
      res.status(404).json({ error: "Answer not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete answer
exports.deleteAnswer = async (req, res) => {
  try {
    const deleted = await Answer.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Answer not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createManyAnswers = async (req, res) => {
  const { userId, answers } = req.body; // Extract userId and answers from request body

  try {
    // Iterate through each answer in the answers array
    const createdAnswers = await Promise.all(
      answers.map(async (answer) => {
        // Create a new answer record in the database
        const createdAnswer = await Answer.create({
          userId: userId, // Assign userId to the answer
          questionId: answer.questionId, // Assign questionId from answer object
          grade: answer.grade, // Assign grade from answer object
          createdAt: new Date(), // Assign current timestamp to createdAt
        });
        return createdAnswer; // Return the created answer
      })
    );

    // Respond with the created answers
    return res.status(201).json({
      message: "Answers created successfully",
      answers: createdAnswers,
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating answers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteAllAnswers = async (req, res) => {
  try {
    await Answer.destroy({
      where: {},
      truncate: true,
    });
    res
      .status(200)
      .json({ message: "All answers have been deleted successfully" });
  } catch (error) {
    console.error("Error deleting answers:", error);
    res
      .status(500)
      .json({ message: "Failed to delete answers", error: error.message });
  }
};
