const { StatusCodes } = require('http-status-codes')
const { pool } = require('../db/connect')
const { createInsertQuery, createDeleteQuery, createUpdateQuery } = require('../utils-validators/queryCreators')
const { idIntegerValidator, verifyNonNullableFields } = require('../utils-validators/idIntegerValidator')
const { createCustomError } = require('../errors/custom-error')


const getAllAlbumGenres = (req, res, next) => {
    pool.query(`SELECT 	album.id as "Album ID", genre.id as "Genre ID", 
                album.name as "Album Name", album.band_name as "Band", genre.name as "Genre" from album
                    LEFT JOIN album_genre
                    on album.id = album_genre.album_id
                    LEFT JOIN genre 
                    on genre.id = album_genre.genre_id
                    GROUP by album.id, album.name, album.band_name, genre.id, genre.name;`, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        res.status(StatusCodes.OK).json(results.rows)
    })
}

const getAlbumGenreById = (req, res, next) => {
    const { albumId, genreId } = req.params
    console.log(albumId, genreId)
    const albumIdIsInteger = idIntegerValidator(albumId);
    const genreIdIsInteger = idIntegerValidator(genreId)
    if (!albumIdIsInteger || !genreIdIsInteger) {
        return next(createCustomError('Album and Genre IDs must be positive integers', StatusCodes.BAD_REQUEST));
    }
    console.log("ui")
    pool.query(`SELECT 	genre.name as "Genre", album.* from album
                    LEFT JOIN album_genre
                    on album.id = album_genre.album_id
                    LEFT JOIN genre 
                    on genre.id = album_genre.genre_id
                    WHERE album.id = ${albumId} and genre.id=${genreId};`, (error, results) => {
        if (error) {
            console.log(error)
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {            // create error object ---> go to next middleware, eventually errorHandler
            return next(createCustomError(`No albumGenre with id ${albumGenreId} found`, StatusCodes.NOT_FOUND))
        }

        res.status(StatusCodes.OK).json(results.rows[0])
    })
}

const createAlbumGenre = (req, res, next) => {
    const albumGenreData = req.body
    const undefinedProperty = verifyNonNullableFields("albumGenre", albumGenreData);
    if (undefinedProperty) {
        return next(createCustomError(`Cannot create: essential data missing - ${undefinedProperty}`, StatusCodes.BAD_REQUEST));
    }
    const insertQuery = createInsertQuery("albumGenre", albumGenreData)

    pool.query(insertQuery, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        if (results.rowCount && results.rowCount !== 1) {
            return next(createCustomError(`Could not create albumGenre with id ${albumGenreId}`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.CREATED).json(results.rows[0])
    })
}

const deleteAlbumGenre = (req, res, next) => {
    const { albumGenreId } = req.params
    const idIsInteger = idIntegerValidator(albumGenreId);
    if (!idIsInteger) {
        return next(createCustomError('AlbumGenre id must be positive integer', StatusCodes.BAD_REQUEST));
    }
    const deleteQuery = createDeleteQuery("albumGenre", albumGenreId)

    pool.query(deleteQuery, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {
            return next(createCustomError(`No albumGenre with id ${albumGenreId} found`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.NO_CONTENT).send()
    })
}

const updateAlbumGenre = (req, res, next) => {
    const { albumGenreId } = req.params;
    const updatedAlbumGenreData = req.body;

    const idIsInteger = idIntegerValidator(albumGenreId);
    if (!idIsInteger) {
        return next(createCustomError('AlbumGenre id must be positive integer', StatusCodes.BAD_REQUEST));
    }
    const undefinedProperty = verifyNonNullableFields("albumGenre", updatedAlbumGenreData);
    if (undefinedProperty) {
        return next(createCustomError(`Cannot update: essential data missing - ${undefinedProperty}`, StatusCodes.BAD_REQUEST));
    }

    const updateQuery = createUpdateQuery("albumGenre", albumGenreId, updatedAlbumGenreData);

    pool.query(updateQuery, (error, results) => {
        if (error) {
            return next(createCustomError(error, StatusCodes.BAD_REQUEST))
        }
        if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {
            return next(createCustomError(`No albumGenre with id ${albumGenreId} found`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.OK).json(results.rows)
    })
}


module.exports = { getAllAlbumGenres, getAlbumGenreById, createAlbumGenre, deleteAlbumGenre, updateAlbumGenre }