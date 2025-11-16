const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");
const userMiddleware = require("../middleware/userMiddlware");

const cartRouter = express.Router();

cartRouter.post("/cart/add", userMiddleware, addToCart);
cartRouter.get("/cart", userMiddleware, getCart);
cartRouter.delete("/cart/remove", userMiddleware, removeFromCart);

module.exports = cartRouter;
