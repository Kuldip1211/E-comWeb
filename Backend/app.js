const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error.js');
app.use(express.json());

// import all routes
const producturl = require("./routes/ProductRoutes.js")
app.use("/api/v1/",producturl);

// use middleware
app.use(errorMiddleware)

module.exports = app;