const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    role: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = User = model("user", UserSchema);