const bodyParser = require('body-parser')
const dbConnection = require('../config/database')

function pad(num, size) {
    num++
    var s = "000000000" + num;
    return s.substr(s.length - size);
}

const idFuncionario = async () => {
    const query = 'SELECT f.idfuncionario FROM funcionario f INNER JOIN pessoa p ON ' +
        'f.idfuncionario = p.idpessoa WHERE substring(f.idfuncionario,1,1) = \'f\' ORDER BY f.idfuncionario DESC LIMIT 1';
    const resp = await pool.query(query)
    let ID = 'f' + pad(parseInt(resp.rows[0].idfuncionario.substring(1, resp.length)), 2).toString()
    return ID
    
}

const idMedico = async () => {
    const query = 'SELECT m.idmedico FROM medico m INNER JOIN pessoa p ON ' +
        'm.idmedico = p.idpessoa WHERE substring(m.idmedico,1,1) = \'m\' ORDER BY m.idmedico DESC LIMIT 1';
    const resp = await pool.query(query)
    let ID = 'm' + pad(parseInt(resp.rows[0].idmedico.substring(1, resp.length)), 2).toString()
    return ID
}

const idPaciente = async () => {
    const query = 'SELECT pac.idpaciente FROM paciente pac INNER JOIN pessoa p ON ' +
        'pac.idpaciente = p.idpessoa WHERE substring(pac.idpaciente,1,1) = \'p\' ORDER BY pac.idpaciente DESC LIMIT 1';
    const resp = await pool.query(query)
    let ID = 'p' + pad(parseInt(resp.rows[0].idpaciente.substring(1, resp.length)), 2).toString()
    return ID
}

module.exports = { idFuncionario, idMedico, idPaciente }