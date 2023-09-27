const express = require('express');

const minionsWorkRouter = require('./minionsWorkRouter');

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db")

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const minionsRouter = express.Router({ mergeParams: true });

let minions = getAllFromDatabase('minions')
let nextIdWillBe = minions.length + 1

minionsRouter.param("minionId", (req, res, next, id) => {
    const idToFind = id;        // not a number in this bloody DB
    const foundItem = minions.find(mn => mn.id === idToFind);
    // can also use 
    // const foundItem = getFromDatabaseById("minions", id)

    if (foundItem) {
        req.foundItem = foundItem;
        next()

    } else {
        res.status(404).send("Not Found.");
    }
});

// if /work in route, use minionsWorkRouter
minionsRouter.use("/:minionId/work", minionsWorkRouter);


minionsRouter.get("/", (req, res, next) => {
    let minions = getAllFromDatabase('minions')
    res.status(200).send(minions)
});

minionsRouter.post("/", (req, res, next) => {
    const newMinion = {
        id: nextIdWillBe.toString(),  // default ids starting from 1, and yes it is a string
        ...req.body,
    }
    addToDatabase("minions", newMinion);
    nextIdWillBe++
    res.status(201).send(newMinion)
});


minionsRouter.get('/:minionId', (req, res, next) => {
    res.status(200).send(req.foundItem);
});

minionsRouter.put("/:minionId", (req, res, next) => {
    const updatedMinion = {
        id: req.foundItem.id,
        ...req.body,
    }
    updateInstanceInDatabase("minions", updatedMinion);
    res.status(200).send(updatedMinion)
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    deleteFromDatabasebyId("minions", req.foundItem.id)
    res.status(204).send("");
});


module.exports = minionsRouter