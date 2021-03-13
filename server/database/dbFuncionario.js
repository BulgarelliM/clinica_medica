const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbConnection = require('../config/database')

const getFuncionario = (req, resp) => {
    pool.query('SELECT * FROM funcionario', (err, res) => {
        if (err) {
            console.log('Erro!!!')
        }
        resp.status(200).json(res.rows)
        // pool.end();
    })
}

const setFuncionario = (request, response) => {
    const {idfuncionario, datacontrato, salario, senha} = request.body

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

const atualizaFuncionario = (req, resp) => {
    const {datacontrato, salario, senha} = req.body
    const campos = 'email  = $2, telefone = $3, cep = $4, logradouro = $5, bairro = $6, cidade = $7, estado = $8'
    pool.query(`UPDATE pessoa SET ${campos}`,
        [nome, email, telefone, cep, logradouro, bairro, cidade, estado],
        (err, res) => {
            if (err) {
                throw err
            }
            resp.status(200).send(`User modified with ID: ${id}`)
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

module.exports = { setFuncionario, getFuncionario, atualizaPessoa }