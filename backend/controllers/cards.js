const Card = require('../models/card');

const notFound = (msg = 'Tarjeta no encontrada') => {
  const err = new Error(msg);
  err.statusCode = 404;
  return err;
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos de tarjeta no válidos' });
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      const err = new Error('Tarjeta no encontrada');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      // Verificar si el usuario es el propietario de la tarjeta
      if (String(card.owner) !== req.user._id) {
        const err = new Error('No tienes permiso para eliminar esta tarjeta');
        err.statusCode = 403;
        throw err;
      }
      return card.deleteOne();
    })
    .then(() => res.send({ message: 'Tarjeta eliminada'}))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta no válido' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }
      if (err.statusCode === 403) {
        return res.status(403).send({ message: 'No tienes permiso para eliminar esta tarjeta' });
      }
      return next(err);
      });
    };


module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw notFound(); })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta no válido' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw notFound(); })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta no válido' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }
      return next(err);
    });
};
