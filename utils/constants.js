exports.secretKey = 'salt-salt-salt';

exports.ERROR_BED_REQUEST = {
  code: 400,
  message: 'Переданы некорректные данные',
};
exports.ERROR_UNUTHORIZES = {
  code: 401,
  message: 'Неправильные почта или пароль',
};
exports.ERROR_FORBIDDEN = {
  code: 403,
  message: 'Нельзя удалять чужие фильмы',
};
exports.ERROR_NOT_FOUND = {
  code: 404,
  message_users: 'Данный пользователь не существует',
  message_cards: 'Данная карточка не существует',
};
exports.ERROR_INTERNAL_SERVER = {
  code: 500,
  message: 'Ошибка сервера',
};
exports.ERROR_CONFLICT = {
  code: 11000,
  message: 'Пользователь с данным email уже существует',
};
