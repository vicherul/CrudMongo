# Crud de Base de Datos MongoDB

> Continúa con la realización de un CRUD para una de las siguientes bases de datos

---

## Opciones Disponibles

| # | Nombre | Colección | Descripción |
|---|--------|-----------|-------------|
| 1 | Video_Game_Store | `juegos` | Tienda de videojuegos |
| 2 | Coffe_Peperland | `productos` | Cafetería y alimentos |
| 3 | Paw_Potrol | `mascotas` | Registro de mascotas |
| 4 | Lee_Aprender_Library | `libros` | Biblioteca de libros |
| 5 | Call_Phone | `celulares` | Especificaciones técnicas |

---

## 1️⃣ Video_Game_Store
**Colección:** `juegos`
```javascript
{
  titulo: String,
  plataforma: [String],
  precio: Number,
  stock: Number,
  esDigital: Boolean
}
```

## 2️⃣ Coffe_Peperland
**Colección:** `productos`
```javascript
{
  nombre: String,
  categoria: String, // "bebida" o "comida"
  calorias: Number,
  vegano: Boolean,
  ingredientes: [String]
}
```

## 3️⃣ Paw_Potrol
**Colección:** `mascotas`
```javascript
{
  nombre: String,
  especie: String,
  edad: Number,
  vacunado: Boolean,
  proximaCita: Date
}
```

## 4️⃣ Lee_Aprender_Library
**Colección:** `libros`

> Ideal para practicar filtros de texto y fechas

```javascript
{
  titulo: String,
  autor: String,
  paginas: Number,
  generos: [String],
  prestado: Boolean
}
```

## 5️⃣ Call_Phone
**Colección:** `celulares`

> Útil para comparar especificaciones técnicas

```javascript
{
  marca: String,
  modelo: String,
  almacenamiento: Number,
  camaraMpx: Number,
  enOferta: Boolean
}
```

---

## 📌 Importante
- Sube tu proyecto a GitHub
- Utiliza la rama **`main`**
- Implementa las operaciones CRUD (Create, Read, Update, Delete)