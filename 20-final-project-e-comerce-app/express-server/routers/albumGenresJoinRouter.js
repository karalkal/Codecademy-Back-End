const express = require('express');
const { getAllGenres, getGenreById, createGenre, deleteGenre, updateGenre } = require('../controllers/Genres')

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const genresRouter = express.Router({ mergeParams: true });

genresRouter.get("/", getAllGenres);
genresRouter.get("/:genreId", getGenreById);
genresRouter.post("/", createGenre);
genresRouter.delete("/:genreId", deleteGenre);
genresRouter.put("/:genreId", updateGenre);


module.exports = genresRouter