const bodyParser = require('body-parser')
const dbConnection = require('../config/database')
const genID = require('../api/generateId')

const getMedico = (req, resp) => {
    const query = 'SELECT * FROM medico m INNER JOIN pessoa p ON m.idmedico = p.idpessoa ORDER BY m.idmedico ASC'
    pool.query(query, (err, res) => {
        if (err) {
            console.log('Erro!!!')
        }
        resp.status(200).json(res.rows)
    })
}

const setMedico = async (req, resp) => {
    const cod = await genID.idMedico()
    const { nome, email, telefone, cep, logradouro, bairro, cidade, estado, datacontrato, salario, senha, especialidade, crm } = req.body
    pool.query('BEGIN', err => {
        const field = 'idpessoa, nome, email, telefone, cep, logradouro, bairro, cidade, estado'
        const values = '$1, $2, $3, $4, $5, $6, $7, $8, $9'
        pool.query(`INSERT INTO pessoa (${field}) VALUES (${values})`, [cod, nome, email, telefone, cep, logradouro, bairro, cidade, estado], (err, res) => {
            if (err) {
                throw err
            }
            const fieldFunc = 'idfuncionario, datacontrato, salario, senha'
            const valuesFunc = '$1, $2, $3, $4'
            pool.query(`INSERT INTO funcionario (${fieldFunc}) VALUES (${valuesFunc})`, [cod, datacontrato, salario, senha], (err, res) => {
                if (err) {
                    throw err
                }
                const fieldMed = 'idmedico, especialidade, crm'
                const valuesMed = '$1, $2, $3'
                pool.query(`INSERT INTO medico (${fieldMed}) VALUES (${valuesMed})`, [cod, especialidade, crm], (err, res) => {
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


//added 13-03 - OK
const getEspecialidades = (req, resp) => {
    const query = 'select especialidade from medico ORDER BY especialidade ASC'
    pool.query(query, (err, res) => {
        if (err) {
            console.log('Erro!!!')
        }
        resp.status(200).json(res.rows)
    })
}

// added 13-03 - OK
const getMedicoPorEspecialidade = (req, resp) => {
    const {
        especialidade
    } = req.body
    console.log(especialidade)
    const query = `select nome from pessoa p, medico m where p.idPessoa = m.idMedico and m.especialidade like '${especialidade}'`
    pool.query(query, (err, res) => {
        if (err) {
            console.log(err)
        }
        resp.status(200).json(res.rows)
    })
}

const updateMedico = (req, resp) => {
    const { cod, nome, email, telefone, cep, logradouro, bairro, cidade, estado, datacontrato, salario, senha, especialidade, crm } = req.body
    
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
                const queryMed = 'UPDATE medico SET especialidade = $1, crm = $2 WHERE idmedico = $3'

                pool.query(queryMed,[especialidade, crm, cod], (err, res) => {
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
        resp.status(200).send(`Alterações realizadas com sucesso.`)
    })
}

module.exports = { setMedico, getMedico, getEspecialidades, getMedicoPorEspecialidade, updateMedico }
