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

// Leave this exports assignment so that the function can be used elsewhere
module.exports = { checkMillionDollarIdea };
