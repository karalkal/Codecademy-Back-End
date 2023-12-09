const express = require('express');

const albumsRouter = require('./albumsRouter.js');
const bandsRouter = require('./bandsRouter.js');
const labelsRouter = require('./labelsRouter.js');
const genresRouter = require('./genresRouter.js');
const joinAlbumsGenresRouter = require('./joinAlbumsGenresRouter.js');

const apiRouter = express.Router();

// you can nest routers by attaching them as middleware:
apiRouter.use("/bands", bandsRouter);
apiRouter.use("/labels", labelsRouter);
apiRouter.use("/albums", albumsRouter);
apiRouter.use("/genres", genresRouter);
apiRouter.use("/join_genres_albums", joinAlbumsGenresRouter);


module.exports = apiRouter;
