
const jwt = require('jsonwebtoken')
require('dotenv').config()

function createJWT(email) {
    const token = jwt.sign(
        { email }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
    return token
}


module.exports = { createJWT }