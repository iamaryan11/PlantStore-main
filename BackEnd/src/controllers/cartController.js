const Cart = require("../models/cart");
const Plants = require("../models/plants");

const addToCart = async (req, res) => {
  try {
    const { plantId, quantity } = req.body;
    const userId = req.user.id;

    const plant = await Plants.findById(plantId);
    if (!plant) return res.status(404).json({ error: "Plant not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ plantId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex((item) =>
        item.plantId.equals(plantId)
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ plantId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Plant added to cart", cart });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error adding to cart", details: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.plantId");
    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    res.status(200).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching cart", details: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { plantId } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => !item.plantId.equals(plantId));

    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error removing from cart", details: err.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
