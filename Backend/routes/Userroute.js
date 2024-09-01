// Userroute.js
const express = require('express');
const router = express.Router();
const {registerUser,loginUser} = require("../Controller/userController.js"); // Destructured import

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;