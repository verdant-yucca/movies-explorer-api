const usersRouter = require('express').Router();
const {
  updateUserValidation,
} = require('../middlewares/validatons');

const {
  updateUser,
  getMe,
} = require('../controllers/users');

usersRouter.get('/users/me', getMe);
usersRouter.patch('/users/me', updateUserValidation, updateUser);

module.exports = usersRouter;
