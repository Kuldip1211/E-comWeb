const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error.js');

app.use(express.json());

// Import all routes
const producturl = require("./routes/ProductRoutes.js");
const user = require("./routes/Userroute.js");

app.use("/api/v1", producturl);
app.use("/api/v1", user); // Consistent base path for all routes

// Use middleware
app.use(errorMiddleware);

module.exports = app;
