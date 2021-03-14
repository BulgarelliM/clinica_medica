const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const dbPaciente = require('./database/dbPaciente')
const dbMedico = require('./database/dbMedico')
const dbFuncionario = require('./database/dbFuncionario')
const dbBaseEndereco = require('./database/dbBaseEndereco')
const dbAgenda = require('./database/dbAgenda')

app.use(require("cors")())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use('/', router)

router
    .route('/paciente')
    .get(dbPaciente.getPaciente)
    .post(dbPaciente.setPaciente)
    .put(dbPaciente.updatePaciente)

router
    .route('/funcionario')
    .get(dbFuncionario.getFuncionario)
    .post(dbFuncionario.setFuncionario)
    .put(dbFuncionario.updateFuncionario)

router
    .route('/medico')
    .get(dbMedico.getMedico)
    .post(dbMedico.setMedico)
    .put(dbMedico.updateMedico)

router
    .route('/endereco')
    .get(dbBaseEndereco.getEnderecos)
    .post(dbBaseEndereco.setEndereco)
    .put(dbBaseEndereco.updateEndereco)

router
    .route('/endereco/cep')
    .get(dbBaseEndereco.getEnderecoByCEP)

/* router
    .route('/agenda')
    .get(dbAgenda.getAgenda)
    .post(dbAgenda.setAgenda)
    .put(dbAgenda.atualizaAgenda) */

/* router
    .route('/pessoa')
    .get(dbPessoa.getPessoa)
    .get(dbPessoa.getPessoaId)
    .post(dbPessoa.setFuncionario)
    .put(dbPessoa.atualizaPessoa) */

// listen for requests on port 8000
const port = 8000
const listener = app.listen(port, () => {
    console.log('Serviço executando na porta ' + listener.address().port)
})