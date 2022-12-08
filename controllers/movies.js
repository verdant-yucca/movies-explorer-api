const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  ERROR_TEXT_BED_REQUEST,
  ERROR_TEXT_NOT_FOUND_CARDS,
} = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  const {
    nameRU, nameEN, country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId,
  } = req.body;
  Movie.create({
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_TEXT_BED_REQUEST.message));
      }
      next(err);
    });
};

module.exports.getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie) {
        if (movie.owner.equals(req.user._id)) {
          return Movie.findByIdAndRemove(req.params.movieId)
            .then(() => res.send(movie));
        }
        throw new ForbiddenError('Нельзя удалять чужие фильмы');
      } else {
        throw new NotFoundError(ERROR_TEXT_NOT_FOUND_CARDS.message);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_TEXT_BED_REQUEST.message));
      }
      next(err);
    });
};
