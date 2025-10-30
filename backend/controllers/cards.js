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
  Card.findByIdAndDelete(req.params.cardId)
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
