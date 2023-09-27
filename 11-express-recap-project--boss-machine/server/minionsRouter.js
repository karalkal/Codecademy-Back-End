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

let minions = getAllFromDatabase('minions')
let nextOnesIDWillBe = 11

minionsRouter.param("minionId", (req, res, next, id) => {
    const idToFind = id;        // not a number in this bloody DB
    const foundItem = minions.find(mn => mn.id === idToFind);
    console.log("found:", foundItem)
    if (foundItem) {
        req.foundItem = foundItem;
        next()

    } else {
        res.status(404).send("Not Found.");
    }
})


minionsRouter.get("/", (req, res, next) => {
    let minions = getAllFromDatabase('minions')
    res.status(200).send(minions)
})

minionsRouter.post("/", (req, res, next) => {
    const newMinion = {
        id: nextOnesIDWillBe.toString(),  // default ids starting from 1, and yes it is a string
        ...req.body,
    }
    addToDatabase("minions", newMinion);
    nextOnesIDWillBe++
    res.status(201).send(newMinion)
})


minionsRouter.get('/:minionId', (req, res, next) => {
    res.status(200).send(req.foundItem);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    console.log("found", req.foundItem)
    deleteFromDatabasebyId("minions", req.foundItem.id)
    res.status(204).send("");
});


module.exports = minionsRouter