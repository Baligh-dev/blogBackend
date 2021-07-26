const express = require("express");
const router = express.Router();
const {
    Signup,
    SignIn
} = require("../controllers/user");
const isAuth = require("../middlewares/auth_jwt");

const {
    registerValidation,
    validation,
} = require("../middlewares/user");
// route user (signin + signup)
router.post("/signup", registerValidation(), validation, Signup);
router.post("/login", SignIn);
router.get("/current", isAuth, (req, res) => {
    res.send(req.user);
});
module.exports = router;