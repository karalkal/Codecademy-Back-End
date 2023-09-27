const express = require('express');

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require("./db")

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const minionsRouter = express.Router({ mergeParams: true });

minionsRouter.get('/:minionId', (req, res, next) => {
    // Get a single minion based on the minionId that's passed in to the getFromDatabase function
    const getMinion = getFromDatabaseById('minions', req.params.minionId);
    //If getFromDatabase returns false, ie if there's an invalid id, send a 404 response 
    if (!getMinion) {
        res.status(404).send("Not found");
    }
    // Otherwise, send back the minion that was requested 
    res.status(200).send(getMinion);

});

minionsRouter.get("/", (req, res, next) => {
    let minions = getAllFromDatabase('minions')
    res.status(200).send(minions)
})

minionsRouter.post("/", (req, res, next) => {
    let minion = createMeeting()
    res.status(201).send(minion)
})

minionsRouter.delete("/", (req, res, next) => {
    deleteAllFromDatabase("meetings")
    res.status(204).send("")
})

module.exports = minionsRouter