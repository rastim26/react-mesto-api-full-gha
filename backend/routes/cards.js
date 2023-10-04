const router = require('express').Router();
const {
  getCards, createCard, deleteCard,
  likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateCardFields, validateCardId } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validateCardFields, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
