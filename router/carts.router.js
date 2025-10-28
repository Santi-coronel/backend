import { Router } from 'express';
import CartManager from '../managers/CartManager.js';
import ProductManager from '../managers/ProductManager.js';
import path from 'path';

const router = Router();
const cartManager = new CartManager(path.join(process.cwd(), 'data', 'carts.json'));
const productManager = new ProductManager(path.join(process.cwd(), 'data', 'products.json'));

// POST / - Crear nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ status: 'success', payload: newCart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// GET /:cid - Obtener carrito por ID
router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    
    if (isNaN(cartId)) {
      return res.status(400).json({ status: 'error', error: 'ID inválido' });
    }

    const cart = await cartManager.getCartById(cartId);
    
    if (!cart) {
      return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    }
    
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// POST /:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    
    if (isNaN(cartId) || isNaN(productId)) {
      return res.status(400).json({ status: 'error', error: 'IDs inválidos' });
    }

    // Verificar que el producto exista
    const product = await productManager.getProductById(productId);
    if (!product) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }

    const updatedCart = await cartManager.addProductToCart(cartId, productId);
    
    if (!updatedCart) {
      return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    }
    
    res.json({ status: 'success', payload: updatedCart, message: 'Producto agregado al carrito' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;