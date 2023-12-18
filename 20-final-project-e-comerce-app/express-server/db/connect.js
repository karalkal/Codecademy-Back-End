const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vinyl_shop',
    password: 'postgres',
    port: 5432,
})

// port is 5433 on desktop !!!!


module.exports = { pool }
