const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

router
    .route("/signup")
    .get(userController.renderSignUpPage)
    .post(wrapAsync(userController.signup) );

router
    .route("/login")
    .get(userController.renderLoginPage)
    .post(saveRedirectUrl , passport.authenticate("local", { failureRedirect: '/', failureFlash: true }), userController.login);

router.get("/logout", userController.logout);

module.exports = router;