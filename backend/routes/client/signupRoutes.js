const { Router } = require("express");
const { register } = require("../../services/client/signupService");
const router = Router();

router.route("/").post(register);

module.exports = router;
