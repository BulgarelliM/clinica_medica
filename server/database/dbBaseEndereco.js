const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbConnection = require('../config/database')


const getEnderecos = (request, response) => {
    pool.query('SELECT * FROM base_enderecos', (err, res) => {
        if (err) {
            console.log("Erro ao acessar tabela Base de Enderecos: " + err)
        }
        response.status(200).json(res.rows)
    })
}

const getEnderecoByCEP = (request, response) => {
    const cep = request.body.cep
    pool.query('select * from base_enderecos where CEP = $1', [cep], (err, res) => {
        if (err) {
            console.log("Erro ao acessar tabela Base de Enderecos: " + err)
        }
        response.status(200).json(res.rows[0])
    })
}

const createEndereco = (request, response) => {
    const { cep, logradouro, bairro, cidade, estado } = request.body

    const field = 'cep, logradouro, bairro, cidade, estado'
    const value = '$1, $2, $3, $4, $5'
    pool.query(`insert into base_enderecos (${field}) VALUES (${value})`,
        [cep, logradouro, bairro, cidade, estado], (err, res) => {
            if (err) {
                console.log("Erro ao inserir na tabela Base de Enderecos: " + err)
            }
            response.status(201).send(`Endereco adicionado a base`)
        })
}

const atualizaEndereco = (request, response) => {
    const { idBase_Enderecos, cep, logradouro, bairro } = request.body

    pool.query(
        'UPDATE base_enderecos SET cep = $1, logradouro = $2, bairro = $3 where idBase_Enderecos = $4',
        [cep, logradouro, bairro, idBase_Enderecos],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Endereco atualizado com sucesso`)
        }
    )
}

module.exports = {getEnderecos, getEnderecoByCEP, atualizaEndereco, createEndereco}