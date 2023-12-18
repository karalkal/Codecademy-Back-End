const { StatusCodes } = require('http-status-codes')
const { pool } = require('../db/connect')
const bcrypt = require('bcryptjs')

const { createInsertQuery, createDeleteQuery, createUpdateQuery } = require('../utils-validators/queryCreators')
const { idIntegerValidator, verifyNonNullableFields } = require('../utils-validators/validators')
const { createCustomError } = require('../errors/custom-error')


const getAllOrders = (req, res, next) => {
    pool.query('SELECT * FROM purchase ORDER BY id ASC', (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        res.status(StatusCodes.OK).json(results.rows)
    })
}

const getOrderById = (req, res, next) => {
    const { orderId } = req.params
    const idIsInteger = idIntegerValidator(orderId);
    if (!idIsInteger) {
        return next(createCustomError('Order id must be positive integer', StatusCodes.BAD_REQUEST));
    }

    pool.query(`SELECT * FROM purchase WHERE purchase.id = ${orderId}`, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {            // create error object ---> go to next middleware, eventually errorHandler
            return next(createCustomError(`No order with id ${orderId} found`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.OK).json(results.rows[0])
    })
}

const createOrder = async (req, res, next) => {
    const orderData = req.body
    // Validations
    const undefinedProperty = verifyNonNullableFields("order", orderData);
    if (undefinedProperty) {
        return next(createCustomError(`Cannot create: essential data missing - ${undefinedProperty}`, StatusCodes.BAD_REQUEST));
    }

    const insertQuery = createInsertQuery("purchase", orderData)

    pool.query(insertQuery, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        // Not sure if we can get any different but just in case -> rowCount: 1 if item is notFound, otherwise 0
        if (results.rowCount && results.rowCount !== 1) {
            return next(createCustomError(`Could not create user`, StatusCodes.BAD_REQUEST))
        }
        // If all is good
        res.status(StatusCodes.CREATED).json(results.rows)
    })
}

const deleteOrder = (req, res, next) => {
    const { orderId } = req.params
    const idIsInteger = idIntegerValidator(orderId);
    if (!idIsInteger) {
        return next(createCustomError('Order id must be positive integer', StatusCodes.BAD_REQUEST));
    }
    const deleteQuery = createDeleteQuery("purchase", orderId)

    pool.query(deleteQuery, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {
            return next(createCustomError(`No order with id ${orderId} found`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.NO_CONTENT).send()
    })
}

const updateOrder = async (req, res, next) => {
    const { orderId } = req.params;
    const updatedOrderData = req.body;

    const idIsInteger = idIntegerValidator(orderId);
    if (!idIsInteger) {
        return next(createCustomError('User id must be positive integer', StatusCodes.BAD_REQUEST));
    }
    const undefinedProperty = verifyNonNullableFields("purchase", updatedOrderData);
    if (undefinedProperty) {
        return next(createCustomError(`Cannot update: essential data missing - ${undefinedProperty}`, StatusCodes.BAD_REQUEST));
    }
    
    const updateQuery = createUpdateQuery("purchase", orderId, updatedOrderData);

    pool.query(updateQuery, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {
            return next(createCustomError(`No order with id ${orderId} found`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.OK).json(results.rows)
    })
}


module.exports = { getAllOrders, getOrderById, createOrder, deleteOrder, updateOrder }
