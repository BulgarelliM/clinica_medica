const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const dbPessoa = require('./database/dbPessoa')

app.use(require("cors")())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
    )

app.use('/', router)

router
    .route('/pessoa')
    .get(dbPessoa.getPessoa)
    .get(dbPessoa.getPessoaId)
    .post(dbPessoa.setFuncionario)
    .put(dbPessoa.atualizaPessoa)


// listen for requests on port 8000
const port = 8000
const listener = app.listen(port, () => {
    console.log('Serviço executando na porta ' + listener.address().port)
})