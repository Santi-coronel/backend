const { Router } = require("express");
const productManager = require("../managers/ProductManager");

const router = Router();

// GET /api/products/  — list all (supports ?limit=N)
router.get("/", (req, res) => {
  try {
    const { limit } = req.query;
    const products = productManager.getAll(limit);
    res.json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// GET /api/products/:pid  — get one by id
router.get("/:pid", (req, res) => {
  try {
    const product = productManager.getById(req.params.pid);
    if (!product) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
    res.json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// POST /api/products/  — create a new product
router.post("/", (req, res) => {
  try {
    const newProduct = productManager.add(req.body);
    res.status(201).json({ status: "success", payload: newProduct });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

// PUT /api/products/:pid  — update a product (never updates id)
router.put("/:pid", (req, res) => {
  try {
    const updated = productManager.update(req.params.pid, req.body);
    if (!updated) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
    res.json({ status: "success", payload: updated });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// DELETE /api/products/:pid  — delete a product
router.delete("/:pid", (req, res) => {
  try {
    const deleted = productManager.delete(req.params.pid);
    if (!deleted) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
    res.json({ status: "success", message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
