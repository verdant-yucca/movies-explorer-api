const { ERROR_CODE_INTERNAL_SERVER, ERROR_TEXT_INTERNAL_SERVER } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_INTERNAL_SERVER, message } = err;
  res.status(statusCode).send({
    message: statusCode === ERROR_CODE_INTERNAL_SERVER
      ? ERROR_TEXT_INTERNAL_SERVER.message
      : message,
  });
  next();
};
