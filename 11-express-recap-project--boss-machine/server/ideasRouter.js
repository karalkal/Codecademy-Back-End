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
const ideasRouter = express.Router({ mergeParams: true });

ideasRouter.get('/:minionId', (req, res, next) => {
    // Get a single minion based on the minionId that's passed in to the getFromDatabase function
    const getMinion = getFromDatabaseById('minions', req.params.minionId);
    //If getFromDatabase returns false, ie if there's an invalid id, send a 404 response 
    if (!getMinion) {
        res.status(404).send("Not found");
    }
    // Otherwise, send back the minion that was requested 
    res.status(200).send(getMinion);

});

ideasRouter.get("/", (req, res, next) => {
    let ideas = getAllFromDatabase('ideas')
    console.log(ideas)
    res.status(200).send(ideas)
})

ideasRouter.post("/", (req, res, next) => {
    res.status(201).send(idea)
})


module.exports = ideasRouter