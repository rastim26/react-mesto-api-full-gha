const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) throw new UnauthorizedError('Необходима авторизация11');
  const token = authorization.replace('Bearer ', '');

  // const token = req.cookies.jwt;
  // if (!token) throw new UnauthorizedError('Необходима авторизация');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
