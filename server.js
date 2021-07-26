// requirement
const express = require("express");
const connectDB = require("./config/connectDB");
require("dotenv").config();
//const fileUpload = require("express-fileupload");

// instance app
const app = express();

// ADD THIS
var cors = require('cors');
app.use(cors());

// connection db
connectDB();

// middleware global
app.use(express.json());
//app.use(fileUpload());
app.use(express.static(__dirname + "/public"));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});





// router
app.use("/api/users", require("./router/user"));
app.use("/api/blogs", require("./router/blog"));

// PORT
const PORT = process.env.PORT;


// create server
app.listen(PORT, (err) =>
    err ? console.error(err) : console.log(`server is running on PORT ${PORT}`)
);