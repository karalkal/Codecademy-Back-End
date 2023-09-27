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
const meetingsRouter = express.Router({ mergeParams: true });

meetingsRouter.get("/", (req, res, next) => {
    let meetings = getAllFromDatabase('meetings')
    res.status(200).send(meetings)
})

meetingsRouter.post("/", (req, res, next) => {
    let meeting = createMeeting()
    res.status(201).send(meeting)
})

meetingsRouter.delete("/", (req, res, next) => {
    deleteAllFromDatabase("meetings")
    res.status(204).send("")
})

module.exports = meetingsRouter