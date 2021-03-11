const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const { Client } = require('pg')

client = new Client({
    host: 'ec2-52-44-31-100.compute-1.amazonaws.com',
    port: 5432,
    user: 'iybbjmnbkukkwy',
    password: 'aecdd5d7c9aea03866476fb1af9f92d1e299d1bc5dc1f2440bf7064f27fc8a02'
})

try{
client
  .connect()
  console.log('Conectado.')
} catch (error){
    console.log('Não foi possível conectar.')
}

app.use(require("cors")()) 
app.use(bodyParser.json()) 
app.use('/', router)

client.query('SELECT * FROM pessoa', (err, res) => {
    if (err){
        console.log('Erro!!!')
    }
    console.log(JSON.stringify(res))
    client.end()
  })
  
router
    .route('/')
    .get(async(req,res) => {
        let x = await client.query('SELECT * FROM pessoa', (err, res) => {
            if (err){
                console.log('Erro!!!')
            }
            console.log(JSON.stringify(res))
            client.end()
          })
        console.log(x)
        res.send(x)
    })

// listen for requests on port 8000
const port = 8000
const listener = app.listen(port, () => {
    console.log('Serviço executando na porta ' + listener.address().port)
})