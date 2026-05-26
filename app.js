const express = require("express");
const productsRouter = require("./src/routers/products.router");
const cartsRouter = require("./src/routers/carts.router");

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
