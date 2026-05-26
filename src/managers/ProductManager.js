const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "../../data/productos.json");

class ProductManager {
  // --- helpers ---
  _read() {
    if (!fs.existsSync(FILE_PATH)) return [];
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
  }

  _write(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  }

  _nextId(products) {
    if (products.length === 0) return 1;
    return Math.max(...products.map((p) => Number(p.id))) + 1;
  }

  // --- public API ---
  getAll(limit) {
    const products = this._read();
    return limit ? products.slice(0, Number(limit)) : products;
  }

  getById(pid) {
    const products = this._read();
    return products.find((p) => p.id === Number(pid)) || null;
  }

  add({ title, description, code, price, status, stock, category, thumbnails }) {
    const products = this._read();

    // Validate required fields
    if (!title || !description || !code || price == null || stock == null || !category) {
      throw new Error("Faltan campos obligatorios: title, description, code, price, stock, category");
    }

    // Check unique code
    if (products.some((p) => p.code === code)) {
      throw new Error(`Ya existe un producto con el código "${code}"`);
    }

    const newProduct = {
      id: this._nextId(products),
      title,
      description,
      code,
      price: Number(price),
      status: status !== undefined ? Boolean(status) : true,
      stock: Number(stock),
      category,
      thumbnails: thumbnails || [],
    };

    products.push(newProduct);
    this._write(products);
    return newProduct;
  }

  update(pid, fields) {
    const products = this._read();
    const index = products.findIndex((p) => p.id === Number(pid));

    if (index === -1) return null;

    // id must never be updated
    const { id, ...safeFields } = fields;

    products[index] = { ...products[index], ...safeFields };
    this._write(products);
    return products[index];
  }

  delete(pid) {
    const products = this._read();
    const index = products.findIndex((p) => p.id === Number(pid));

    if (index === -1) return false;

    products.splice(index, 1);
    this._write(products);
    return true;
  }
}

module.exports = new ProductManager();
