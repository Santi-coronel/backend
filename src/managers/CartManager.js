const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "../../data/carrito.json");

class CartManager {
  // --- helpers ---
  _read() {
    if (!fs.existsSync(FILE_PATH)) return [];
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
  }

  _write(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  }

  _nextId(carts) {
    if (carts.length === 0) return 1;
    return Math.max(...carts.map((c) => Number(c.id))) + 1;
  }

  // --- public API ---
  create() {
    const carts = this._read();
    const newCart = {
      id: this._nextId(carts),
      products: [],
    };
    carts.push(newCart);
    this._write(carts);
    return newCart;
  }

  getById(cid) {
    const carts = this._read();
    return carts.find((c) => c.id === Number(cid)) || null;
  }

  addProduct(cid, pid) {
    const carts = this._read();
    const cartIndex = carts.findIndex((c) => c.id === Number(cid));

    if (cartIndex === -1) return null;

    const cart = carts[cartIndex];
    const existingProduct = cart.products.find((p) => p.product === Number(pid));

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: Number(pid), quantity: 1 });
    }

    this._write(carts);
    return cart;
  }
}

module.exports = new CartManager();
