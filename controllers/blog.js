const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");


//gets blogs using filter
exports.getBlogs = async (req, res) => {
    try {
        var filter = {}
        const token = req.query.token
        if (token) {
            // get the id from the token
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            filter.userId = decoded.id
        }

        const blogs = await Blog.find(filter);
        res.status(200).send({ blogs });
    } catch (error) {
        res.status(400).send({ error });
    }
};

exports.getBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id });
        res.status(200).send({ blog });
    } catch (error) {
        res.status(400).send({ error });
    }
};


// add a blog
exports.addBlog = async (req, res) => {
    try {
        const {
            title,
            content,
            image,
            description,
            token,
        } = req.body;
        // fields required
        if (!title || !content || !description || !token) {
            res.status(400).send({ error: "One required field is missing" });
            return;
        }
        // get the id from the token
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const blog = new Blog({
            title,
            content,
            image,
            description,
            userId: decoded.id,
        });
        await blog.save();
        res.status(200).send({ blog });
    } catch (error) {
        res.status(400).send({ error });
    }
};



exports.editBlog = async (req, res) => {
    const { _id } = req.params;
    const {
        title,
        content,
        image,
        description,
    } = req.body;
    try {
        const blog = await Blog.updateOne(
            { _id: _id },
            {
                $set: {
                    title,
                    content,
                    image,
                    description,
                },
            }
        );

        res.status(200).send({ blog });
    } catch (error) {
        res.status(400).send({ error });
    }
};

exports.deleteBlog = async (req, res) => {
    const { blogId } = req.params;
    try {
        const blog = await Blog.findOneAndRemove({ _id: blogId });

        res.status(200).send({ blog });
    } catch (error) {
        res.status(400).send({ error });
    }
};


