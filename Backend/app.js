const express = require('express');

const app = express();

app.use(express.json());

// import all routes
const producturl = require("./routes/ProductRoutes.js")
app.use("/api/v1",producturl);

module.exports = app 