const express = require('express');
const { getAllAlbums, getAlbumById, createAlbum, deleteAlbum } = require('../controllers/Albums')

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const albumsRouter = express.Router({ mergeParams: true });

albumsRouter.get("/", getAllAlbums);
albumsRouter.get("/:albumId", getAlbumById);
albumsRouter.post("/", createAlbum);
albumsRouter.delete("/:albumId", deleteAlbum);


module.exports = albumsRouter