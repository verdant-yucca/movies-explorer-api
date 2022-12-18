const moviesRouter = require('express').Router();
const { createMovieValidation, movieIdValidate } = require('../middlewares/validatons');

const {
  createMovie,
  getMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.post('/movies', createMovieValidation, createMovie);
moviesRouter.get('/movies', getMovie);
moviesRouter.delete('/movies/:movieId', movieIdValidate, deleteMovie);

module.exports = moviesRouter;
