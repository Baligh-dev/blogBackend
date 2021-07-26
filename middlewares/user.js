const { validationResult, check } = require("express-validator");

exports.registerValidation = () => [
    check("username", "username is required").not().isEmpty(),
    check("password", "enter a valid password").isLength({ min: 6 }),
];

exports.validation = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: errors.array().map(x => x.msg).join(", ") });
        }
        next();
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }

};