const mongoose = require("mongoose");
// console.log(process.env.MONGODB);
// import bcrypt from 'bcrypt'
const bcrypt = require('bcrypt');

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.error("Connection failed:", err.message);
  });

const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


const collection = mongoose.model("collection", newSchema);

module.exports = collection;
