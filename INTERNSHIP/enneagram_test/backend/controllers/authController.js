const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models"); // Assuming your user model is imported like this
// Get JWT secret key from environment variables
const secretKey = process.env.JWT_SECRET;
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.register = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    // Hash the user's password before saving it to the database
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await newUser.save();
    // Send the token and user data in the response
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
