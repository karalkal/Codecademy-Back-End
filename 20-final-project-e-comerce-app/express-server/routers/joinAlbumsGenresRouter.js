const express = require('express');
const { getAllAlbumGenres, getAlbumGenreById, createAlbumGenre, deleteAlbumGenre } = require('../controllers/JoinAlbumGenre')

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const joinAlbumsGenresRouter = express.Router({ mergeParams: true });

joinAlbumsGenresRouter.get("/", getAllAlbumGenres);
joinAlbumsGenresRouter.get("/:albumId/:genreId", getAlbumGenreById);
joinAlbumsGenresRouter.post("/", createAlbumGenre);
joinAlbumsGenresRouter.delete("/:albumId/:genreId", deleteAlbumGenre);
// updating this table is an overkill, makes more sense to delete and then re-create

module.exports = joinAlbumsGenresRouter