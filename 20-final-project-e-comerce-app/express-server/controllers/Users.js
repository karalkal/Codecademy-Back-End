const { StatusCodes } = require('http-status-codes')
const { pool } = require('../db/connect')
const bcrypt = require('bcryptjs')

const { createInsertQuery, createDeleteQuery, createUpdateQuery } = require('../utils-validators/queryCreators')
const { verifyNonNullableFields, stringLengthValidator, emailValidator } = require('../utils-validators/validators')
const { createCustomError } = require('../errors/custom-error')

// const register = async (req, res, next) => { res.send({ "reg works": true }) }

const register = async (req, res, next) => {
  const userData = req.body
  console.log(req.body)
  // Validations
  // f_name, l_name, email, password cannot be NULL, validation will be carried out in FE beforehand anyway
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
  console.log(userData)

  // Create the user
  // If containing minimum required data
  const insertQuery = createInsertQuery("db_user", userData)

  pool.query(insertQuery, (error, results) => {
    if (error) {
      console.log("OPPA", error)
      return next(createCustomError(error, StatusCodes.BAD_REQUEST))
    }
    // Not sure if we can get any different but just in case -> rowCount: 1 if item is notFound, otherwise 0
    if (results.rowCount && results.rowCount !== 1) {
      return next(createCustomError(`Could not create user`, StatusCodes.BAD_REQUEST))
    }
    res.status(StatusCodes.CREATED).json(results.rows[0])
  })

  // const user = await User.create({ ...req.body })
  // const token = user.createJWT()
  // res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res, next) => { res.send({ "reg works": true }) }


/*
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

*/

module.exports = {
  register,
  login
}