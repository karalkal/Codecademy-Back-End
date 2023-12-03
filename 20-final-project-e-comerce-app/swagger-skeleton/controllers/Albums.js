'use strict';

var utils = require('../utils/writer.js');
var Albums = require('../service/AlbumsService');

module.exports.addAlbum = function addAlbum (req, res, next, body) {
  Albums.addAlbum(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addAlbum = function addAlbum (req, res, next, body) {
  Albums.addAlbum(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteAlbum = function deleteAlbum (req, res, next, albumId) {
  Albums.deleteAlbum(albumId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAlbumById = function getAlbumById (req, res, next, albumId) {
  Albums.getAlbumById(albumId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAlbums = function getAlbums (req, res, next) {
  Albums.getAlbums()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateAlbumWithForm = function updateAlbumWithForm (req, res, next, albumId) {
  Albums.updateAlbumWithForm(albumId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
