const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
});

module.exports = Blog = model("blog", BlogSchema);
