const { StatusCodes } = require('http-status-codes')
const { pool } = require('../db/connect')
const { createCustomError } = require('../errors/custom-error')


const getAllAlbums = (req, res) => {
  pool.query('SELECT id, name, band_name, cover, release_year FROM album ORDER BY id ASC', (error, results) => {
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


module.exports = { getAllAlbums, getAlbumById }

