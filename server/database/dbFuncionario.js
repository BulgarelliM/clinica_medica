const bodyParser = require('body-parser')
const dbConnection = require('../config/database')
const genID = require('../api/generateId')

const getFuncionario = (req, resp) => {
    const query = 'SELECT * FROM funcionario f INNER JOIN pessoa p ON f.idfuncionario = p.idpessoa ORDER BY f.idfuncionario ASC'
    pool.query(query, (err, res) => {
        if (err) {
            console.log('Erro!!!')
        }
        resp.status(200).json(res.rows)
    })
}

const setFuncionario = async (req, resp) => {
    const cod = await genID.idFuncionario()
    const {nome, email, telefone, cep, logradouro, bairro, cidade, estado, datacontrato, salario, senha } = req.body
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
    const { cod, nome, email, telefone, cep, logradouro, bairro, cidade, estado, datacontrato, salario, senha } = req.body
    
    pool.query('BEGIN', err => {
        const query = 'UPDATE pessoa SET nome = $1, email = $2, telefone = $3, ' +
        'cep = $4, logradouro = $5, bairro = $6, cidade = $7, estado = $8 WHERE idpessoa = $9'
        
        pool.query(query, [nome, email, telefone, cep, logradouro, bairro, cidade, estado, cod], (err, res) => {
            if (err) {
                throw err
            }    
            const queryFunc = 'UPDATE funcionario SET datacontrato = $1, ' +
            'salario = $2, senha = $3 WHERE idfuncionario = $4'

            pool.query(queryFunc, [datacontrato, salario, senha, cod], (err, res) => {
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
        resp.status(200).send(`Alterações realizadas com sucesso.`)
    })
}

module.exports = { setFuncionario, getFuncionario, updateFuncionario }