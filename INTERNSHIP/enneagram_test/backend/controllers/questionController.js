const { Question } = require('../models');

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update question
exports.updateQuestion = async (req, res) => {
  try {
    const [updated] = await Question.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedQuestion = await Question.findByPk(req.params.id);
      res.status(200).json(updatedQuestion);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete question
exports.deleteQuestion = async (req, res) => {
  try {
    const deleted = await Question.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const { v4: uuidv4 } = require('uuid');

// Add many questions
exports.addManyQuestions = async (req, res) => {
  try {
    const { questions } = req.body;

    // Create an array to store the questions
    const createdQuestions = [];

    // Iterate over the questions array and create each question
    for (const questionText of questions) {
      const question = await Question.create({
        id: uuidv4(), // Generate UUID for question ID
        text: questionText,
        categoryId: '2e87be0a-e56e-4be8-974b-f3e474d4bfe5', // Category ID
      });
      createdQuestions.push(question);
    }

    res.status(201).json(createdQuestions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

