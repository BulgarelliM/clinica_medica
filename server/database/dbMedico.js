const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbConnection = require('../config/database')

const getMedico = (req, resp) => {
    const query = 'SELECT * FROM medico m INNER JOIN pessoa p ON m.idmedico = p.idpessoa ORDER BY m.idmedico ASC'
    pool.query(query, (err, res) => {
        if (err) {
            console.log('Erro!!!')
        }
        resp.status(200).json(res.rows)
    })
}

const setMedico = (req, resp) => {
    const { cod, nome, email, telefone, cep, logradouro, bairro, cidade, estado, datacontrato, salario, senha, especialidade, crm } = req.body
    pool.query('BEGIN', err => {
        const field = 'idpessoa, nome, email, telefone, cep, logradouro, bairro, cidade, estado'
        const values = '$1, $2, $3, $4, $5, $6, $7, $8, $9'
        pool.query(`INSERT INTO pessoa (${field}) VALUES (${values})`,
            [cod, nome, email, telefone, cep, logradouro, bairro, cidade, estado], (err, res) => {
                if (err) {
                    throw err
                }
                const fieldFunc = 'idfuncionario, datacontrato, salario, senha'
                const valuesFunc = '$1, $2, $3, $4'
                pool.query(`INSERT INTO funcionario (${fieldFunc}) VALUES (${valuesFunc})`,
                    [cod, datacontrato, salario, senha], (err, res) => {
                        if (err) {
                            throw err
                        }
                        const fieldMed = 'idmedico, especialidade, crm'
                        const valuesMed = '$1, $2, $3'
                        pool.query(`INSERT INTO medico (${fieldMed}) VALUES (${valuesMed})`,
                            [cod, especialidade, crm], (err, res) => {
                                if (err) {
                                    throw err
                                }
                                pool.query('COMMIT', err => {
                                    if (err) {
                                        console.error('Error committing transaction', err.stack)
                                    }
                                })
                            })
                    })
            })
        resp.status(200).send(`Médico adicionado com sucesso.`)
    })
}

module.exports = { setMedico, getMedico }