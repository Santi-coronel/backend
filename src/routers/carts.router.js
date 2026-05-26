const { Router } = require("express");
const cartManager = require("../managers/CartManager");

const router = Router();

// POST /api/carts/  — create a new cart
router.post("/", (req, res) => {
  try {
    const newCart = cartManager.create();
    res.status(201).json({ status: "success", payload: newCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// GET /api/carts/:cid  — list products in a cart
router.get("/:cid", (req, res) => {
  try {
    const cart = cartManager.getById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    res.json({ status: "success", payload: cart.products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// POST /api/carts/:cid/product/:pid  — add product to cart
router.post("/:cid/product/:pid", (req, res) => {
  try {
    const updatedCart = cartManager.addProduct(req.params.cid, req.params.pid);
    if (!updatedCart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    res.json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
