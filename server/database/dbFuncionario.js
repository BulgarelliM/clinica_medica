const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbConnection = require('../config/database')

const getFuncionario = (req, resp) => {
    const query = 'SELECT * FROM funcionario f INNER JOIN pessoa p ON f.idfuncionario = p.idpessoa ORDER BY f.idfuncionario ASC'
    pool.query(query, (err, res) => {
        if (err) {
            console.log('Erro!!!')
        }
        resp.status(200).json(res.rows)
        // pool.end();
    })
}

const setFuncionario = (req, resp) => {
    const { cod, nome, email, telefone, cep, logradouro, bairro, cidade, estado, datacontrato, salario, senha } = req.body
    //const cod1 = cod
    pool.query('BEGIN', err => {
        //if (shouldAbort(err)) return
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
                        pool.query('COMMIT', err => {
                            if (err) {
                                console.error('Error committing transaction', err.stack)
                            }
                        })
                    })
                resp.status(200).send(`Funcionário adicionado com sucesso.`)
            })
    })
}

const updateFuncionario = (req, resp) => {
    const { datacontrato, salario, senha } = req.body
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

module.exports = { setFuncionario, getFuncionario, updateFuncionario }