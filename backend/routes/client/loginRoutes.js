const { Router } = require("express");
const { login, checkEmailGoogleSingin } = require("../../services/client/loginService");
const router = Router();

router.route("/").post(login);
router.route("/checkemailgooglesignin").get(checkEmailGoogleSingin);

// router.route("/adminVersionValidation").get(adminVersionValidation);

module.exports = router;
