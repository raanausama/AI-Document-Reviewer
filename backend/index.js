const dotenv = require("dotenv");
dotenv.config();

const authorize = require("./middleware/authorization");

const express = require("express");

const app = express();
const cors = require("cors");

app.use(express.static("public"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const loginRouter = require("./routes/client/loginRoutes");
const signupRouter = require("./routes/client/signupRoutes");

app.use("/login", loginRouter);
app.use("/signup", signupRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
