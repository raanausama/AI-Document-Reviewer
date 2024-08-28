const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const collection = require("../../models/mongo");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const emailLowerCase = email?.toLowerCase();

  try {
    // Find user by email
    const user = await collection.findOne({ email: emailLowerCase });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    // const userpasswrod = user.password;
    console.log("password is", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        password: user?.password, // Assuming you have a unique identifier for users
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" } // Token expiration time
    );
    console.log("token is", token);

    // Update user with the token
    await collection.updateOne(
      { email: emailLowerCase }, // Filter to find the user
      { $set: { token: token } } // Update to add the token field
    );

    // Respond with user data and token
    res.json({
      status: "ok",
      user: {
        _id: user._id,
        email: user.email,
        token: token,
      },
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: "Internal server error" });
    console.log(e);
  }
};

exports.checkEmailGoogleSingin = async (req, res) => {
  const { email } = req.query;
  const emailLowerCase = email?.toLowerCase();
  console.log(email);

  try {
    const user = await collection.findOne({ email: emailLowerCase });
    console.log(user);
    if (user && user?.email) {
      const token = jwt.sign(
        {
          username: user.username,
          password: user.password,
        },
        process.env.JWT_SECRET_KEY
      );

      res.json({
        status: "ok",
        user: {
          _id: user._id,
          email: user.email,
          token: token,
        },
      });
    } else {
      res.json({ status: "error", user: false });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error,
    });
  }
};
