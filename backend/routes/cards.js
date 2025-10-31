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

router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:cardId', cardIdParamValidator, deleteCard);

router.put('/:cardId/likes', cardIdParamValidator, likeCard);
router.delete('/:cardId/likes', cardIdParamValidator, dislikeCard);


module.exports = router;
