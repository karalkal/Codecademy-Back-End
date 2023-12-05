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
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        /*
        if id not found, not error but Result obj has rowCount: 0
        BUT 0 == false in js, so below is not alright:
        if (results.rowCount && results.rowCount !== 1) 
        Because results.rowCount == 0 hence is false (facepalm)
        console.log("ROWS:\n", results.rowCount, results.rowCount == false)
        */

        if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {            // create error object ---> go to next middleware, eventually errorHandler
            return next(createCustomError(`No album with id ${albumId} found`, StatusCodes.NOT_FOUND))
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
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        // rowCount: 1 if item is notFound, otherwise 0
        if (results.rowCount && results.rowCount !== 1) {
            return next(createCustomError(`No album with id ${albumId} found`, StatusCodes.NOT_FOUND))
        }
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
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {
            return next(createCustomError(`No album with id ${albumId} found`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.NO_CONTENT).send()
    })
}

const updateAlbum = (req, res, next) => {
    const { albumId } = req.params;
    const updatedAlbumData = req.body;
    // check if id is invalid format
    if (!Number.isInteger(Number(albumId)) || Number(albumId) <= 0) {
        return next(createCustomError('Album id must be positive integer', StatusCodes.BAD_REQUEST))
    }
    // check if non-nullable fields contain data
    if (!updatedAlbumData.name || !updatedAlbumData.cover || !updatedAlbumData.release_year || !updatedAlbumData.band_name || !updatedAlbumData.label_name) {
        return next(createCustomError('Cannot create - essential data missing', StatusCodes.BAD_REQUEST))
    }

    const updateQuery = createUpdateQuery("album", albumId, updatedAlbumData);
    // console.log("QUERY PARAMS:\n", updateQuery)

    pool.query(updateQuery, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {
            return next(createCustomError(`No album with id ${albumId} found`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.OK).json(results.rows)
    })
}

function createInsertQuery(tableName, albumToAdd) {
    let text
    let values
    if (tableName === "album") {
        text = 'INSERT INTO ' + tableName + ' (name, cover, release_year, band_name, label_name, summary, duration, format, price, colour, quantity)'
            + ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *'
        values = [
            albumToAdd.name, albumToAdd.cover, albumToAdd.release_year, albumToAdd.band_name, albumToAdd.label_name,
            albumToAdd.summary, albumToAdd.duration, albumToAdd.format, albumToAdd.price || 0, albumToAdd.colour || "black", albumToAdd.quantity
        ]
    }
    return { text, values }   // as object
}

function createDeleteQuery(tableName, albumId) {
    let text
    let values
    if (tableName === "album") {
        text = 'DELETE FROM ' + tableName + ' WHERE id=$1'
        values = [albumId]
    }
    return { text, values }   // as object
}

function createUpdateQuery(tableName, albumId, albumData) {
    let text
    let values
    if (tableName === "album") {
        text = 'UPDATE ' + tableName + ' SET ' + ' name = $1,' + ' cover = $2,' + ' release_year = $3,'
            + ' band_name = $4,' + ' label_name = $5,' + 'summary = $6,' + ' duration = $7,'
            + ' format = $8,' + ' price = $9,' + '  colour = $10,' + ' quantity = $11'
            + ' WHERE id = ' + albumId + ' RETURNING * '

        values = [albumData.name, albumData.cover, albumData.release_year, albumData.band_name, albumData.label_name,
        albumData.summary, albumData.duration, albumData.format, albumData.price || 0, albumData.colour || "black", albumData.quantity]
    }
    return { text, values }   // as object
}

module.exports = { getAllAlbums, getAlbumById, createAlbum, deleteAlbum, updateAlbum }