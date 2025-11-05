require('dotenv').config();
console.log('🔐 JWT_SECRET cargado en app.js:', process.env.JWT_SECRET);
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');


const { createUser, login } = require('./controllers/users');
const { signupValidator, signinValidator } = require('./middlewares/validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const { PORT = 3000, MONGODB_URI } = process.env;

// --- Ruta temporal para depuración ---
app.get('/api/debug', (req, res) => {
  res.json({
    env_secret: process.env.JWT_SECRET,
    time: new Date().toISOString(),
  });
});


// --- Middleware base ---
app.use(express.json());

// --- Configuración CORS ---
const allowedOrigins = [
  'https://postland.tamarindo.net', // dominio de producción
  'http://localhost:5173',          // Vite modo dev
  'http://localhost:3000',          // alternativa local
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

// --- Conexión a MongoDB ---
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado correctamente a MongoDB Atlas');
    console.log('📦 Base de datos conectada:', mongoose.connection.name);
  })
  .catch((err) => {
    console.error('❌ Error al conectar a MongoDB Atlas:', err.message);
    process.exit(1);
  });

// --- Log de solicitudes ---
app.use(requestLogger);

// --- Ruta de prueba (no eliminar hasta revisión del sprint) ---
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

// --- Rutas públicas (sin autenticación) ---
app.post('/api/signup', signupValidator, createUser);
app.post('/api/signin', signinValidator, login);

// --- Rutas protegidas (requieren JWT) ---
app.use('/api', auth);
app.use('/api/users', usersRouter);
app.use('/api/cards', cardsRouter);

// --- Logger de errores ---
app.use(errorLogger);

// --- Manejo de rutas inexistentes ---
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// --- Middlewares de errores ---
app.use(errors());
app.use(errorHandler);

// --- Inicio del servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
