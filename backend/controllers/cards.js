const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const RequestError = require('../errors/request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new RequestError('Переданы некорректные данные при создании карточки'),
        );
      } else {
        next(new Error('Ошибка по умолчанию'));
      }
    });
};

module.exports.findAll = (req, res, next) => {
  Card.find()
    .then((cards) => res.send({ data: cards }))
    .catch(() => next(new Error('Ошибка по умолчанию')));
};

module.exports.deleteById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: currentUserId } = req.user;
  try {
    const card = await Card.findById(id).orFail(new Error('NotFound'));

    if (!card.owner.equals(currentUserId)) {
      next(new ForbiddenError('Доступ запрещен'));
      return;
    }

    await card.remove();
    res.send({ data: card });
  } catch (err) {
    if (err.message === 'NotFound') {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
    } else if (err.name === 'CastError') {
      next(
        new RequestError('Переданы некорректные данные при удалении карточки'),
      );
    } else {
      next(new Error('Ошибка по умолчанию'));
    }
  }
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      } else if (err.name === 'CastError') {
        next(
          new RequestError('Переданы некорректные данные для постановки лайка'),
        );
      } else {
        next(new Error('Ошибка по умолчанию'));
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      } else if (err.name === 'CastError') {
        next(new RequestError('Переданы некорректные данные для снятия лайка'));
      } else {
        next(new Error('Ошибка по умолчанию'));
      }
    });
};
