const User = require("../models/User");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

exports.Signup = async (req, res) => {
    try {
        // req.body
        const { username, password } = req.body;

        // check if the email already exists in the database
        const FoundUser = await User.findOne({ username });

        if (FoundUser) {
            res.status(400).send({
                error: "user already exists, email should be unique",
            });
            return;
        }
        const newUser = new User({ role: "user", username, password });

        // hash the password
        const hashedpassword = bcrypt.hashSync(password, salt);
        newUser.password = hashedpassword;

        // create a key using json webtoken
        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: 600000 }
        );
        // save the new user in the database
        await newUser.save();
        res
            .status(200)
            .send({ user: newUser, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.SignIn = async (req, res) => {
    try {
        // get the req.body
        const { username, password } = req.body;
        // search if the user exists
        const searchUser = await User.findOne({ username });

        // send an error if he didnt exist
        if (!searchUser) {
            res.status(400).send({ error: "Bad Credential" });
            return;
        }
        // check if the sent password is equal to the current Password
        const hashedpass = searchUser.password;
        const result = await bcrypt.compare(password, hashedpass);
        if (!result) {
            res.status(400).send({ error: "Bad Credential" });
            return;
        }
        // else create a key
        const token = jwt.sign(
            {
                id: searchUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: 600000 }
        );

        // send the details + a key
        res.status(200).send({ user: searchUser, token });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Bad Credential" });
    }
};