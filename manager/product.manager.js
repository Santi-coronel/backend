import fs from 'fs/promises';
import path from 'path';

class ProductManager {
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

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error al leer los productos');
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return null;
    }
    
    return product;
  }

  async addProduct(productData) {
    const products = await this.getProducts();
    
    // Validar campos obligatorios
    const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
    for (const field of requiredFields) {
      if (!productData[field]) {
        throw new Error(`El campo ${field} es obligatorio`);
      }
    }

    // Verificar que el código no esté duplicado
    const existingProduct = products.find(p => p.code === productData.code);
    if (existingProduct) {
      throw new Error('Ya existe un producto con ese código');
    }

    // Generar ID único
    const newId = products.length > 0 
      ? Math.max(...products.map(p => p.id)) + 1 
      : 1;

    const newProduct = {
      id: newId,
      title: productData.title,
      description: productData.description,
      code: productData.code,
      price: Number(productData.price),
      status: productData.status !== undefined ? productData.status : true,
      stock: Number(productData.stock),
      category: productData.category,
      thumbnails: productData.thumbnails || []
    };

    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    
    return newProduct;
  }

  async updateProduct(id, updateData) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return null;
    }

    // No permitir actualizar el ID
    delete updateData.id;

    // Actualizar solo los campos proporcionados
    products[index] = {
      ...products[index],
      ...updateData
    };

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return null;
    }

    const deletedProduct = products[index];
    products.splice(index, 1);
    
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    
    return deletedProduct;
  }
}

export default ProductManager;