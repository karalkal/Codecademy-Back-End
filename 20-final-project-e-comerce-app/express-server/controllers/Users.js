const { StatusCodes } = require('http-status-codes')
const { pool } = require('../db/connect')
const { createInsertQuery, createDeleteQuery, createUpdateQuery } = require('../utils-validators/queryCreators')
const { idIntegerValidator, verifyNonNullableFields } = require('../utils-validators/validators')
const { createCustomError } = require('../errors/custom-error')


const getAllUsers = (req, res, next) => {
    pool.query('SELECT * FROM db_user ORDER BY id ASC', (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        res.status(StatusCodes.OK).json(results.rows)
    })
}

const getUserById = (req, res, next) => {
    const { userId } = req.params
    const idIsInteger = idIntegerValidator(userId);
    if (!idIsInteger) {
        return next(createCustomError('User id must be positive integer', StatusCodes.BAD_REQUEST));
    }

    pool.query(`SELECT * FROM db_user WHERE db_user.id = ${userId}`, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }        
        if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {            // create error object ---> go to next middleware, eventually errorHandler
            return next(createCustomError(`No user with id ${userId} found`, StatusCodes.NOT_FOUND))
        }

        res.status(StatusCodes.OK).json(results.rows[0])
    })
}

const createUser = (req, res, next) => {
    const userData = req.body

    // These cannot be NULL, validation will be carried out in FE beforehand anyway
    const undefinedProperty = verifyNonNullableFields("user", userData);
    if (undefinedProperty) {
        return next(createCustomError(`Cannot create: essential data missing - ${undefinedProperty}`, StatusCodes.BAD_REQUEST));
    }

    // If containing minimum required data
    const insertQuery = createInsertQuery("user", userData)

    pool.query(insertQuery, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        // Not sure if we can get any different but just in case -> rowCount: 1 if item is notFound, otherwise 0
        if (results.rowCount && results.rowCount !== 1) {
            return next(createCustomError(`Could not create user`, StatusCodes.BAD_REQUEST))
        }
        res.status(StatusCodes.CREATED).json(results.rows[0])
    })
}

const deleteUser = (req, res, next) => {
    const { userId } = req.params
    const idIsInteger = idIntegerValidator(userId);
    if (!idIsInteger) {
        return next(createCustomError('User id must be positive integer', StatusCodes.BAD_REQUEST));
    }
    const deleteQuery = createDeleteQuery("user", userId)

    pool.query(deleteQuery, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {
            return next(createCustomError(`No user with id ${userId} found`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.NO_CONTENT).send()
    })
}

const updateUser = (req, res, next) => {
    const { userId } = req.params;
    const updatedUserData = req.body;

    const idIsInteger = idIntegerValidator(userId);
    if (!idIsInteger) {
        return next(createCustomError('User id must be positive integer', StatusCodes.BAD_REQUEST));
    }
    const undefinedProperty = verifyNonNullableFields("user", updatedUserData);
    if (undefinedProperty) {
        return next(createCustomError(`Cannot update: essential data missing - ${undefinedProperty}`, StatusCodes.BAD_REQUEST));
    }

    const updateQuery = createUpdateQuery("user", userId, updatedUserData);

    pool.query(updateQuery, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {
            return next(createCustomError(`No user with id ${userId} found`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.OK).json(results.rows)
    })
}


module.exports = { getAllUsers, getUserById, createUser, deleteUser, updateUser }