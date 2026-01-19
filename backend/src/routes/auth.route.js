const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const { registerUserValidations, loginUserValidations } = require("../validators/auth.validation");

const router = express.Router();


router.post("/register", registerUserValidations, registerUser);
router.post("/login", loginUserValidations, loginUser);


module.exports = router;