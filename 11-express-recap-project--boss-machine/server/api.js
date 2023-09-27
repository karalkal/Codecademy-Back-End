const express = require('express');

const meetingsRouter = require('./meetingsRouter.js')
const minionsRouter = require('./minionsRouter.js')
const ideasRouter = require('./ideasRouter.js')

const apiRouter = express.Router();

// you can nest routers by attaching them as middleware:
apiRouter.use("/meetings", meetingsRouter);
apiRouter.use("/minions", minionsRouter);
apiRouter.use("/ideas", ideasRouter);


module.exports = apiRouter;
