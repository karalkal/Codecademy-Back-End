const express = require('express');

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db")

const { checkMillionDollarIdea } = require('./validators')

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const ideasRouter = express.Router({ mergeParams: true });

let ideas = getAllFromDatabase('ideas')
let nextIdWillBe = ideas.length + 1

ideasRouter.param("ideaId", (req, res, next, id) => {
    /* // Turned out we actually have a function to do this for us 
    *  const idToFind = id;        // not a number in this bloody DB
    *  const foundItem = ideas.find(mn => mn.id === idToFind);
    */
    const foundItem = getFromDatabaseById("ideas", id)

    if (foundItem) {
        req.foundItem = foundItem;
        next()

    } else {
        res.status(404).send("Not Found.");
    }
});


ideasRouter.get("/", (req, res, next) => {
    let ideas = getAllFromDatabase('ideas')
    res.status(200).send(ideas)
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
    const newIdea = {
        id: nextIdWillBe.toString(),  // default ids starting from 1, and yes it is a string
        ...req.body,
    }
    addToDatabase("ideas", newIdea);
    nextIdWillBe++
    res.status(201).send(newIdea)
});


ideasRouter.get('/:ideaId', (req, res, next) => {
    res.status(200).send(req.foundItem);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
    const updatedIdea = {
        id: req.foundItem.id,
        ...req.body,
    }
    updateInstanceInDatabase("ideas", updatedIdea);
    res.status(200).send(updatedIdea)
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    deleteFromDatabasebyId("ideas", req.foundItem.id)
    res.status(204).send("");
});


module.exports = ideasRouter