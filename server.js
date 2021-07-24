// requirement
const express = require("express");
const connectDB = require("./config/connectDB");
require("dotenv").config();
// instance app
const app = express();
// connection db
connectDB();
// PORT
const PORT = process.env.PORT;


// create server
app.listen(PORT, (err) =>
    err ? console.error(err) : console.log(`server is running on PORT ${PORT}`)
);