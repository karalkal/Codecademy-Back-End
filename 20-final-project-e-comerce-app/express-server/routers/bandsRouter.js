const express = require('express');
const { getAllBands, getBandById, createBand, deleteBand, updateBand } = require('../controllers/Bands')

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const bandsRouter = express.Router({ mergeParams: true });

bandsRouter.get("/", getAllBands);
bandsRouter.get("/:bandId", getBandById);
bandsRouter.post("/", createBand);
bandsRouter.delete("/:bandId", deleteBand);
bandsRouter.put("/:bandId", updateBand);


module.exports = bandsRouter