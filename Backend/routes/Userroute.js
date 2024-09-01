// Userroute.js
const express = require('express');
const router = express.Router();
const { registerUser } = require("../Controller/userController.js"); // Destructured import

router.route("/register").post(registerUser);

module.exports = router;