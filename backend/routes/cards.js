const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const {
  createCard,
  findAll,
  deleteById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const linkValidator = require('../utils/linkValidator');

router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(linkValidator, 'custom URL validation'),
    }),
  }),
  createCard,
);
router.get('/cards', findAll);
router.delete(
  '/cards/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),
  deleteById,
);
router.put(
  '/cards/likes/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),
  likeCard,
);
router.delete('/cards/likes/:id', celebrate({

  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), dislikeCard);

module.exports = router;
