const { StatusCodes } = require('http-status-codes')
const { pool, client } = require('../db/connect')
const { createCustomError } = require('../errors/custom-error')


const getAllAlbums = (req, res) => {
    pool.query('SELECT id, name, band_name, cover, release_year, price FROM album ORDER BY id ASC', (error, results) => {
        res.status(StatusCodes.OK).json(results.rows)
    })
}

const getAlbumById = (req, res, next) => {
    const { albumId } = req.params
    // check if id is invalid format
    if (isNaN(albumId) || Number(albumId) <= 0) {
        return next(createCustomError('Album id must be positive integer', StatusCodes.BAD_REQUEST))
    }
    pool.query(`SELECT * FROM album WHERE id=${albumId}`, (error, results) => {
        if (results.rowCount === 0) {
            // create error object ---> go to next middleware, eventually errorHandler
            return next(createCustomError(`No album with id ${albumId}`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.OK).json(results.rows)
    })
}

const createAlbum = (req, res, next) => {
    const albumToAdd = req.body
    // These cannot be NULL, validation will be carried out in FE beforehand anyway
    if (!albumToAdd.name || !albumToAdd.cover || !albumToAdd.release_year || !albumToAdd.band_name || !albumToAdd.label_name) {
        return next(createCustomError('Cannot create - essential data missing', StatusCodes.BAD_REQUEST))
    }
    // If containing minimum required data
    const insertQuery = createInsertQuery(albumToAdd)

    pool.query(insertQuery, (error, results) => {
        if (error) { throw error }
        res.status(StatusCodes.CREATED).json(results.rows)
    })
}

function createInsertQuery(albumToAdd) {
    const text = 'INSERT INTO album  (name, cover, release_year, band_name, label_name, summary, duration, format, price, colour, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *'
    const values = [
        albumToAdd.name, albumToAdd.cover, albumToAdd.release_year, albumToAdd.band_name, albumToAdd.label_name,
        albumToAdd.summary, albumToAdd.duration, albumToAdd.format, albumToAdd.price, albumToAdd.colour, albumToAdd.quantity
    ]

    return { text, values }   // as object


}

module.exports = { getAllAlbums, getAlbumById, createAlbum }

