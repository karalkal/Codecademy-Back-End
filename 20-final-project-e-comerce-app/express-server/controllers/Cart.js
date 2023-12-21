const { StatusCodes } = require('http-status-codes')
const { pool } = require('../db/connect')

const { createInsertQuery, createDeleteQuery, createUpdateQuery } = require('../utils-validators/queryCreators')
const { idIntegerValidator, verifyNonNullableFields } = require('../utils-validators/validators')
const { createCustomError } = require('../errors/custom-error')


const getCartByUserId = (req, res, next) => {
    const { userId } = req.params
    const idIsInteger = idIntegerValidator(userId);
    if (!idIsInteger) {
        return next(createCustomError('User id must be positive integer', StatusCodes.BAD_REQUEST));
    }
    // middleware creates req.user
    // only admins and the user themself can access this route
    if (Number(userId) !== req.user.userId && !req.user.is_admin) {
        return next(createCustomError('You ain\'t gonna go there', StatusCodes.BAD_REQUEST));
    }

    pool.query(`SELECT cart.id as "Cart ID",
    album.id as "Album ID", album.name as "Album Name", album.band_name as "Band Name", 
    album.quantity as "Quantity", album.price as "Price",
    db_user.id as "User ID", db_user.email as "User email"
    from cart
    JOIN album ON cart.album_id = album.id
    JOIN db_user on cart.user_id = db_user.id
    WHERE cart.user_id = ${userId};`, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        if (typeof results.rowCount !== 'undefined' && results.rowCount < 1) {            // create error object ---> go to next middleware, eventually errorHandler
            return next(createCustomError(`No data related to user ${userId} found`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.OK).json(results.rows)
    })
}

const createCart = async (req, res, next) => {
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

const deleteCart = (req, res, next) => {
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

const updateCart = async (req, res, next) => {
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


module.exports = { getCartByUserId, createCart, deleteCart, updateCart }