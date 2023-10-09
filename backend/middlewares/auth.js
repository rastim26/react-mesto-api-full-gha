const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const {
  NODE_ENV = 'production',
  JWT_SECRET = 'another-secret-key',
} = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) throw new UnauthorizedError('Необходима авторизация11');
  const token = authorization.replace('Bearer ', '');

  // const token = req.cookies.jwt;
  // if (!token) throw new UnauthorizedError('Необходима авторизация');

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    );
  } catch (e) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  console.log(payload);
  req.user = payload;
  next();
};
