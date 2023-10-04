const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) throw new UnauthorizedError('Необходима авторизация');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
