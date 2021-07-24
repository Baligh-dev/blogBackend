const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // if password contains @  replace it with %2540
        await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("database connected successfully");
    } catch (error) {
        console.log("database can not connect", error);
    }
};

module.exports = connectDB;