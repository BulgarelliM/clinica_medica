const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbConnection = require('../config/database')


const getAgenda = (req, resp) => {
    pool.query('SELECT * FROM Agenda', (err, res) => {
        if (err) {
            console.log('Erro!!!')
        }
        resp.status(200).json(res.rows)
    })
}

const setAgenda = (request, response) => {
    const {
        idPaciente,
        peso,
        altura,
        tipoSanguineo
    } = request.body

    const field = 'idPaciente, peso, altura, tipoSanguineo'
    const values = '$1, $2, $3, $4'
    pool.query(`INSERT INTO paciente (${field}) VALUES (${values})`, [idPaciente, peso, altura, tipoSanguineo], (err, results) => {
        if (err) {
            throw err
        }
        response.status(201).send(`Agenda added`)
    })
}

const atualizaAgenda = (request, response) => {
    const {
        idPaciente,
        peso,
        altura
    } = request.body

    pool.query(
        'UPDATE Agenda SET peso = $2, altura = $3 WHERE idPaciente = $1', [idPaciente, peso, altura],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Agenda modified`)
        }
    )
}

module.exports = { setAgenda, getAgenda, atualizaAgenda }