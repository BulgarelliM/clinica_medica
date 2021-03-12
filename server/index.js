const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const { Pool } = require('pg')
const { Router } = require('express')

pool = new Pool({
    host: 'ec2-52-44-31-100.compute-1.amazonaws.com',
    port: 5432,
    database: 'd1ls3adtuirs23',
    user: 'iybbjmnbkukkwy',
    password: 'aecdd5d7c9aea03866476fb1af9f92d1e299d1bc5dc1f2440bf7064f27fc8a02',
    ssl: { rejectUnauthorized: false }
})



app.use(require("cors")())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use('/', router)




const getPessoa = (req, resp) => {
    //SELECT * FROM pessoa
    pool.query('SELECT * FROM pessoa', (err, res) => {
        if (err) {
            console.log('Erro!!!')
        }
        resp.status(200).json(res.rows)
        // pool.end();
    })
}


router
    .route('/')
    .get(getPessoa)

// listen for requests on port 8000
const port = 8000
const listener = app.listen(port, () => {
    console.log('Serviço executando na porta ' + listener.address().port)
})