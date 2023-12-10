const { StatusCodes } = require('http-status-codes')
const { pool } = require('../db/connect')
const bcrypt = require('bcryptjs')

const { createInsertQuery } = require('../utils-validators/queryCreators')
const { verifyNonNullableFields, stringLengthValidator, emailValidator } = require('../utils-validators/validators')
const { createCustomError, CustomAPIError } = require('../errors/custom-error')
const { createJWT } = require('../utils-validators/jwt')


// const register = async (req, res, next) => { res.send({ "reg works": true }) }
const register = async (req, res, next) => {
  const userData = req.body
  // Validations
  const undefinedProperty = verifyNonNullableFields("db_user", userData);
  if (undefinedProperty) {
    return next(createCustomError(`Cannot create: essential data missing - ${undefinedProperty}`, StatusCodes.BAD_REQUEST));
  }

  const passTooShort = stringLengthValidator(userData.password, 4, 35)  // min, max
  if (passTooShort) {
    return next(createCustomError(`Password must be between 4 and 35 chars`, StatusCodes.BAD_REQUEST));
  }
  const f_nameTooShort = stringLengthValidator(userData.f_name, 3, 44)  // min, max
  if (f_nameTooShort) {
    return next(createCustomError(`First Name must be between 3 and 44 chars`, StatusCodes.BAD_REQUEST));
  }
  const l_nameTooShort = stringLengthValidator(userData.l_name, 3, 44)  // min, max
  if (l_nameTooShort) {
    return next(createCustomError(`Last Name must be between 3 and 44 chars`, StatusCodes.BAD_REQUEST));
  }
  const emailIsValid = emailValidator(userData.email)    // regex checks for VALID
  if (!emailIsValid) {
    return next(createCustomError(`Invalid email format`, StatusCodes.BAD_REQUEST));
  }

  // Encrypt password
  const salt = await bcrypt.genSalt(10)
  userData.password_hash = await bcrypt.hash(userData.password, salt)
  delete userData.password    // just in case

  // Create the user and return jwt if successful, error if not
  const insertQuery = createInsertQuery("db_user", userData)

  pool.query(insertQuery, (error, results) => {
    if (error) {
      return next(createCustomError(error, StatusCodes.BAD_REQUEST))
    }
    // Not sure if we can get any different but just in case -> rowCount: 1 if item is notFound, otherwise 0
    if (results.rowCount && results.rowCount !== 1) {
      return next(createCustomError(`Could not create user`, StatusCodes.BAD_REQUEST))
    }
    // If all is good
    let jwtToken = createJWT(results.rows[0].email)
    res.status(StatusCodes.CREATED).json({
      email: results.rows[0].email,
      first_name: results.rows[0].f_name,
      last_name: results.rows[0].l_name,
      token: jwtToken
    })
  })
}


// const login = async (req, res, next) => { res.send({ "reg works": true }) }
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(createCustomError(`Email and password fields cannot be empty`, StatusCodes.UNAUTHORIZED));
  }
  // get email and password_hash
  pool.query(`SELECT * FROM db_user WHERE email = '${email}'`, (error, results) => {
    if (error) {
      return next(createCustomError(error, StatusCodes.UNAUTHORIZED))
    }
    if (typeof results.rowCount !== 'undefined' && results.rowCount !== 1) {  // no such user
      return next(createCustomError(`No user with email ${email} found`, StatusCodes.UNAUTHORIZED))
    }
    const { password_hash } = results.rows[0].password_hash
    // verify password
    const isPasswordCorrect = bcrypt.compare(password, password_hash)   //  bcrypt.compare(myPlaintextPassword, hash, function(err, result) {}
    if (!isPasswordCorrect) {
      return next(createCustomError(`Invalid password`, StatusCodes.UNAUTHORIZED))
    }
    // If all is good
    let jwtToken = createJWT(results.rows[0].email)
    res.status(StatusCodes.CREATED).json({
      email: results.rows[0].email,
      first_name: results.rows[0].f_name,
      last_name: results.rows[0].l_name,
      token: jwtToken
    })
  })
}


module.exports = {
  register,
  login
}