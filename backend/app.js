const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { createUser, login } = require('./controllers/users');
const routes = require('./routes');
const { signupValidator, signinValidator } = require('./middlewares/validators');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const cors = require('cors');
app.use(cors());
app.options('*', cors());

//conexion a MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb')
.then(() => console.log('Conectado a aroundb'))
.catch((err) => {
console.error('Error de conexión a MongoDB:', err.message);
process.exit(1);
});

// Logger de solicitudes
app.use(requestLogger);

//Ruta de prueba para forzar caída del servidor (solo para revisión)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

// Rutas publicas (sin autenticación)
app.post('/signup', signupValidator, createUser);
app.post('/signin', signinValidator ,login);

// desde aqui todos requieren autenticación
app.use(auth);

// privadas
app.use(routes);


// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middlewares de manejo de errores
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
