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


minionsWorkRouter.get("/", (req, res, next) => {
    // const { minionId } = req.params;
    const searchedID = req.params.minionId;
    let allJobs = getAllFromDatabase('work');
    const thisGuysJobs = allJobs.filter(j => j.minionId === searchedID)
    res.status(200).send(thisGuysJobs)
});

minionsWorkRouter.post("/", (req, res, next) => {
    const { minionId } = req.params;        // we have this in req.body too
    console.log("CREATE body", req.body)
    const newWork = {
        id: nextIdWillBe.toString(),  // default ids starting from 1, and yes it is a string
        ...req.body,
        minionId,
    }
    addToDatabase("work", newWork);
    nextIdWillBe++
    res.status(201).send(newWork)
});

minionsWorkRouter.put("/:workId", (req, res, next) => {
    console.log(req.params, "UPDATE body", req.body)
    const updatedWork = {
        ...req.body,
    }
    console.log(updatedWork)
    updateInstanceInDatabase("work", updatedWork);
    res.status(200).send(updatedWork)
});

minionsWorkRouter.delete('/:workId', (req, res, next) => {
    deleteFromDatabasebyId("work", req.foundItem.id)
    res.status(204).send("");
});


module.exports = minionsWorkRouter