const { Router } = require("express");
const { payment, transaction, getTransactionByEmail } = require("../../services/payment/paymentService");
const router = Router();

router.route("/").get(payment);
router.route("/transaction").post(transaction);
router.route("/getTransactionByEmail").get(getTransactionByEmail);
// router.route("/getCharge/:chargeId").get(getChargeDetails);

// router.route("/adminVersionValidation").get(adminVersionValidation);

module.exports = router;
