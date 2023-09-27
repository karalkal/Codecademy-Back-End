const express = require('express');

const meetingsRouter = require('./meetingsRouter.js')

const apiRouter = express.Router();

// you can nest routers by attaching them as middleware:
apiRouter.use("/meetings", meetingsRouter);




module.exports = apiRouter;
