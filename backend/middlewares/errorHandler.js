module.exports = (err, req, res, next) => {
 const { statusCode = 500, message } = err;

  if (err.name === 'ValidationError') {
    return res.status(400)
    .send({ message: 'Datos no válidos' });
  }
  if (err.name === 'CastError') {
    return res.status(400)
    .send({ message: 'ID no válido' });
  }
  if (err.code === 11000) {
    return res.status(409)
    .send({ message: 'El email ya está registrado'
    });
  }

  return res
  .status(statusCode)
  .send({
    message: statusCode === 500
      ? 'Ha ocurrido un error en el servidor'
      : message,
  });
};
