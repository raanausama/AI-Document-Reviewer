const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const collection = require("../../models/mongo");

exports.register = async (req, res) => {
  const { values } = req.body;
  console.log(values);
  const emailLowerCase = values?.email?.toLowerCase();


  try {
    // Check if user with the provided values.email already exists
    const existingUser = await collection.findOne({ email: emailLowerCase });
    if (existingUser) {
      // User already exists
      // res.status(400).json({ status: "exist", message: "User already exists" });
      res.json({ status: "exist", message: "User already exists" });
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      const hashedPassword = await bcrypt.hash(values?.new_password, salt);
      console.log(hashedPassword);
      // Insert new user into the database
      await collection.insertMany({
        email: emailLowerCase,
        password: hashedPassword,
      });

      res.json({ status: "ok", message: "User created successfully" });
    }
  } catch (error) {
    // Error handling
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
