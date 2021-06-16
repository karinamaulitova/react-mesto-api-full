const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const {
  findAll,
  findById,
  changeProfile,
  changeAvatar,
  findCurrentUser,
} = require('../controllers/users');

router.get('/users', findAll);
router.get('/users/me', findCurrentUser);
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  changeProfile,
);
router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string(),
    }),
  }),
  changeAvatar,
);
router.get('/users/:id', findById);

module.exports = router;
