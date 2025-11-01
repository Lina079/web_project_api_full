const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidator,
  cardIdParamValidator,
} = require('../middlewares/validators');

// GET: obtiene todas las tarjetas
router.get('/', getCards);
// POST: crea una nueva tarjeta
router.post('/', createCardValidator, createCard);
// DELETE: elimina una tarjeta por su ID
router.delete('/:cardId', cardIdParamValidator, deleteCard);

//PUT/DELETE: dar o quitar like a una tarjeta
router.put('/:cardId/likes', cardIdParamValidator, likeCard);
router.delete('/:cardId/likes', cardIdParamValidator, dislikeCard);


module.exports = router;
