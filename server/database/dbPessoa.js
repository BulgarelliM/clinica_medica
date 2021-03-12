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

const setPessoa = (request, response) => {
    const { nome,
        email,
        telefone,
        cep,
        logradouro,
        bairro,
        cidade,
        estado } = request.body

    const field = 'nome , email , telefone , cep , logradouro , bairro , cidade , estado'
    const values = '$1, $2, $3, $4, $5, $6, $7, $8'
    pool.query(`INSERT INTO pessoa (${field}) VALUES (${values})`,
        [nome, email, telefone, cep, logradouro, bairro, cidade, estado], (err, results) => {
            if (err) {
                throw err
            }
            response.status(201).send(`User added with ID: ${results.insertId}`)
        })
}

const atualizaPessoa = (request, response) => {
    const { nome,
        email,
        telefone,
        cep,
        logradouro,
        bairro,
        cidade,
        estado } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
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

module.exports = { setPessoa, getPessoa, atualizaPessoa }