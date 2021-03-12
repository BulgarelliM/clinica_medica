const { Pool } = require('pg')

pool = new Pool({
    host: 'ec2-52-44-31-100.compute-1.amazonaws.com',
    port: 5432,
    database: 'd1ls3adtuirs23',
    user: 'iybbjmnbkukkwy',
    password: 'aecdd5d7c9aea03866476fb1af9f92d1e299d1bc5dc1f2440bf7064f27fc8a02',
    ssl: { rejectUnauthorized: false }
})

module.exports = pool