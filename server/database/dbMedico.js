const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbConnection = require('../config/database')

const getMedico = (req, resp) => {
    pool.query('SELECT * FROM Medico', (err, res) => {
        if (err) {
            console.log('Erro!!!')
        }
        resp.status(200).json(res.rows)
    })
}

const setMedico = (request, response) => {
    const {
        idMedico,
        especialidade,
        crm
    } = request.body

    const field = 'idMedico, especialidade, crm'
    const values = '$1, $2, $3'
    pool.query(`INSERT INTO medico (${field}) VALUES (${values})`, [idMedico, especialidade, crm], (err, results) => {
        if (err) {
            throw err
        }
        response.status(201).send(`Medico added`)
    })
}

module.exports = { setMedico, getMedico }