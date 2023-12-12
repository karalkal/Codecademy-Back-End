const express = require('express');
const { getAllAlbums, getAlbumById, createAlbum, deleteAlbum, updateAlbum } = require('../controllers/Albums');
const userAuthentication = require('../middleware/userAuthentication');
const adminAuthorization = require('../middleware/adminAuthorization');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const albumsRouter = express.Router({ mergeParams: true });

albumsRouter.get("/", getAllAlbums);
albumsRouter.get("/:albumId", getAlbumById);
albumsRouter.post("/", userAuthentication, adminAuthorization, createAlbum);
albumsRouter.delete("/:albumId", userAuthentication, adminAuthorization, deleteAlbum);
albumsRouter.put("/:albumId", userAuthentication, adminAuthorization, updateAlbum);


module.exports = albumsRouter