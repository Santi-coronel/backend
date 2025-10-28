# E-commerce Backend - Primera Entrega

API REST para gestión de productos y carritos de compra desarrollada con Node.js y Express.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd ecommerce-backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor:
```bash
npm start
```

Para desarrollo con recarga automática:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:8080`

## 📁 Estructura del Proyecto

```
ecommerce-backend/
├── app.js
├── managers/
│   ├── ProductManager.js
│   └── CartManager.js
├── routes/
│   ├── products.router.js
│   └── carts.router.js
├── data/
│   ├── products.json
│   └── carts.json
├── package.json
└── README.md
```

## 🛣️ Endpoints

### Productos (`/api/products`)

#### GET `/api/products`
Lista todos los productos disponibles.

**Respuesta exitosa:**
```json
{
  "status": "success",
  "payload": [
    {
      "id": 1,
      "title": "Producto 1",
      "description": "Descripción del producto",
      "code": "PROD001",
      "price": 100,
      "status": true,
      "stock": 50,
      "category": "Categoría",
      "thumbnails": []
    }
  ]
}
```

#### GET `/api/products/:pid`
Obtiene un producto específico por su ID.

**Parámetros:**
- `pid`: ID del producto (número)

**Respuesta exitosa:**
```json
{
  "status": "success",
  "payload": {
    "id": 1,
    "title": "Producto 1",
    "description": "Descripción del producto",
    "code": "PROD001",
    "price": 100,
    "status": true,
    "stock": 50,
    "category": "Categoría",
    "thumbnails": []
  }
}
```

#### POST `/api/products`
Crea un nuevo producto.

**Body (JSON):**
```json
{
  "title": "Nuevo Producto",
  "description": "Descripción del producto",
  "code": "PROD002",
  "price": 150,
  "stock": 30,
  "category": "Electrónica",
  "thumbnails": ["img1.jpg", "img2.jpg"]
}
```

**Campos:**
- `title` (requerido): Nombre del producto
- `description` (requerido): Descripción del producto
- `code` (requerido): Código único del producto
- `price` (requerido): Precio del producto
- `stock` (requerido): Cantidad disponible
- `category` (requerido): Categoría del producto
- `status` (opcional): Estado del producto (default: true)
- `thumbnails` (opcional): Array de rutas de imágenes

**Respuesta exitosa:**
```json
{
  "status": "success",
  "payload": {
    "id": 2,
    "title": "Nuevo Producto",
    "description": "Descripción del producto",
    "code": "PROD002",
    "price": 150,
    "status": true,
    "stock": 30,
    "category": "Electrónica",
    "thumbnails": ["img1.jpg", "img2.jpg"]
  }
}
```

#### PUT `/api/products/:pid`
Actualiza un producto existente. El ID no puede ser modificado.

**Parámetros:**
- `pid`: ID del producto (número)

**Body (JSON):**
```json
{
  "price": 200,
  "stock": 25
}
```

**Respuesta exitosa:**
```json
{
  "status": "success",
  "payload": {
    "id": 1,
    "title": "Producto 1",
    "description": "Descripción del producto",
    "code": "PROD001",
    "price": 200,
    "status": true,
    "stock": 25,
    "category": "Categoría",
    "thumbnails": []
  }
}
```

#### DELETE `/api/products/:pid`
Elimina un producto por su ID.

**Parámetros:**
- `pid`: ID del producto (número)

**Respuesta exitosa:**
```json
{
  "status": "success",
  "payload": {
    "id": 1,
    "title": "Producto 1",
    "description": "Descripción del producto",
    "code": "PROD001",
    "price": 100,
    "status": true,
    "stock": 50,
    "category": "Categoría",
    "thumbnails": []
  },
  "message": "Producto eliminado correctamente"
}
```

### Carritos (`/api/carts`)

#### POST `/api/carts`
Crea un nuevo carrito vacío.

**Respuesta exitosa:**
```json
{
  "status": "success",
  "payload": {
    "id": 1,
    "products": []
  }
}
```

#### GET `/api/carts/:cid`
Obtiene un carrito específico con sus productos.

**Parámetros:**
- `cid`: ID del carrito (número)

**Respuesta exitosa:**
```json
{
  "status": "success",
  "payload": {
    "id": 1,
    "products": [
      {
        "product": 1,
        "quantity": 2
      },
      {
        "product": 3,
        "quantity": 1
      }
    ]
  }
}
```

#### POST `/api/carts/:cid/product/:pid`
Agrega un producto al carrito. Si el producto ya existe, incrementa su cantidad en 1.

**Parámetros:**
- `cid`: ID del carrito (número)
- `pid`: ID del producto (número)

**Respuesta exitosa:**
```json
{
  "status": "success",
  "payload": {
    "id": 1,
    "products": [
      {
        "product": 1,
        "quantity": 3
      }
    ]
  },
  "message": "Producto agregado al carrito"
}
```

## 🧪 Probar con Postman

### Ejemplo de flujo completo:

1. **Crear un producto:**
   - Método: POST
   - URL: `http://localhost:8080/api/products`
   - Body (raw JSON):
   ```json
   {
     "title": "Laptop HP",
     "description": "Laptop HP 15 pulgadas",
     "code": "LAP001",
     "price": 850,
     "stock": 10,
     "category": "Electrónica"
   }
   ```

2. **Listar productos:**
   - Método: GET
   - URL: `http://localhost:8080/api/products`

3. **Crear un carrito:**
   - Método: POST
   - URL: `http://localhost:8080/api/carts`

4. **Agregar producto al carrito:**
   - Método: POST
   - URL: `http://localhost:8080/api/carts/1/product/1`

5. **Ver carrito:**
   - Método: GET
   - URL: `http://localhost:8080/api/carts/1`

## 📝 Notas Técnicas

- Los archivos JSON se crean automáticamente en la carpeta `data/` al iniciar el servidor por primera vez
- Los IDs se autogeneran de forma incremental
- El código del producto debe ser único
- El campo `status` es `true` por defecto
- Al agregar un producto que ya existe en el carrito, solo se incrementa su cantidad

## ⚠️ Manejo de Errores

La API devuelve respuestas con el siguiente formato:

**Error:**
```json
{
  "status": "error",
  "error": "Descripción del error"
}
```

**Códigos de estado HTTP:**
- `200`: Operación exitosa
- `201`: Recurso creado exitosamente
- `400`: Error en la solicitud (datos inválidos)
- `404`: Recurso no encontrado
- `500`: Error interno del servidor