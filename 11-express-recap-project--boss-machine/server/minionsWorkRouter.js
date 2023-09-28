const express = require('express');

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db")

const { checkReqBodyAndParamIDsMatch, confirmWorkIdInMinionsArray } = require("./validators")

const minionsWorkRouter = express.Router({ mergeParams: true });
/*
Work:
    id: string
    title: string
    description: string
    hours: number
    minionId: string
*/

let allJobs = getAllFromDatabase('work')
let nextIdWillBe = allJobs.length + 1
// attach all jobs to req, so it is accessible to all routes
// next() IS CRUCIAL HERE
minionsWorkRouter.use(["/", "/:workId"], (req, res, next) => {
    req.allJobs = allJobs
    next()
});


minionsWorkRouter.get("/", (req, res, next) => {
    // const { minionId } = req.params;
    const searchedID = req.params.minionId;
    let allJobs = req.allJobs;
    const thisGuysJobs = allJobs.filter(j => j.minionId === searchedID)
    res.status(200).send(thisGuysJobs)
});

minionsWorkRouter.post("/", checkReqBodyAndParamIDsMatch, (req, res, next) => {
    const { minionId } = req.params;        // Have this in req.body too, compare and validate just in case??
    // console.log("CREATE body", req.body)
    const newWork = {
        id: nextIdWillBe.toString(),  // default ids starting from 1, and yes it is a string
        ...req.body,
        minionId,
    }
    addToDatabase("work", newWork);
    nextIdWillBe++
    res.status(201).send(newWork)
});

minionsWorkRouter.put("/:workId", checkReqBodyAndParamIDsMatch, (req, res, next) => {
    // params are { minionId: '10', workId: '11' }
    // console.log("UPDATE body", req.body)
    const updatedWork = {
        ...req.body,
    }
    console.log(updatedWork)
    updateInstanceInDatabase("work", updatedWork);
    res.status(200).send(updatedWork)
});

minionsWorkRouter.delete('/:workId', confirmWorkIdInMinionsArray, (req, res, next) => {
    deleteFromDatabasebyId("work", req.params.workId)
    res.status(204).send("");
});


module.exports = minionsWorkRouter