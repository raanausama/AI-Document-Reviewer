const { Router } = require("express");
const { payment,getChargeDetails } = require("../../services/payment/paymentService");
const router = Router();

router.route("/").post(payment);
router.route("/getCharge/:chargeId").get(getChargeDetails);

// router.route("/adminVersionValidation").get(adminVersionValidation);

module.exports = router;
