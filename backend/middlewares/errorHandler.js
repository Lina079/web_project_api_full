module.exports = (err, req, res, next) => {
 const statusCode = err.statusCode || 500;

  let message = err.message || 'Error interno del servidor';

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Datos no válidos'
    });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID no válido'
    });
  }
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Conflicto: registro duplicado'
    });
  }

  if (statusCode === 500) {
    message = 'Error interno del servidor';
    console.error('[Unhandled Error]', err);
  }
  return res.status(statusCode).json({ message });
};
