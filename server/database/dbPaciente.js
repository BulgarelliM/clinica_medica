const bodyParser = require('body-parser')
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

const updatePaciente = (req, resp) => {
    const { cod, nome, email, telefone, cep, logradouro, bairro, cidade, estado, peso, altura, tiposanguineo } = req.body
    
    pool.query('BEGIN', err => {
        const query = 'UPDATE pessoa SET nome = $1, email = $2, telefone = $3, ' +
        'cep = $4, logradouro = $5, bairro = $6, cidade = $7, estado = $8 WHERE idpessoa = $9'
        
        pool.query(query, [nome, email, telefone, cep, logradouro, bairro, cidade, estado, cod], (err, res) => {
            if (err) {
                throw err
            }    
            const queryPac = 'UPDATE paciente SET peso = $1, altura = $2, tiposanguineo = $3 WHERE idpaciente = $4'

            pool.query(queryPac, [peso, altura, tiposanguineo, cod], (err, res) => {
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

module.exports = { setPaciente, getPaciente, updatePaciente }