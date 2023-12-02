const { StatusCodes } = require('http-status-codes')
const { pool } = require('../db/connect')
const { BadRequestError, NotFoundError } = require('../errors')


const getAllAlbums = (req, res) => {
  pool.query('SELECT * FROM album ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(StatusCodes.OK).json(results.rows)
  })
}


const getAlbumById = (req, res) => {
  const { albumId } = req.params
  // check if id is invalid format
  if (isNaN(albumId) || Number(albumId) <= 0) {
    throw new BadRequestError('Album id must be positive integer')
  }
  pool.query(`SELECT * FROM album WHERE id=${albumId}`, (error, results) => {
    if (results.rowCount === 0) {
      throw new NotFoundError(`No album with id ${albumId}`)
    }

    res.status(StatusCodes.OK).json(results.rows)
  })
}


module.exports = { getAllAlbums, getAlbumById }

