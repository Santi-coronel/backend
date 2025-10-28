import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import path from 'path';

const router = Router();
const productManager = new ProductManager(path.join(process.cwd(), 'data', 'products.json'));

// GET / - Listar todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json({ status: 'success', payload: products });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// GET /:pid - Obtener producto por ID
router.get('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    
    if (isNaN(productId)) {
      return res.status(400).json({ status: 'error', error: 'ID inválido' });
    }

    const product = await productManager.getProductById(productId);
    
    if (!product) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
    
    res.json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// POST / - Crear nuevo producto
router.post('/', async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productManager.addProduct(productData);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
});

// PUT /:pid - Actualizar producto
router.put('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    
    if (isNaN(productId)) {
      return res.status(400).json({ status: 'error', error: 'ID inválido' });
    }

    const updateData = req.body;
    const updatedProduct = await productManager.updateProduct(productId, updateData);
    
    if (!updatedProduct) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
    
    res.json({ status: 'success', payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// DELETE /:pid - Eliminar producto
router.delete('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    
    if (isNaN(productId)) {
      return res.status(400).json({ status: 'error', error: 'ID inválido' });
    }

    const deletedProduct = await productManager.deleteProduct(productId);
    
    if (!deletedProduct) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
    
    res.json({ status: 'success', payload: deletedProduct, message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;