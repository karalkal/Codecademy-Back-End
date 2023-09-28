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
    console.log(req.allJobs)
    const minionID = req.params.minionId;
    const workId = req.params.id
    // let allJobs = getAllFromDatabase('work');
    // const thisMinionsJobs = allJobs.filter(j => j.minionId === minionID)

    // console.log(allJobsminionID, workId, thisMinionsJobs)
    // if (idFromBody !== workId) {
    //     res.status(400).send("")
    // }
    // else {
    //     next()
    // }
}

module.exports = {
    checkMillionDollarIdea,
    checkReqBodyAndParamIDsMatch,
    confirmWorkIdInMinionsArray
};
