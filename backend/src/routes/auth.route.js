const express = require("express");
const {
  registerUser,
  loginUser,
  getAuth,
} = require("../controllers/auth.controller");
const {
  registerUserValidations,
  loginUserValidations,
} = require("../validators/auth.validation");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUserValidations, registerUser);
router.post("/login", loginUserValidations, loginUser);
router.get("/me", authMiddleware, getAuth);

module.exports = router;
