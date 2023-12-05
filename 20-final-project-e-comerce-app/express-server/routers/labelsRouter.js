const express = require('express');
const { getAllLabels, getLabelById, createLabel, deleteLabel, updateLabel } = require('../controllers/Labels')

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const labelsRouter = express.Router({ mergeParams: true });

labelsRouter.get("/", getAllLabels);
labelsRouter.get("/:labelId", getLabelById);
labelsRouter.post("/", createLabel);
labelsRouter.delete("/:labelId", deleteLabel);
labelsRouter.put("/:labelId", updateLabel);


module.exports = labelsRouter