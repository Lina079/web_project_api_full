# Around (Express) — API REST con Node.js + Express

**Stack:** Node.js · Express · MongoDB · Mongoose · Postman · ESLint

## 🧭 Resumen
Servidor backend que provee la API para la aplicación **Around**, una galería social con usuarios y tarjetas.  
Implementa un **CRUD completo** para usuarios y tarjetas, **validaciones con Moongoose**, likes/unlikes y **manejo centralizado de errores.**

---

## ✨ Funcionalidades
- **Usuarios**
  - Crear usuario
  - Consultar todos los usuarios
  - Consultar usuario por ID
  - Actualizar información (nombre, bio, avatar)
  - Manejo de errores id inválido(400), usuario no encontrado (404), validaciones de (400).

- **Tarjetas**
  - Crear tarjeta (asocia `owner` desde `req.user._id`)
  - Consultar todas las tarjetas
  - Eliminar tarjeta por ID
  - Dar y quitar like (evita duplicados con `$addToSet`)
  - Manejo de errores: id inválido (400), tarjeta no encontrada (404)

- **Middlewares**
  - **Auth temporal**: inserta `req.user._id` tomando automáticamente un usuario existente de la BD (provisional para este sprint )
  - **Errores**: 400 / 404 / 500
  

---

## 🧱 Arquitectura
- **Node.js + Express** (rutas/controladores)
- **MongoDB + Mongoose** (modelos, validaciones yconsultas)
- **Rutas separadas** para usuarios y tarjetas
- **Controladores** con lógica de negocio 
- **Middlewares personalizados** para validación y errores
- **Linter (ESLint)** para mantener calidad de código

## 📁 Estructura del proyecto

~~~text
.
├── app.js
├── controllers
│   ├── users.js
│   └── cards.js
├── models
│   ├── user.js
│   └── card.js
├── routes
│   ├── index.js
│   ├── users.js
│   └── cards.js
├── .editorconfig
├── .eslintrc
├── .gitignore
├── package.json
└── README.md
~~~

## 🔌 Endpoints
Base URL: `http://localhost:3000`

### Usuarios
- **GET** `/users`  
  Devuelve la lista completa de usuarios (200).
- **GET** `/users/:userid`  
  Devuelve un usuario por su `_id`.  
  - Si **no existe**, responde **404**:
    ```json
    { "message": "ID de usuario no encontrado" }
    ```
- **POST** `/users/` - crear usuario
    Body:
    ```json
    { "name": "Ada Lovelace", "about": "Mathematician, writer", "avatar":"https://example.com/a.jpg" }
    ```
    * 201 creado, 400 si la validación falla

- **PATCH**`/users/me` - actualizar name y about del      usuario autenticado.
Body:
```json
{ "name": "Ada L.", "about": "Math & computing" }
```
  * 200 actualizado, 400 si la validación falla
- **PATCH**`/users/me/avatar - actualizar avatar (URL válida)
Body:
```json
{ "avatar": "https://example.com/a.jpg" }
```
 * 200 actualizado, 400 si la URL no cumple la regex
 
### Tarjetas
- **GET** `/cards`  
  Devuelve la lista completa de tarjetas (200; con populate(['owner', 'likes'])).
- **POST**`/cards`
  crear tarjeta
  Body:
  ```json
  {"name": "Golden Gate", "link": "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg" }
  ```
  * owner se toma de req.user._id
  * 201 creada, 400 si la validación falla
- **DELETE**`/cards/:cardId - eliminar tarjeta
  * 200 si se elimina, 400 id inválido, 404 si no existe
- **PUT**`/cards/:cardId/likes -- dar like (usa $addToSet) -> 200
- **DELETE**`/cards/:cardId/likes -- quitar like (usa $pull) -> 200

### ✅ Validación y manejo de errores

* Mongoose valida longitudes (name, about: 2–30) y URL en avatar/link mediante regex compartida (http/https, www. opcional, ruta válida).

* 400: ValidationError (datos inválidos), CastError (id mal formado)

* 404: recurso no encontrado (usando .orFail() o error con statusCode = 404)

* 500: error interno genérico

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

🧪 Postman (sugerencia)
# Enviroment:
 * baseUrl = http://localhost:3000/users

# Test para guardar IDs automáticamente:
```js
// En POST / users (Tests)
pm.environment.set('userId', pm.response.json()._id);

// En POST / cards (Test)
pm.environment.set('cardId', pm.response.json()._id);
```
* Usar variables en URLs:

```bash
{{baseUrl}}/users
{{baseUrl}}/users/{{userId}}
{{baseUrl}}/cards/{{cardId}}/likes
```

✅ Linter

npm run lint

## ✍️ Autora 

Lina Castro - Full Stack Dev Jr.
LinkedIn: https://www.linkedin.com/in/lina-castro079/

GitHub: https://github.com/Lina079
