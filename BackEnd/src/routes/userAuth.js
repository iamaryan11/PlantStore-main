const express = require("express");
const {
  signup,
  login,
  adminRegister,
  logout,
} = require("../controllers/userAuthent");
const userMiddleware = require("../middleware/userMiddlware");
const adminMiddleware = require("../middleware/adminMiddleware");
const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", userMiddleware, logout);

// running admin middleware cuz only admin can register another admin
authRouter.post("/adminRegister", adminMiddleware, adminRegister);

module.exports = authRouter;
