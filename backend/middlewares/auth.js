const jwtLib = require('jsonwebtoken');
const UnuathorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    next(new UnuathorizedError('Необходима авторизация'));
    return;
  }

  let payload;
  try {
    payload = jwtLib.verify(jwt, 'Mucho secret');
  } catch (err) {
    next(new UnuathorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
