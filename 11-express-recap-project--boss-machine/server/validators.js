const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    if (!numWeeks || !weeklyRevenue
        || isNaN(Number(numWeeks)) || isNaN(Number(weeklyRevenue))
        || Number(numWeeks) * Number(weeklyRevenue) < 1000 * 1000
    ) {
        res.status(400).send("")
    }
    else {
        next()
    }
};

const checkReqBodyAndParamIDsMatch = (req, res, next) => {
    const idFromBody = req.body.minionId;
    const idFromParams = req.params.minionId
    if (idFromBody !== idFromParams) {
        res.status(400).send("")
    }
    else {
        next()
    }
}

const confirmWorkIdInMinionsArray = (req, res, next) => {
    // get guys's array of jobs
    const minionID = req.params.minionId;
    const idsOfJobsOfMinion = req.allJobs
        .filter(j => j.minionId === minionID)
        .map(job => job.id)
    // check if job with this id is in the array
    const workId = req.params.workId
    if (!idsOfJobsOfMinion.includes(workId)) {
        res.status(400).send("")
    }
    else {
        next()
    }
}

module.exports = {
    checkMillionDollarIdea,
    checkReqBodyAndParamIDsMatch,
    confirmWorkIdInMinionsArray
};
