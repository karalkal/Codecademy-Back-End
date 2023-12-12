const express = require('express');
const { getAllLabels, getLabelById, createLabel, deleteLabel, updateLabel } = require('../controllers/Labels')
const userAuthentication = require('../middleware/userAuthentication');
const adminAuthorization = require('../middleware/adminAuthorization');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const labelsRouter = express.Router({ mergeParams: true });

labelsRouter.get("/", getAllLabels);
labelsRouter.get("/:labelId", getLabelById);
labelsRouter.post("/", userAuthentication, adminAuthorization, createLabel);
labelsRouter.delete("/:labelId", userAuthentication, adminAuthorization, deleteLabel);
labelsRouter.put("/:labelId", userAuthentication, adminAuthorization, updateLabel);


module.exports = labelsRouter