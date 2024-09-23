const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TESTKEY);
const Transaction = require("../../models/transaction");

exports.payment = async (req, res) => {
  const { amount, currency, customer } = req.query;
  const amountInCents = Math.round(amount * 100);

  console.log(`Amount in Cents: ${amountInCents}`, `Currency: ${currency}`);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency,
      description: `Payment of ${customer}`,
      payment_method_types: ["card"],
    });
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.transaction = async (req, res) => {
  const { transactions } = req.body;
  console.log("transactions: ", transactions);

  try {
    // Save all transactions (assuming you may want to save multiple)
    const savedTransactions = await Transaction.insertMany(transactions);

    res
      .status(201)
      .json({
        status: "success",
        message: "Transactions saved successfully",
        transactions: savedTransactions,
      });
  } catch (error) {
    console.error("Error saving transactions:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to save transactions" });
  }
};

exports.getTransactionByEmail = async (req, res) => {
  const { email } = req.query;
  console.log("Email: ", email);

  try {
    // Fetch transactions by email
    const transactions = await Transaction.find({ email });
    console.log("Transactions:", transactions);

    // Check if any transactions exist for the given email
    // if (transactions?.length === 0) {
    //   return res.status(404).json({ status: 'not_found', message: 'No transactions found for this email' });
    // }

    res.status(200).json({ status: "success", transactions });
  } catch (error) {
    console.log(error);
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch transactions" });
  }
};
exports.deleteByEmail = async (req, res) => {
  const { email } = req.query;
  console.log("Email: ", email);

  try {
    // Fetch transactions by email
    const result = await Transaction.deleteMany({ email });
    console.log("Transactions:", result);

    // Check if any transactions exist for the given email
    // if (transactions?.length === 0) {
    //   return res.status(404).json({ status: 'not_found', message: 'No transactions found for this email' });
    // }

    res
      .status(200)
      .json({
        status: "success",
        message: `${result.deletedCount} transactions deleted`,
      });
  } catch (error) {
    console.log(error);
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch transactions" });
  }
};

exports.getPaymentIntent = async (req, res) => {
  const { intent } = req.query;
  // console.log('Email: ', email);

  try {
    // Fetch transactions by email
    const paymentIntent = await stripe.paymentIntents.retrieve(intent);
    console.log("paymentIntent: ", paymentIntent);
    // Check the status of the payment intent
    if (paymentIntent.status === "succeeded") {
      res.json({
        success: true,
        message: "Payment completed successfully",
        paymentIntent,
      });
    } else {
      res.json({
        success: false,
        message: `Payment status is ${paymentIntent.status}`,
        paymentIntent,
      });
    }
  } catch (error) {
    console.log(error);
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch transactions" });
  }
};

exports.updateTransactions = async (req, res) => {
  const { email } = req.query;
  console.log("Email: ", email);

  try {
    // Update transactions by email to set download to true
    const result = await Transaction.updateMany(
      { email },
      { $set: { download: true } }
    );


    res
      .status(200)
      .json({
        status: "success",
        message: `${result.modifiedCount} transactions updated`,
      });
  } catch (error) {
    console.log(error);
    console.error("Error fetching transactions:", error);
  }
};

// exports.TapPayment = async (req, res) => {
//   const { amount, currency, customer } = req.body;
//   const secretKey = "sk_test_2lhY0pd856buzW7oUnCEgjOm";
//   console.log(customer);

//   axios
//     .post(
//       "https://api.tap.company/v2/charges",
//       {
//         amount,
//         currency,
//         customer_initiated: true,
//         threeDSecure: true,
//         save_card: false,
//         description: "Tap Payment",
//         metadata: {
//           udf1: "Metadata 1",
//         },
//         reference: {
//           transaction: "txn_01",
//           order: "ord_01",
//         },
//         receipt: {
//           email: true,
//           sms: true,
//         },
//         customer: {
//           first_name: customer?.first_name,
//           middle_name: customer?.middle_name,
//           last_name: customer?.last_name,
//           email: customer?.email,
//           phone: {
//             country_code: customer?.phone.country_code,
//             number: customer?.phone?.number,
//           },
//         },
//         merchant: {
//           id: '38840112'
//         },
//         source: { id: "src_all" },
//         post: {
//           url: `${process.env.VITE_APP_APP_CLIENT_URL}/pricing`,
//         },
//         redirect: {
//           url: `${process.env.VITE_APP_APP_CLIENT_URL}/pricing`,
//         },
//         // platform: {
//         //   id: 'commerce_platform_opiJ423***14JK8M474'
//         // }
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${secretKey}`,
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     .then((response) => {
//       res.json(response.data);
//       console.log('success', response.data)
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: error.message });
//     });
// };

// exports.getChargeDetails = async (req, res) => {
//   const { chargeId } = req.params;  // Retrieve charge ID from request parameters
//   const secretKey = 'sk_test_2lhY0pd856buzW7oUnCEgjOm';
//   // console.log(chargeId) // Your Tap Payments secret key

//   try {
//     const response = await axios.get(`https://api.tap.company/v2/charges/${chargeId}`, {
//       headers: {
//         'Authorization': `Bearer ${secretKey}`,
//         'Accept': 'application/json',
//       },
//     });

//     // Send the response data back to the client
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching charge details:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
