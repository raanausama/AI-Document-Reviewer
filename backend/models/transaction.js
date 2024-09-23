const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.error("Connection failed:", err.message);
  });
  
const transactionSchema = new mongoose.Schema({
    paymentIntentId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    download: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Transaction = mongoose.model("Transaction", transactionSchema);
  
  module.exports = Transaction;
  