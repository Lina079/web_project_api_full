cd ~/web_project_api_full
cat > README.md << 'EOF'
# Postland - Red Social de Lugares 🌎

Aplicación web full-stack que permite a los usuarios compartir lugares favoritos mediante tarjetas con imágenes.

**🔗 URLs del Proyecto:**
- **Frontend:** https://postland.tamarindo.net
- **Backend API:** https://api.postland.tamarindo.net/api

---

## 📋 Descripción

Postland es una red social donde usuarios registrados pueden:
- ✅ Crear y gestionar su perfil (nombre, descripción, avatar)
- ✅ Publicar tarjetas con imágenes de lugares
- ✅ Dar "like" a tarjetas de otros usuarios
- ✅ Eliminar sus propias tarjetas
- ✅ Ver todas las tarjetas publicadas por la comunidad

---

## 🛠️ Tecnologías Utilizadas

### **Frontend:**
- React 18
- React Router v6
- Vite
- Context API
- Fetch API
- CSS (BEM methodology)

### **Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Celebrate + Joi (validación)
- Winston + express-winston (logging)
- CORS

### **Infraestructura:**
- Google Cloud Platform (VM)
- Nginx (reverse proxy)
- PM2 (process manager)
- Let's Encrypt (SSL/HTTPS)
- MongoDB Atlas (base de datos)

---

## ✨ Funcionalidades Principales

### **Autenticación y Usuarios:**
- Registro de nuevos usuarios
- Login con JWT (expiración: 7 días)
- Token almacenado en localStorage
- Auto-login al recargar la página
- Rutas protegidas (solo usuarios autenticados)
- Edición de perfil (nombre, descripción, avatar)

### **Tarjetas:**
- Ver todas las tarjetas de todos los usuarios
- Crear nuevas tarjetas
- Eliminar solo tus propias tarjetas (validado en backend)
- Sistema de likes/dislikes
- Persistencia en MongoDB

### **Seguridad:**
- Contraseñas hasheadas con bcryptjs
- Validación de datos con Celebrate/Joi
- CORS configurado
- Manejo centralizado de errores
- Logging de requests y errores

---

## 📂 Estructura del Proyecto
```
web_project_api_full/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── logs/
│   ├── app.js
│   ├── .env (solo en servidor)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── contexts/
│   ├── dist/ (archivos compilados)
│   └── package.json
└── README.md
```

---

## 🚀 Instalación y Ejecución Local

### **Requisitos previos:**
- Node.js 18+
- MongoDB (local o Atlas)
- npm

### **Backend:**
```bash
cd backend
npm install
npm run dev
# Servidor en http://localhost:3000
```

### **Frontend:**
```bash
cd frontend
npm install
npm run dev
# App en http://localhost:5173
```

---

## 🌐 Despliegue

### **Servidor:**
- VM en Google Cloud Platform (Ubuntu 24)
- IP: 104.154.131.65
- Dominio: postland.tamarindo.net
- Subdominio API: api.postland.tamarindo.net

### **Frontend:**
- Compilado con `npm run build`
- Servido por Nginx desde `/var/www/postland.tamarindo.net/`

### **Backend:**
- Ejecutado con PM2
- Variables de entorno en `.env`:
  - `NODE_ENV=production`
  - `JWT_SECRET=[clave secreta]`
  - `MONGODB_URI=[MongoDB Atlas URI]`

### **SSL/HTTPS:**
- Certificado Let's Encrypt
- Renovación automática con certbot

---

## 📡 API Endpoints

### **Autenticación (públicas):**
- `POST /api/signup` - Registrar usuario
- `POST /api/signin` - Iniciar sesión

### **Usuarios (protegidas):**
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/me` - Obtener perfil actual
- `GET /api/users/:userId` - Obtener usuario por ID
- `PATCH /api/users/me` - Actualizar perfil
- `PATCH /api/users/me/avatar` - Actualizar avatar

### **Tarjetas (protegidas):**
- `GET /api/cards` - Obtener todas las tarjetas
- `POST /api/cards` - Crear tarjeta
- `DELETE /api/cards/:cardId` - Eliminar tarjeta
- `PUT /api/cards/:cardId/likes` - Dar like
- `DELETE /api/cards/:cardId/likes` - Quitar like

---

## 🔒 Códigos de Error

- **400** - Datos inválidos
- **401** - No autorizado (token inválido o ausente)
- **403** - Prohibido (p.ej., intentar eliminar tarjeta de otro usuario)
- **404** - Recurso no encontrado
- **409** - Conflicto (p.ej., email ya registrado)
- **500** - Error del servidor

---

## 👩‍💻 Autora

**Lina Castro Rodriguez**
- Full Stack Developer Jr.
- LinkedIn: [linkedin.com/in/lina-castro079](https://www.linkedin.com/in/lina-castro079/)
- GitHub: [github.com/Lina079](https://github.com/Lina079)

---

## 📝 Notas del Proyecto

Este proyecto fue desarrollado como parte del Sprint 18 del Bootcamp de Desarrollo Web de TripleTen, implementando un stack MERN completo con despliegue en producción.

**Características destacadas:**
- Arquitectura full-stack completa
- Autenticación JWT segura
- Base de datos en la nube (MongoDB Atlas)
- Servidor en producción con dominio propio
- SSL/HTTPS activo
- Sistema de logging
- Manejo robusto de errores
- Validación de datos en cliente y servidor
EOF
