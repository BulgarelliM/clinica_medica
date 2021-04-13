const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbConnection = require('../config/database')

// fixed
const setAgenda = (request, response) => {
    const {
        idAgenda,
        data,
        horario,
        nome,
        email,
        telefone,
        medico_id
    } = request.body

    const field = 'idAgenda, data, horario, nome, email, telefone, medico_id'
    const values = '$1, $2, $3, $4, $5, $6, $7'
    pool.query(`INSERT INTO agenda (${field}) VALUES (${values})`, [idAgenda, data, horario, nome, email, telefone, medico_id], (err, results) => {
        if (err) {
            throw err
        }
        response.status(201).send(`Agenda added`)
    })
}

const atualizaAgenda = (request, response) => {
    const {
        idAgenda,
        data,
        horario,
        email,
        telefone,
        medico_id
    } = request.body
    const query = `UPDATE Agenda SET data = '${data}', horario = '${horario}', email = '${email}', telefone = '${telefone}', medico_id = '${medico_id}' WHERE idAgenda = '${idAgenda}';`
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Agenda modified`)
    })
}

// added 13/03 - OK
const getHorariosOcupados = (req, resp) => {
    const {
        especialidade,
        medico
    } = req.body
    console.log(medico)
    const query = `select horario from pessoa p, medico m, agenda a where p.idPessoa = m.idMedico and m.especialidade like '${especialidade}' and p.nome = '${medico}' ORDER BY a.horario ASC;`
    pool.query(query, (err, res) => {
        if (err) {
            throw err
        }
        resp.status(200).json(res.rows)
    })
}

// added 13/03 - OK
const getConsultasDoPaciente = (req, resp) => {
    const {
        nome
    } = req.body
    const query = `select a.data as DIA, a.horario as HORA, m.especialidade, p.nome from agenda a, pessoa p, medico m  where a.medico_id = p.idpessoa and a.nome = '${nome}' and a.medico_id = m.idmedico ORDER BY a.data ASC;`
    pool.query(query, (err, res) => {
        if (err) {
            throw err
        }
        resp.status(200).json(res.rows)
    })
}

// added 13/03 - OK
const getAgendamentosPacientes = (req, resp) => {
    const query = `select a.data as DIA, a.horario as HORA, a.nome as PACIENTE, m.especialidade, p.nome as MEDICO, a.email as EMAIL, a.telefone as TELEFONE from agenda a, pessoa p, medico m  where a.medico_id = p.idpessoa and a.medico_id = m.idmedico ORDER BY a.data ASC;`
    pool.query(query, (err, res) => {
        if (err) {
            throw err
        }
        resp.status(200).json(res.rows)
    })
}

module.exports = { setAgenda, atualizaAgenda, getHorariosOcupados, getConsultasDoPaciente, getAgendamentosPacientes }