const express = require('express');
const { getAllAlbumGenres, getAlbumGenreById } = require('../controllers/JoinAlbumGenre')

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const joinAlbumsGenresRouter = express.Router({ mergeParams: true });

joinAlbumsGenresRouter.get("/", getAllAlbumGenres);
joinAlbumsGenresRouter.get("/:albumId/:genreId", getAlbumGenreById);
// joinAlbumsGenresRouter.post("/", createGenre);
// joinAlbumsGenresRouter.delete("/:genreId", deleteGenre);
// joinAlbumsGenresRouter.put("/:genreId", updateGenre);


module.exports = joinAlbumsGenresRouter