const { Router } = require("express");
const { login, checkEmailGoogleSingin,downloadPdf } = require("../../services/client/loginService");
const router = Router();

router.route("/").post(login);
router.route("/checkemailgooglesignin").get(checkEmailGoogleSingin);
router.route("/downloadPdf").post(downloadPdf);

// router.route("/adminVersionValidation").get(adminVersionValidation);

module.exports = router;
