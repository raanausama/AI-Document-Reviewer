const { Router } = require("express");
const { payment, transaction, getTransactionByEmail, deleteByEmail, getPaymentIntent, updateTransactions } = require("../../services/payment/paymentService");
const router = Router();

router.route("/").get(payment);
router.route("/transaction").post(transaction);
router.route("/deleteByEmail").get(deleteByEmail);
router.route("/getTransactionByEmail").get(getTransactionByEmail);
router.route("/getPaymentIntent").get(getPaymentIntent);
router.route("/updateTransactions").get(updateTransactions);
// router.route("/getCharge/:chargeId").get(getChargeDetails);

// router.route("/adminVersionValidation").get(adminVersionValidation);

module.exports = router;
