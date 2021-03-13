const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbConnection = require('../config/database')


const getPaciente = (req, resp) => {
    const query = 'SELECT * FROM paciente pac INNER JOIN pessoa p ON pac.idpaciente = p.idpessoa,1 ORDER BY pac.idpaciente ASC'
    pool.query(query, (err, res) => {
        if (err) {
            console.log('Erro!!!')
        }
        resp.status(200).json(res.rows)
    })
}

const setPaciente = (req, resp) => {
    const { cod, nome, email, telefone, cep, logradouro, bairro, cidade, estado, peso, altura, tiposanguineo } = req.body
    pool.query('BEGIN', err => {
        //if (shouldAbort(err)) return
        const field = 'idpessoa, nome, email, telefone, cep, logradouro, bairro, cidade, estado'
        const values = '$1, $2, $3, $4, $5, $6, $7, $8, $9'
        pool.query(`INSERT INTO pessoa (${field}) VALUES (${values})`,
            [cod, nome, email, telefone, cep, logradouro, bairro, cidade, estado], (err, res) => {
                if (err) {
                    throw err
                }
                const fieldFunc = 'idpaciente, peso, altura, tiposanguineo'
                const valuesFunc = '$1, $2, $3, $4'
                pool.query(`INSERT INTO paciente (${fieldFunc}) VALUES (${valuesFunc})`,
                    [cod, peso, altura, tiposanguineo], (err, res) => {
                        if (err) {
                            throw err
                        }
                        pool.query('COMMIT', err => {
                            if (err) {
                                console.error('Error committing transaction', err.stack)
                            }
                        })
                    })
                resp.status(200).send(`Paciente adicionado com sucesso.`)
            })
    })
}

const atualizaPaciente = (request, response) => {
    const {
        idPaciente,
        peso,
        altura
    } = request.body

    pool.query(
        'UPDATE Paciente SET peso = $2, altura = $3 WHERE idPaciente = $1', [idPaciente, peso, altura],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Paciente modified`)
        }
    )
}

module.exports = { setPaciente, getPaciente, atualizaPaciente }