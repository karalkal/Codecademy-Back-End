const express = require('express');

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db")

const minionsWorkRouter = express.Router({ mergeParams: true });
/*
Work:
    id: string
    title: string
    description: string
    hours: number
    minionId: string
*/

let jobs = getAllFromDatabase('work')
let nextIdWillBe = jobs.length + 1


minionsWorkRouter.param("workId", (req, res, next, id) => {
    console.log("PARAM:", req.params)

    // const idToFind = id;        // not a number in this bloody DB
    // const foundItem = jobs.find(j => j.id === idToFind);

    // if (foundItem) {
    //     req.foundItem = foundItem;
    //     next()

    // } else {
    //     res.status(404).send("Not Found.");
    // }
});


minionsWorkRouter.get("/", (req, res, next) => {
    // const { minionId } = req.params;
    const searchedID = req.params.minionId;
    let allJobs = getAllFromDatabase('work');
    const thisGuysJobs = allJobs.filter(j => j.minionId === searchedID)
    res.status(200).send(thisGuysJobs)
});

minionsWorkRouter.post("/", (req, res, next) => {
    const { minionId } = req.params;
    const newWork = {
        id: nextIdWillBe.toString(),  // default ids starting from 1, and yes it is a string
        ...req.body,
        minionId,
    }
    addToDatabase("work", newWork);
    nextIdWillBe++
    res.status(201).send(newWork)
});


minionsWorkRouter.get('/:workId', (req, res, next) => {
    res.status(200).send(req.foundItem);
});

minionsWorkRouter.put("/:workId", (req, res, next) => {
    const updatedWork = {
        id: req.foundItem.id,
        ...req.body,
    }
    updateInstanceInDatabase("work", updatedWork);
    res.status(200).send(updatedWork)
});

minionsWorkRouter.delete('/:workId', (req, res, next) => {
    deleteFromDatabasebyId("work", req.foundItem.id)
    res.status(204).send("");
});


module.exports = minionsWorkRouter