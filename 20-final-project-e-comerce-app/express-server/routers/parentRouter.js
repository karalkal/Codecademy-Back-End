const express = require('express');

const albumsRouter = require('./albumsRouter.js');
const bandsRouter = require('./bandsRouter.js');

const apiRouter = express.Router();

// you can nest routers by attaching them as middleware:
apiRouter.use("/bands", bandsRouter);
apiRouter.use("/albums", albumsRouter);


module.exports = apiRouter;
