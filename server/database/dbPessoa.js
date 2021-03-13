const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbConnection = require('../config/database')

const getPessoa = (req, resp) => {
    pool.query('SELECT * FROM pessoa', (err, res) => {
        if (err) {
            console.log('Erro!!!')
        }
        resp.status(200).json(res.rows)
        // pool.end();
    })
}

const getPessoaId = (req, resp) => {
    const id = req.body

    pool.query(`SELECT * FROM pessoa WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('Erro!!!')
        }
        resp.status(200).json(res.rows)
        // pool.end();
    })
}

const atualizaPessoa = (req, resp) => {
    const { nome, email, telefone, cep, logradouro, bairro, cidade, estado } = req.body
    const campos = 'nome = $1, email  = $2, telefone = $3, cep = $4, logradouro = $5, bairro = $6, cidade = $7, estado = $8'
    pool.query(`UPDATE pessoa SET ${campos}`,
        [nome, email, telefone, cep, logradouro, bairro, cidade, estado],
        (err, res) => {
            if (err) {
                throw err
            }
            resp.status(200).send(`User modified`)
        }
    )
}

/* const removePessoa = (request, response) => {
const id = parseInt(request.body.idpessoa)

pool.query('DELETE FROM pessoa WHERE id = $1', [id], (error, results) => {
    if (error) {
    throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
})
}
*/

module.exports = { getPessoa, atualizaPessoa, getPessoaId }