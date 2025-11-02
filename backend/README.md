# Around the U.S. - API BACKEND 🌎

**Stack:** Node.js · Express · MongoDB · Mongoose · Celebrate/Joi · Winston · PM2

## 🧭 Descripción general
Backeend desaarrollado en **Node.js y Express** como parte del proyecto final del Bootcamp de Desarrollo Web (TripleTen). Provee la API para la aplicación **Around**, una red social tipo galería donde los usuarios pueden compartir lugares e imágenes.  

La Api implementa:
- Registro y autenticación de usuarios mediante **JWT** y contraseñas cifradas con **bcrypt**.
- Protección de rutas privadas con middleware de autorización.
- CRUD completo de usuarios y tarjetas (crear, leer, actualizar, eliminar).
- Validaciones robustas con **Celebrate/Joi**.
- Manejo centralizado de errores y logs con **Winston**.
- Compatibilidad con **CORS** y recuperación automática del servidor mediante **PM2 Crash Test**.

---

## ✨ Funcionalidades
- **Usuarios**
  - Registro (`/signup`) y login (`/signin`).
  - Consultar todos los usuarios o un usuario específico.
  - Obtenner información de un usuario autenticado (`/user/me`).
  - Actualizar información (nombre, bio, avatar).
  - Protección con token JWT en rutas privadas.
  - Manejo de errores:
    - 400 -> datos inválidos
    - 401 -> token faltante o inválido
    - 404 -> usuario no encontrado
    - 409 -> correo electrónico duplicado

- **Tarjetas**
  - Crear tarjeta (asociada automáticamente al `owner` autenticado).
  - Consultar todas las tarjetas
  - Eliminar tarjeta por ID.
  - Dar y quitar like.
  - Manejo de errores: 
    - 400 -> datos o ID inválido.
    - 403 -> intento de eliminar tarjeta ajena.
    - 404 -> tarjeta no encontrada.

## 🧱 Arquitectura del proyecto

- **Node.js + Express:** estructura modular con rutas, controladores y middlewares.  
- **MongoDB + Mongoose:** definición de esquemas y validaciones de datos.  
- **Celebrate + Joi:** validación de cuerpo, parámetros y encabezados de solicitud.  
- **Winston + express-winston:** registro en archivos `requests.log` y `errors.log`.  
- **PM2 Crash Test:** reinicio automático ante errores no controlados
  

---
# Around the U.S. — API Backend 🌎

**Stack:** Node.js · Express · MongoDB · Mongoose · Celebrate/Joi · Winston · JWT · PM2

---

## 🧭 Descripción general

Backend desarrollado en **Node.js y Express** como parte del **proyecto final del Bootcamp de Desarrollo Web (TripleTen)**.  
Provee la API para la aplicación **Around**, una red social tipo galería donde los usuarios pueden compartir lugares e imágenes.

La API implementa:
- Registro y autenticación de usuarios mediante **JWT** y contraseñas cifradas con **bcrypt**.  
- Protección de rutas privadas con middleware de autorización.  
- CRUD completo de usuarios y tarjetas (crear, leer, actualizar, eliminar).  
- Validaciones robustas con **Celebrate/Joi**.  
- Manejo centralizado de errores y logs con **Winston**.  
- Compatibilidad con **CORS** y recuperación automática del servidor mediante **PM2 Crash Test**.

---

## ✨ Funcionalidades principales

### 👥 Usuarios
- Registro (`/signup`) y login (`/signin`).
- Consultar todos los usuarios o un usuario específico.
- Obtener información del usuario autenticado (`/users/me`).
- Actualizar nombre, descripción o avatar.
- Protección con token JWT en rutas privadas.
- Manejo de errores:  
  - 400 → datos inválidos  
  - 401 → token faltante o inválido  
  - 404 → usuario no encontrado  
  - 409 → correo electrónico duplicado  

### 🖼️ Tarjetas
- Crear tarjeta (asociada automáticamente al `owner` autenticado).  
- Listar todas las tarjetas.  
- Dar y quitar “like”.  
- Eliminar solo si la tarjeta pertenece al usuario autenticado.  
- Manejo de errores:
  - 400 → datos o ID inválidos  
  - 403 → intento de eliminar tarjeta ajena  
  - 404 → tarjeta no encontrada  

---

## 🧱 Arquitectura del proyecto

- **Node.js + Express:** estructura modular con rutas, controladores y middlewares.  
- **MongoDB + Mongoose:** definición de esquemas y validaciones de datos.  
- **Celebrate + Joi:** validación de cuerpo, parámetros y encabezados de solicitud.  
- **Winston + express-winston:** registro en archivos `requests.log` y `errors.log`.  
- **PM2 Crash Test:** reinicio automático ante errores no controlados.  

---

## 📂 Estructura del proyecto

```bash
backend/
├── app.js
├── controllers/
│   ├── users.js
│   └── cards.js
├── middlewares/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── validators.js
├── models/
│   ├── user.js
│   └── card.js
├── routes/
│   ├── index.js
│   ├── users.js
│   └── cards.js
└── logs/
    ├── requests.log
    └── errors.log

```

## 🔌 Endpoints
Base URL: `http://localhost:3000`

## 🧩 Endpoints principales. 
**Autenticación**
- **POST** `/signup` 
  Registra un nuevo usuario.
- **POST** `/signin`
  Inicia sesión y devuelve un token JWT.

**Usuarios**
- **GET** `/users`  
  Devuelve la lista completa de usuarios (200).
- **GET** `/users/me`
  Devuelve el perfil del usuario autenticado.
- **GET** `/users/:userid`  
  Devuelve un usuario por su `_id`.
- **PATCH** `/users/me`
  Actualiza nombre y descripción.
- **PATCH** `/users/me/avatar`
  Actualizar avatar.

## Tarjetas. 
- **GET** `/cards`
  Lista todas las tarjetas.
- **POST** `/cards`
  Crea una nueva tarjeta.
- **DELETE** `/cards/:cardId`
  Elimina una tarjeta(solo si es tuya).
- **PUT** `/cards/:cardId/likes`
  Da like a una tarjeta.
- **DELETE** `/cards/:cardId/likes`
  Quita like de una tarjeta. 



### ✅ Validación y manejo de errores

- **request.log**: registra cada solicitud entrante con método, URL y código de estado.
- **errors.log**: almacena errores del serividor y validaciones fallidas. 

- **Errores comunes**:
  - 400 -> Datos inválidos o formato incorrecto. 
  - 401 -> Token ausente o inválido.
  - 403 -> Acción no permitida.
  - 404 -> Recurso no encontrado.
  - 409 -> Registro duplicado.
  - 500 -> Error interno del servidor.

## ▶️ Cómo ejecutar
Requisitos
# MongoDB local mongodb://localhost:27017/araundb
* Node.js LTS (18+)

```bash
npm install
npm run dev
# O
npm start
```
# Servidor en http://localhost:3000

## 🔐 Variables de entorno(.env)
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
PORT=3000
MONGO_URL=mongodb://localhost:27017/aroundb
JWT_SECRET=dev-secret
NODE_ENV=development
```

## ☁️Despliegue
El backend puede desplegarse en plataformas como:
* Render
* Railway
* Google Cloud Compute Engine
* PM2 + Nginx (para dominios con HTTPS)

## ✍️ Autora 

Lina Castro - Full Stack Dev Jr.
LinkedIn: https://www.linkedin.com/in/lina-castro079/

GitHub: https://github.com/Lina079


