import fs from 'fs/promises';

class CartManager {
  constructor(filePath) {
    this.path = filePath;
    this.init();
  }

  async init() {
    try {
      await fs.access(this.path);
    } catch (error) {
      await fs.writeFile(this.path, JSON.stringify([], null, 2));
    }
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error al leer los carritos');
    }
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === id);
    
    if (!cart) {
      return null;
    }
    
    return cart;
  }

  async createCart() {
    const carts = await this.getCarts();
    
    // Generar ID único
    const newId = carts.length > 0 
      ? Math.max(...carts.map(c => c.id)) + 1 
      : 1;

    const newCart = {
      id: newId,
      products: []
    };

    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    
    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(c => c.id === cartId);
    
    if (cartIndex === -1) {
      return null;
    }

    const cart = carts[cartIndex];
    
    // Buscar si el producto ya existe en el carrito
    const productIndex = cart.products.findIndex(p => p.product === productId);
    
    if (productIndex !== -1) {
      // Si existe, incrementar la cantidad
      cart.products[productIndex].quantity += 1;
    } else {
      // Si no existe, agregarlo con cantidad 1
      cart.products.push({
        product: productId,
        quantity: 1
      });
    }

    carts[cartIndex] = cart;
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    
    return cart;
  }
}

export default CartManager;