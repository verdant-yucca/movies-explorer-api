const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { secretKey } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Сессия истекла. Повторите авторизацию.');
  }
  let payload;
  try {
    payload = jwt.verify(authorization.replace('Bearer ', ''), NODE_ENV === 'production' ? JWT_SECRET : secretKey);
  } catch (err) {
    next(new UnauthorizedError('Сессия истекла. Повторите авторизацию.'));
    return;
  }
  req.user = payload;
  next();
};
