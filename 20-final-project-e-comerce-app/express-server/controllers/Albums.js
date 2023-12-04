const { StatusCodes } = require('http-status-codes')
const { pool, client } = require('../db/connect')
const { createCustomError } = require('../errors/custom-error')


const getAllAlbums = (req, res) => {
    pool.query('SELECT id, name, band_name, cover, release_year, colour, price FROM album ORDER BY id ASC', (error, results) => {
        res.status(StatusCodes.OK).json(results.rows)
    })
}

const getAlbumById = (req, res, next) => {
    const { albumId } = req.params
    // check if id is invalid format
    if (!Number.isInteger(Number(albumId)) || Number(albumId) <= 0) {
        return next(createCustomError('Album id must be positive integer', StatusCodes.BAD_REQUEST))
    }
    pool.query(`SELECT * FROM album WHERE id=${albumId}`, (error, results) => {
        if (!results || results.rowCount !== 1) {       // ensure it returns only one entry, just in case
            // create error object ---> go to next middleware, eventually errorHandler
            return next(createCustomError(`No album with id ${albumId}`, StatusCodes.NOT_FOUND))
        }

        res.status(StatusCodes.OK).json(results.rows[0])
    })
}

const createAlbum = (req, res, next) => {
    const albumData = req.body
    // These cannot be NULL, validation will be carried out in FE beforehand anyway
    if (!albumData.name || !albumData.cover || !albumData.release_year || !albumData.band_name || !albumData.label_name) {
        return next(createCustomError('Cannot create - essential data missing', StatusCodes.BAD_REQUEST))
    }
    // If containing minimum required data
    const insertQuery = createInsertQuery("album", albumData)

    pool.query(insertQuery, (error, results) => {
        if (error) {
            if (error.code = '23505') {  // code: '23505', detail: 'Key (cover)=(test) already exists.'
                return next(createCustomError(error.detail, StatusCodes.BAD_REQUEST))
            }   // if another type of error just throw
            throw error
        }
        if (!results || results.rowCount !== 1) { throw error }     // ensure it creates only one entry, just in case
        res.status(StatusCodes.CREATED).json(results.rows[0])
    })
}

const deleteAlbum = (req, res, next) => {
    const { albumId } = req.params
    // check if id is invalid format
    if (!Number.isInteger(Number(albumId)) || Number(albumId) <= 0) {
        return next(createCustomError('Album id must be positive integer', StatusCodes.BAD_REQUEST))
    }

    const deleteQuery = createDeleteQuery("album", albumId)

    pool.query(deleteQuery, (error, results) => {
        // rowCount: 1 if item is notFound, otherwise 0
        if (!results || results.rowCount !== 1) {
            return next(createCustomError(`No album with id ${albumId}`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.NO_CONTENT).send()
    })
}

const updateAlbum = (req, res, next) => {
    const { albumId } = req.params
    const updatedAlbumData = req.body
    // check if id is invalid format
    if (!Number.isInteger(Number(albumId)) || Number(albumId) <= 0) {
        return next(createCustomError('Album id must be positive integer', StatusCodes.BAD_REQUEST))
    }
    // check if non-nullable fields contain data
    if (!updatedAlbumData.name || !updatedAlbumData.cover || !updatedAlbumData.release_year || !updatedAlbumData.band_name || !updatedAlbumData.label_name) {
        return next(createCustomError('Cannot create - essential data missing', StatusCodes.BAD_REQUEST))
    }
    // If containing minimum required data
    const updateQuery = createUpdateQuery("album", albumId, updatedAlbumData);

    pool.query(updateQuery, (error, results) => {
        // if no id rowCount is zero
        if (!results || results.rowCount !== 1) {
            return next(createCustomError(`No album with id ${albumId}`, StatusCodes.NOT_FOUND))
        }
        if (error) {
            if (error.code = '23505') {  // code: '23505', detail: 'Key (cover)=(test) already exists.'
                return next(createCustomError(error.detail, StatusCodes.BAD_REQUEST))
            }   // if another type of error just throw
            throw error
        }
        res.status(StatusCodes.OK).json(results.rows)
    })
}

function createInsertQuery(tableName, albumToAdd) {
    const text = 'INSERT INTO ' + tableName + ' (name, cover, release_year, band_name, label_name, summary, duration, format, price, colour, quantity)'
        + ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *'
    const values = [albumToAdd.name, albumToAdd.cover, albumToAdd.release_year, albumToAdd.band_name, albumToAdd.label_name,
    albumToAdd.summary, albumToAdd.duration, albumToAdd.format, albumToAdd.price || 0, albumToAdd.colour || "black", albumToAdd.quantity]

    return { text, values }   // as object
}

function createDeleteQuery(tableName, albumId) {
    const text = 'DELETE FROM ' + tableName + ' WHERE id=$1'
    const values = [albumId]

    return { text, values }   // as object
}

function createUpdateQuery(tableName, albumId, albumData) {

    const text = 'UPDATE ' + tableName + ' SET ' + ' name = $1,' + ' cover = $2,' + ' release_year = $3,'
        + ' band_name = $4,' + ' label_name = $5,' + 'summary = $6,' + ' duration = $7,'
        + ' format = $8,' + ' price = $9,' + '  colour = $10,' + ' quantity = $11'
        + ' WHERE id = ' + albumId + ' RETURNING * '

    const values = [albumData.name, albumData.cover, albumData.release_year, albumData.band_name, albumData.label_name,
    albumData.summary, albumData.duration, albumData.format, albumData.price || 0, albumData.colour || "black", albumData.quantity]

    return { text, values }   // as object
}

module.exports = { getAllAlbums, getAlbumById, createAlbum, deleteAlbum, updateAlbum }