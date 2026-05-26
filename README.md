# E-Commerce API — Primera Entrega

Servidor REST con Node.js + Express para gestionar productos y carritos de compra.

## Instalación

```bash
npm install
npm start
```

El servidor escucha en **http://localhost:8080**

---

## Endpoints — Productos `/api/products`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Lista todos los productos. Soporta `?limit=N` |
| GET | `/api/products/:pid` | Obtiene un producto por ID |
| POST | `/api/products` | Crea un nuevo producto |
| PUT | `/api/products/:pid` | Actualiza un producto (nunca modifica el ID) |
| DELETE | `/api/products/:pid` | Elimina un producto |

### Campos del producto (POST body)

```json
{
  "title": "Laptop Pro",        // String — requerido
  "description": "...",         // String — requerido
  "code": "LAP-001",            // String — requerido, único
  "price": 999.99,              // Number — requerido
  "stock": 10,                  // Number — requerido
  "category": "Electrónica",    // String — requerido
  "status": true,               // Boolean — opcional (default: true)
  "thumbnails": ["img/a.jpg"]   // Array<String> — opcional (default: [])
}
```

---

## Endpoints — Carritos `/api/carts`

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/carts` | Crea un nuevo carrito vacío |
| GET | `/api/carts/:cid` | Lista los productos del carrito |
| POST | `/api/carts/:cid/product/:pid` | Agrega un producto al carrito (si ya existe, incrementa quantity) |

---

## Persistencia

Los datos se guardan en archivos JSON en `/data`:
- `productos.json` — almacena los productos
- `carrito.json` — almacena los carritos

## Probar con Postman / curl

```bash
# Listar productos (con límite)
curl http://localhost:8080/api/products?limit=2

# Obtener producto por id
curl http://localhost:8080/api/products/1

# Crear producto
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"title":"Auriculares","description":"Bluetooth 5.0","code":"AUR-010","price":49.99,"stock":30,"category":"Audio"}'

# Actualizar producto
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":1199.99,"stock":20}'

# Eliminar producto
curl -X DELETE http://localhost:8080/api/products/4

# Crear carrito
curl -X POST http://localhost:8080/api/carts

# Agregar producto al carrito
curl -X POST http://localhost:8080/api/carts/1/product/2

# Ver productos del carrito
curl http://localhost:8080/api/carts/1
```
