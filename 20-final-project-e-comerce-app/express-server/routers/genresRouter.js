const express = require('express');
const { getAllGenres, getGenreById, createGenre, deleteGenre, updateGenre } = require('../controllers/Genres')
const userAuthentication = require('../middleware/userAuthentication');
const adminAuthorization = require('../middleware/adminAuthorization');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const genresRouter = express.Router({ mergeParams: true });

genresRouter.get("/", getAllGenres);
genresRouter.get("/:genreId", getGenreById);
genresRouter.post("/", userAuthentication, adminAuthorization, createGenre);
genresRouter.delete("/:genreId", userAuthentication, adminAuthorization, deleteGenre);
genresRouter.put("/:genreId", userAuthentication, adminAuthorization, updateGenre);


module.exports = genresRouter